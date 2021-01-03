<script>
    import Project from './project.svelte'
    import router from 'page'
    let page
    let pid
    // router('/', () => page = Home)
    router('/project/:pid', 
        (ctx, next) => { 
            pid = ctx.params.pid
            next()
        }
    )

    router.start() 
</script>
<Project {pid}/>
<h1>THIS IS THE APP</h1>
