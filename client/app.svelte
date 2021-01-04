<script>
    import { Router, Route } from 'svelte-routing'
    import Project from './project.svelte'
    let pid
    export let url = ''
</script>
<Router {url} basepath='/'>
    <Route path='project/:pid' let:params>
        <Project pid={params.pid}/>
    </Route>
</Router>
<h1>THIS IS THE APP</h1>
