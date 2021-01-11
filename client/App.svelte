<script>
    import { Router, Route } from 'svelte-routing'
    import Projects from './Projects.svelte'
    import Project from './Project.svelte'
    import MarkdownEditor from './MarkdownEditor.svelte'
</script>
<Router>
    <Route path='project/:pid' let:params>
        <Project pid={params.pid}/>
    </Route>
    <Route path=':pid/:file' let:params>
        <MarkdownEditor pid={params.pid} file={params.file}/>
    </Route>
    <Route path='/' let:params>
        <Projects/>
    </Route>
</Router>
<!-- <zero-md src="README.md"></zero-md> -->
