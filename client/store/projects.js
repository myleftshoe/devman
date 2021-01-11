import api from './api'

async function all() {
    const json = await api.get(`projects`)
    const map = new Map(json)
    return [...map.values()]
}

async function get(id) {
    if (id)
        return (await api.get(`projects/${id}`))
    return all()
}    

export default {
    get,
}