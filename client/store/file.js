import api from './api'

function write(file, content) {
    return api.post('write', {file, content})
}

function read(file) {
    return api.get.text(`read/${encodeURIComponent(file)}`)
}

export {
    read,
    write,
}