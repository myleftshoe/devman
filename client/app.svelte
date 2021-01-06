<script>
    import { Router, Route } from 'svelte-routing'
    import Projects from './projects.svelte'
    import Project from './project.svelte'
    async function get(path) {
        const res = await fetch(`../api/${path}`)
        return res.json()
    }
    async function fetchProjects() {
        const projectsJson = await get(`projects`)
        const projectsMap = new Map(projectsJson)
        const projects = [...projectsMap.values()]
        console.log(projects)
        return projects
    }
</script>
<Router>
    <Route path='project/:pid' let:params>
        <Project pid={params.pid}/>
    </Route>
    <Route path='/' let:params>
        <Projects/>
    </Route>
</Router>
<!-- <zero-md src="README.md"></zero-md> -->
