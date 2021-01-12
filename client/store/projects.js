import api from './api'

async function one(id) {
    const json = await api.get(`projects/${id}`)
    return json
}

async function all() {
    const json = await api.get(`projects`)
    const map = new Map(json)
    return [...map.values()]
}

function get(id) {
    return (id ? one(id) : all())
}    

export default {
    get,
}