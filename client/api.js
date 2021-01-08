async function get(path) {
    const res = await fetch(`../api/${path}`)
    return res.json()
}

async function fetchText(path) {
    const res = await fetch(`../api/${path}`)
    return res.text()
}


async function fetchProjects() {
    const projectsJson = await get(`projects`)
    const projectsMap = new Map(projectsJson)
    const projects = [...projectsMap.values()]
    console.log(projects)
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
    fetchText
}