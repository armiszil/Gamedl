export function deepEqualsWithResult(obj1, obj2) {
    function isObject(obj) {
        return obj !== null && typeof obj === 'object';
    }

    function compare(obj1, obj2) {
        let result = {};

        for (let key in obj1) {
            if (obj1.hasOwnProperty(key)) {
                if (isObject(obj1[key]) && isObject(obj2[key])) {
                    result[key] = compare(obj1[key], obj2[key]);
                } else {
                    result[key] = obj1[key] === obj2[key];
                }
            }
        }
        return result;
    }

    return compare(obj1, obj2);
}