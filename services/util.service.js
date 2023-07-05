export const utilService = {
    makeId,
<<<<<<< HEAD
    load,
    save
=======
    load
>>>>>>> 9da366e6e61f054e863c34ad773b43bb09620f4b
}

function makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function load(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}
function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}