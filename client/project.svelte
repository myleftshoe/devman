<script>
    export let pid = 'vlctv'
	async function fetchProject(pid) {
        const res = await fetch(`api/projects/${pid}`);
        const json = await res.json()
        return json;
    }
    async function fetchApps() {
        const res = await fetch(`api/apps`);
        const json = await res.json()
        const apps = json.map(([k, v]) => k)
        return apps;
    }
    function launchApp(appId) {
        fetch(`api/launch/${appId}/${pid}`);
    }

    fetchProject(pid).then((res) => console.log(res))
</script>

<h1>THIS IS THE APP</h1>
<main>
    {#await fetchApps() then apps}
        {#each apps as aid, i}
            <button on:click={() => launchApp(aid)}><img src="{aid}.png" alt="Submit"></button>
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