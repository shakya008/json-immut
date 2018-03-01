const hasOwnProperty = Object.prototype.hasOwnProperty;
export function update(data, key, value) {
    data = extend(data);
    data[key] = value;
    return data;
}

export function extend(...args) {
    let target = {};
    for (let i = 0; i < args.length; i++) {
        let source = args[i];
        for (let key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
}
