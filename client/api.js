const _get = async (path) => fetch(`/api/${path}`)
const _json = async (path) => (await _get(path)).json()
const _text = async (path) => (await _get(path)).text()

const get = async (path) => _json(path)
get.json = (path) => _json(path)
get.text = (path) => _text(path)


async function fetchProjects() {
    const projectsJson = await get(`projects`)
    const projectsMap = new Map(projectsJson)
    const projects = [...projectsMap.values()]
    return projects
}

async function fetchProject(pid) {
    const project = await get(`projects/${pid}`)
    return project
}

async function fetchApps() {
    const apps = await get(`apps`)
    return apps.map(([k, v]) => k)
}

function launchApp(pid, aid) {
    get(`launch/${aid}/${pid}`);
}


export { 
    get,
    fetchProjects,
    fetchProject,
    fetchApps,
    launchApp,
}