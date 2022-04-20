import isPlainObject from 'lodash/isPlainObject'

/****
 ** This Function is using to get the value from an object for a dynamic key
 ** Key can be used for nested object as well
 ** key/lookup hierarchy can be created as '-' operator
 ** Conditional key also can be used with the help of ':' operator
 ** RowData example const obj = {one: "One", two: {three : "Three"}, four: "Four"}
 ** if you pass lookUpKey as 'one' you will get output as "One"
 ** if you pass lookUpKey as 'two-three' you will get output as "Three"
 ** if you pass lookUpKey as 'two-three:four' you will get still get output as "Three"
 ** if you pass lookUpKey as 'two-five:four' you will get still get output as "Four"
 ****/
export const getValueForDynamicKey = (rowData = {}, lookUpKey) => {
    const value = ''
    if (!lookUpKey) return value

    const lookUpKeyList = lookUpKey.split(':')
    for (let i = 0; i < lookUpKeyList.length; i++) {
        const keysList = lookUpKeyList[i].split('-')
        let val = rowData
        for (let j = 0; j < keysList.length; j++) {
            const element = keysList[j]
            if (val.hasOwnProperty(element)) {
                val = val[element]
                if (!isPlainObject(val)) {
                    return val
                }
            } else {
                break
            }
        }
    }
    return value
}
