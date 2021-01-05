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
    {#await fetchProject(pid) then project}
        <header>
            <h1>{project.id}</h1>
            <!-- <h2>{project.path}</h2> -->
            <!-- <a href="https://github.com/myleftshoe/devman" title="Open me on Github">
                <img
                src="https://img.shields.io/static/v1?label=myleftshoe&message=vlctv&color=blue&logo=github"
                alt="version">
            </a>  -->
            <a href="{project.git}" title="Open me on Github">
                <img alt="github stats" 
                    src="https://github-readme-stats.anuraghazra1.vercel.app/api/pin/?username=myleftshoe&amp;repo=vlctv&amp;theme=material-palenight"
                >
            </a>
            <a href="{project.git}" title="Open me on Github">
                <img
                    src="https://badgen.net/github/last-commit/micromatch/micromatch"
                    alt="version"
                >
            </a> 
        </header>
        <!-- <a href={project.remote}>{project.remote}</a> -->
        <main>
            {#await fetchApps() then apps}
                {#each apps as aid, i}
                    <button on:click={() => launchApp(aid)}><img class="appicon" src="../{aid}.png" alt="Submit"></button>
                {/each}
            {/await}
        </main>
    {/await}
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
        display:flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }
    h1 { 
        font-size: 128px;
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