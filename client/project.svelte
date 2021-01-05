<script>
    export let pid = 'lab'
    async function get(path) {
        const res = await fetch(`../api/${path}`)
        return res.json()
    }
	async function fetchProject(pid) {
        const project = await get(`projects/${pid}`)
        return project
    }
    async function fetchApps() {
        const apps = await get(`apps`)
        return apps.map(([k, v]) => k)
    }
    function launchApp(appId) {
        get(`launch/${appId}/${pid}`);
    }

</script>
<page>
    <header>
        {#await fetchProject(pid) then project}
            <h1>{project.id}</h1>
            <h2>{project.path}</h2>
            <a href={project.remote}>{project.remote}</a>
            <a href="https://github.com/myleftshoe/devman" title="Fork me on Github">
                <img
                src="https://img.shields.io/github/package-json/v/myleftshoe/devman?style=for-the-badge&logo=github&label=fork+me+on+github"
                alt="version">
            </a>            
            
        {/await}
    </header>
    <main>
        {#await fetchApps() then apps}
            {#each apps as aid, i}
                <button on:click={() => launchApp(aid)}><img class="appicon" src="../{aid}.png" alt="Submit"></button>
            {/each}
        {/await}
    </main>
</page>

<style>
    page { 
        height:100vh;
        display:flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    header { 
        text-align: center;
    }
    h1 { 
        font-size: 64px;
    }
    main {
        display:flex;
        justify-content: center;
        gap: 128px;
    }
    .appicon {
        height: 128px;
        width: 128px;
    }

</style>