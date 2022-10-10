import { declare } from '@babel/helper-plugin-utils';
import doctrine from 'doctrine';
import fse from 'fs-extra';
import path from 'path';
import renderer from './renderer';

function parseComment(commentStr) {
    if (!commentStr) {
        return;
    }
    return doctrine.parse(commentStr, {
        unwrap: true,
    });
}

function generate(docs, format = 'json') {
    if (format === 'markdown') {
        return {
            ext: '.md',
            content: renderer.markdown(docs),
        };
    } else if (format === 'html') {
        return {
            ext: '.html',
            // content: renderer.html(docs),
        };
    } else {
        return {
            ext: '.json',
            // content: renderer.json(docs),
        };
    }
}

function resolveType(tsType) {
    const typeAnnotation = tsType.typeAnnotation;
    if (!typeAnnotation) {
        if (tsType.type) {
            return transformType(tsType.type);
        }
        return;
    }
    return transformType(typeAnnotation.type);
}

function transformType(type) {
    switch (type) {
        case 'TSStringKeyword':
            return 'string';
        case 'TSNumberKeyword':
            return 'number';
        case 'TSBooleanKeyword':
            return 'boolean';
        default:
            return;
    }
}

const autoDocumentPlugin = declare((api, options, dirname) => {
    api.assertVersion(7);

    return {
        pre(file) {
            file.set('docs', []);
        },
        visitor: {
            FunctionDeclaration(path, state) {
                let comment =
                    (path.node.leadingComments &&
                        parseComment(path.node.leadingComments.at(-1).value)) ||
                    (path.parent &&
                        path.parent.type === 'ExportDefaultDeclaration' &&
                        path.parent.leadingComments &&
                        parseComment(path.parent.leadingComments.at(-1).value));

                const doc = {
                    type: 'function',
                    name: path.get('id').toString(),
                    params: path.get('params').map(paramPath => {
                        return {
                            name: paramPath.toString(),
                            type: resolveType(paramPath.getTypeAnnotation()),
                        };
                    }),
                    return:
                        resolveType(
                            path.get('returnType').getTypeAnnotation()
                        ) || 'void',
                    doc: comment,
                };
                if (doc.doc) {
                    const docs = state.file.get('docs');
                    docs.push(doc);
                    state.file.set('docs', docs);
                }
            },
            ClassDeclaration(path, state) {
                const classInfo: any = {
                    type: 'class',
                    name: path.get('id').toString(),
                    constructorInfo: {},
                    methodsInfo: [],
                    propertiesInfo: [],
                };
                if (path.node.leadingComments) {
                    classInfo.doc = parseComment(
                        path.node.leadingComments.at(-1).value
                    );
                }
                path.traverse({
                    ClassProperty(path) {
                        classInfo.propertiesInfo.push({
                            name: path.get('key').toString(),
                            type: resolveType(path.getTypeAnnotation()),
                            doc: [
                                path.node.leadingComments,
                                path.node.trailingComments,
                            ]
                                .filter(Boolean)
                                .map(comment => {
                                    return parseComment(comment.value);
                                })
                                .filter(Boolean),
                        });
                    },
                    ClassMethod(path) {
                        if (path.node.kind === 'constructor') {
                            classInfo.constructorInfo = {
                                params: path.get('params').map(paramPath => {
                                    return {
                                        name: paramPath.toString(),
                                        type: resolveType(
                                            paramPath.getTypeAnnotation()
                                        ),
                                        doc: parseComment(
                                            path.node.leadingComments.at(-1)
                                                .value
                                        ),
                                    };
                                }),
                            };
                        } else {
                            const methodDoc = {
                                name: path.get('key').toString(),
                                doc: parseComment(
                                    path.node.leadingComments.at(-1).value
                                ),
                                params: path.get('params').map(paramPath => {
                                    return {
                                        name: paramPath.toString(),
                                        type: resolveType(
                                            paramPath.getTypeAnnotation()
                                        ),
                                    };
                                }),
                                return:
                                    resolveType(
                                        path
                                            .get('returnType')
                                            .getTypeAnnotation()
                                    ) || 'void',
                            };
                            if (methodDoc.doc) {
                                classInfo.methodsInfo.push(methodDoc);
                            }
                        }
                    },
                });
                if (classInfo.doc || classInfo.methodsInfo.length) {
                    const docs = state.file.get('docs');
                    docs.push(classInfo);
                    state.file.set('docs', docs);
                }
            },
        },
        post(file) {
            const docs = file.get('docs');
            const res = generate(docs, options.format);
            fse.ensureDirSync(options.outputDir);
            fse.writeFileSync(
                path.join(options.outputDir, options.fileName + res.ext),
                res.content
            );
        },
    };
});

export default autoDocumentPlugin;
