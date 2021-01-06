<script>
    import { fetchProjects } from './api'
</script>
<header>
    <h1>Projects</h1>
</header>
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
<header>
</header>
<style>
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
        display: flex;
        justify-content: center;
    }
</style>
