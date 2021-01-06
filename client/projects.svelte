<script>
    async function get(path) {
        const res = await fetch(`../api/${path}`)
        return res.json()
    }
    async function fetchProjects() {
        const projectsJson = await get(`projects`)
        const projectsMap = new Map(projectsJson)
        const projects = [...projectsMap.values()]
        console.log(projects)
        return projects
    }
</script>
<main>
{#await fetchProjects() then projects}
    {#each projects as { id, git }, i}
        {#if git}
            <a href="project/{id}" title="Open me on Github">
                <img alt="github stats" 
                    src="https://github-readme-stats.anuraghazra1.vercel.app/api/pin/?username=myleftshoe&amp;repo={id}&amp;theme=material-palenight"
                >
            </a>
        {/if}
    {/each}
{/await}
</main>
<!-- <zero-md src="README.md"></zero-md> -->
