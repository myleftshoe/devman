<script>
    export let pid = 'lab'
	async function fetchProject(pid) {
        const res = await fetch(`../api/projects/${pid}`);
        const json = await res.json()
        return json;
    }
    async function fetchApps() {
        console.log('fetchApps')
        const res = await fetch(`../api/apps`);
        console.log('fetched!')
        const json = await res.json()
        console.log('json')
        const apps = json.map(([k, v]) => k)
        return apps;
    }
    function launchApp(appId) {
        fetch(`api/launch/${appId}/${pid}`);
    }

    fetchProject(pid).then((res) => console.log(res))
    $: console.log(pid)
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