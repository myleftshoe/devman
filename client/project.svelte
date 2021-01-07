<script>
	import { onMount } from 'svelte';
    import { fetchProject, fetchApps, launchApp } from './api'
    import Languages from './languages.svelte'
    import marked from 'marked';
    // import { ZeroMd } from 'zero-md'
    export let pid = 'lab'
    // customElements.define('zero-md', ZeroMd)
    // let Icon
    // onMount(async () => {
    //     Icon = (await import('@icons-pack/svelte-simple-icons')).Svelte;
    // })
    function getLang(lang) {
        console.log(lang)
        const _lang = lang.toLowerCase()
        return { 
            html: 'html5',
            css: 'css3',
        }[_lang] || _lang
    }
    let source = `**This** is my [markdown](https://example.com)`
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
            <language-icons>
                {#each Object.keys(project.languages) as lang}
                    <img height="32" width="32" src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/{getLang(lang)}.svg" />
                {/each}
            </language-icons>
            <a href="{project.git}" title="Open me on Github">
                <img
                    src="https://badgen.net/github/last-commit/micromatch/micromatch"
                    alt="version"
                >
            </a> 
        </header>
        <!-- <a href={project.remote}>{project.remote}</a> -->
        <!-- <Icon/> -->
        <main>
            <details>
                <summary/>
                <textarea rows=10 bind:value={source}/>
                </details>
                {@html marked(source)}
            <!-- <a href="{project.git}" title="Open me on Github">
                <img alt="github stats" 
                    src="https://github-readme-stats.anuraghazra1.vercel.app/api/pin/?username=myleftshoe&amp;repo=vlctv&amp;theme=material-palenight"
                >
            </a> -->
            <!-- <a href="{project.git}" title="Open me on Github">
                <img alt="github stats" 
                    src="https://github-readme-stats.vercel.app/api/top-langs/?username=myleftshoe&layout=compact"
                >
            </a> -->
            <!-- {#each Object.keys(project.languages) as lang}
                <a href="{project.git}" title="Open me on Github">
                    <img
                        src="https://img.shields.io/static/v1?label={lang}&message={project.languages[lang]}&color=blue&logo=github"
                        alt="version"
                    >
                </a>
            {/each} -->
            <!-- <Languages languages={project.languages}/> -->
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
details > summary {
    list-style-type: none;
    text-align: right;
    outline: none;
    cursor: pointer;
}
details > summary::after {
    color: rgb(0,80,160);
    content: 'EDIT';
}

details[open] > summary::after {
    content: 'DONE';
}
details > summary::-webkit-details-marker {
    display: none;
}
textarea { 
    width: 100%;
    /* border: 0; */
    /* padding:0; */
}
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
        /* border: 1px solid red; */
    }
    h1 { 
        font-size: 128px;
        margin-bottom: 0;
        padding-bottom: 0;
    }
    main {
        flex: 1;
        display:flex;
        flex-direction: column;
        /* align-items: center; */
        border: 1px solid #0001;
        border-radius:8px;
        margin-left: 20%;
        margin-right: 20%;
        padding: 20px;
    }
    footer {
        display:flex;
        justify-content: center;
        gap: 64px;
        margin-bottom: 16px;
        margin-top: 16px;
    }
    .appicon {
        height: 128px;
        width: 128px;
    }
    language-icons {
        margin-botom: -16px;
        display:flex;
        justify-content: center;
        gap: 16px;
    }

</style>