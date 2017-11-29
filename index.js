const deepmerge = require('deepmerge');

exports.dataset = (() => {
    let data = {};

    let extractArrayFromKey = (key) => {
        return key
            .split('/')
            .filter((str) => str !== '')
        ;
    };

    return {
        get: (key) => {
            let returnData = data;
            for (part of extractArrayFromKey(key)) {
                if (!returnData.hasOwnProperty(part)) {
                    return null;
                }

                returnData = returnData[part];
            }

            return returnData;
        },
        set: (key, value) => {
            let dataToMerge = value;
            for (part of extractArrayFromKey(key).reverse()) {
                let tmpData = {};
                tmpData[part] = dataToMerge;
                dataToMerge = tmpData;
            }

            data = deepmerge(data, dataToMerge);
        }
    }
})();