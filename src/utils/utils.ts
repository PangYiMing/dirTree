import path from "path";

export function execAbortArr(arr: string[]): string[] {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = path.sep + arr[i]
    }
    return arr
}


export function strNotIncludeStringInArr(str: string, arr: string[]) {
    for (let i = 0; i < arr.length; i++) {
        if (str.indexOf(arr[i]) !== -1) {
            return false
        }
    }
    return true
}
