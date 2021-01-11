import api from './api'

function write(file, content) {
    return api.post('writefile', {file, content})
}

function read(file) {
    return api.get.text(`readfile/${encodeURIComponent(file)}`)
}

export {
    read,
    write,
}