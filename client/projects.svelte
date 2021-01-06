<script>
    import { fetchProjects } from './api'
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
