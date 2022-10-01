

function getValuefromProperty(object, field) {

    const fields = field.split('.')
    if (fields.length > 1) {

        return fields.reduce((prev, field) => {
            return prev[field]
        }, object)
    }

    return object[field]
}

function groupElements(arr, fields) {

    let groupIndexes = []
    let groupedElements = []

    let pointer

    arr.map((obj) => {

        let index = groupIndexes.findIndex((groupIndex) => (
            fields.every((field) => (
                (groupIndex[field instanceof Object ? field.field : field]) === (field instanceof Object ? field.fn(getValuefromProperty(obj, field.field)) : getValuefromProperty(obj, field))
            ))
        ))

        if (index === -1) {

            let IndexObject = {}

            fields.forEach((field) => {
                let fieldValueCriteria = field instanceof Object ? field.fn(getValuefromProperty(obj, field.field), obj) : getValuefromProperty(obj, field)
                IndexObject[field instanceof Object ? field.field : field] = fieldValueCriteria
            })

            groupIndexes.push(IndexObject)

            pointer = groupIndexes.length - 1
        } else {
            pointer = index
        }

        if (!Array.isArray(groupedElements[pointer])) {
            groupedElements[pointer] = []
        }
        groupedElements[pointer].push(obj)
    })
    return groupedElements

}

const pets = [

    { name: "dog", age: 1, owner: { name: "Phil" } },
    { name: "cat", age: 2, owner: { name: "Phil" } },
    { name: "dolphin", age: 2, owner: { name: "Ana" } },
    { name: "tiger", age: 1, owner: { name: "Phil" } }
]

console.log(groupElements(pets, ["age"]))
// console.log(groupElements(pets, ["owner.name"]))