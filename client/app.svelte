<script>
    import { Router, Route } from 'svelte-routing'
    import Project from './project.svelte'
</script>
<Router>
    <Route path='project/:pid' let:params>
        <Project pid={params.pid}/>
    </Route>
</Router>
