// pretend objects from the server for the mock api
const objects = [{
    id: 1,
    name: 'Interesting Object from the Desert',
    created_at: new Date(2021, 12, 11)
}, {
    id: 2,
    name: 'Rare Object from the Ocean Floor',
    created_at: new Date(2019, 11, 3)
}]

export function getObjects() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(objects)
        }, 300)
    })
}
// Simulate API call
export function fetchObject(objectId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const object = objects.find(object => object.id === objectId)
            if (object) {
                resolve(object)
            } else {
                reject(Error('Object does not exist.'))
            }
        }, 300)
    }).catch(() => {
        console.log('Error no object with that Id')
    })
}