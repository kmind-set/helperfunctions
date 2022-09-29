

function getValuefromProperty(object, field) {

    const fields = field.split('.').length
    if (fields > 1) {
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
        let index = groupIndexes.findIndex((groupIndex) =>
        (fields.every((field) =>
            (getValuefromProperty(obj, field) == groupIndex[field])
        ))
        )

        if (index === -1) {

            let IndexObject = {}

            fields.forEach((field) => {
                IndexObject[field] = getValuefromProperty(obj, field)
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

const ListAnimals = [

    { name: "dog", age: 1 },
    { name: "cat", age: 2 },
    { name: "dolphin", age: 2 },
    { name: "tiger", age: 1 }
]

console.log(groupElements(ListAnimals, ["age"]))