<script>
	import { onMount } from 'svelte';
    import { fetchProject, fetchApps, launchApp, get, fetchText } from './api'
    import Languages from './languages.svelte'
    import Markdown from './markdown.svelte'
    import marked from 'marked';
    // import { ZeroMd } from 'zero-md'

    export let pid = 'lab'
    // customElements.define('zero-md', ZeroMd)
    // let Icon
    // onMount(async () => {
    //     Icon = (await import('@icons-pack/svelte-simple-icons')).Svelte;
    // })


    import Tabs from "./Tabs.svelte";

    function getLang(lang) {
        console.log(lang)
        const _lang = lang.toLowerCase()
        return { 
            html: 'html5',
            css: 'css3',
        }[_lang] || _lang
    }
    let source = `**This** is my [markdown](https://example.com)`
    let activeTabValue = 1
    $: console.log(activeTabValue)
</script>
{#await fetchProject(pid) then project}
    <page>
        {console.log(project.icons) || ''}
        <header>
            <h1>{project.id}</h1>
            <!-- <h2>{project.path}</h2> -->
            <!-- <a href="https://github.com/myleftshoe/devman" title="Open me on Github">
                <img
                src="https://img.shields.io/static/v1?label=myleftshoe&message=vlctv&color=blue&logo=github"
                alt="version">
            </a>  -->
            <language-icons>
                {#each Object.entries(project.icons) as [lang, icon]}
                    {console.log(icon) || ''}
                    <!-- <img height="32" width="32" src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/{getLang(lang)}.svg" /> -->
                    <svg height=32 width=64 fill="#333">
                        {@html icon.svg}
                    </svg>
                    <!-- <svg height="32" width="32">
                        <path d={icon.path}/>
                    </svg> -->
                    <!-- <object title="Arrow Circle" type="image/svg+xml" data={icon.svg}></object> -->
                {/each}
            </language-icons>
            <!-- <a href="{project.git}" title="Open me on Github">
                <img
                    src="https://badgen.net/github/last-commit/micromatch/micromatch"
                    alt="version"
                >
            </a>  -->
        </header>
        <!-- <a href={project.remote}>{project.remote}</a> -->
        <!-- <Icon/> -->
        <main>
            <Tabs bind:activeTabValue items={project.markdownFiles.map((mdf, i) => ({
                label: mdf.split('.')[0],
                value: i + 1,
                component: Markdown,
                props: {
                    content:`This is the content pf ${mdf}`
                }
            }))}>
                {#await fetchText(`readfile/${encodeURIComponent(`${project.path}/${project.markdownFiles[activeTabValue - 1]}`)}`) then content}
                    <Markdown {content}/>
                {/await}
            </Tabs>

            <!-- <tabs>
                {#await get('test2') then mdFiles}
                    {#each mdFiles as mdf, i}
                        <div>{mdf}</div>
                    {/each}
                {/await}
            </tabs>
            <details>
                <summary/>
                <textarea rows=10 bind:value={source}/>
            </details> -->
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
tabs { 
    display:flex;
    gap: 32px;
    font-size: 12px;
    margin-top: -8px;
    padding-top: 0;
    padding-bottom: 8px;
    border-bottom: 1px solid #0001;
}
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
        /* border: 1px solid #0001; */
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
        /* margin-bottom: -16px; */
        /* display:flex; */
        /* justify-content: center; */
        /* gap: 16px; */
        /* background: #333; */
        /* border-radius: 8px; */
        /* padding: 8px; */
    }

</style>