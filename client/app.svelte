<script>
    import Project from './project.svelte'
    import router from 'page'
    let page
    // router('/', () => page = Home)
    router('/about', () => page = Project)

    router.start() 
</script>
<svelte:component this={page} />
<h1>THIS IS THE APP</h1>
