import api from './api'

async function get() {
    const apps = await api.get(`apps`)
    return apps.map(([k, v]) => k)
}

function launch(pid, aid) {
    api.get(`launch/${aid}/${pid}`);
}

export default {
    get,
    launch
}