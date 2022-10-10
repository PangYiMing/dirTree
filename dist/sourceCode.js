/**
 * say 你好
 * @param name 名字
 */
function sayHi(name, age, a) {
    console.log(`hi, ${name}`);
    return `hi, ${name}`;
}
/**
 * say 你好,没有返回类型
 * @param name 名字
 */
function sayHi2() {
    console.log(`hi, ${name}`);
}
/**
 * 类测试
 */
class Guang {
    constructor(name) {
        this.name = name;
    }
    /**
     * 方法测试
     */
    sayHi() {
        return `hi, I'm ${this.name}`;
    }
    /**
     * 方法测试2
     */
    sayHi2(str) {
        return `hi, I'm ${this.name}. ${str}`;
    }
}
