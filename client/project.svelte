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

    fetchProject(pid).then((res) => console.log(res))
</script>
<h1>THIS IS THE PROJECT</h1>
<main>
    {#await fetchApps() then apps}
        {#each apps as aid, i}
            <button on:click={() => launchApp(aid)}><img src="../{aid}.png" alt="Submit"></button>
        {/each}
    {/await}
</main>

<style>
    main {
        display:flex;
        justify-content: center;
        gap:32px;
    }
    img {
        height: 64px;
        width: 64px;
    }
</style>