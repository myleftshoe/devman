<script>
    import { fetchProject, fetchApps, launchApp } from './api'
    export let pid = 'lab'
</script>
{#await fetchProject(pid) then project}
    <page>
        <header>
            <h1>{project.id}</h1>
            <!-- <h2>{project.path}</h2> -->
            <!-- <a href="https://github.com/myleftshoe/devman" title="Open me on Github">
                <img
                src="https://img.shields.io/static/v1?label=myleftshoe&message=vlctv&color=blue&logo=github"
                alt="version">
            </a>  -->
        </header>
        <!-- <a href={project.remote}>{project.remote}</a> -->
        <main>
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
            {#each Object.keys(project.languages) as lang}
                <a href="{project.git}" title="Open me on Github">
                    <img
                        src="https://img.shields.io/static/v1?label={lang}&message={project.languages[lang]}&color=blue&logo=github"
                        alt="version"
                    >
                </a>
            {/each}
        </main>
        <footer>
            {#await fetchApps() then apps}
                {#each apps as aid, i}
                    <button on:click={() => launchApp(pid, aid)}><img class="appicon" src="../{aid}.png" alt="Submit"></button>
                {/each}
            {/await}
        </footer>
    </page>    
{/await}

<style>
    page { 
        display: flex;
        flex-direction: column;
        height:100vh;
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
        flex: 1;
        display:flex;
        flex-direction: column;
        align-items: center;
    }
    footer {
        display:flex;
        justify-content: center;
        gap: 64px;
    }
    .appicon {
        height: 128px;
        width: 128px;
    }

</style>