<script>
    import { Router, Route } from 'svelte-routing'
    import Projects from './projects.svelte'
    import Project from './project.svelte'
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
