<script>
    export let pid = 'lab'

	import { onMount } from 'svelte';
    import api from './store/api'
    import projects from './store/projects'
    import apps from './store/apps'
    import Languages from './languages.svelte'
    import Markdown from './markdown.svelte'
    import Tabs from "./Tabs.svelte";

    let activeTabValue = 1

    function getLang(lang) {
        const _lang = lang.toLowerCase()
        return { 
            html: 'html5',
            css: 'css3',
        }[_lang] || _lang
    }

    function tabItemsFromArrayOfFilenames(filenames = []) {
        return filenames.map((filename, i) => ({
            label: filename.split('.')[0],
            value: i + 1,
        }))
    }
</script>

{#await projects.get(pid) then project}
    <page>
        <header>
            <h1>{project.id}</h1>
            <language-icons>
                {#each Object.entries(project.icons) as [lang, icon]}
                    <svg height=32 width=64 fill="#333">
                        {@html icon.svg}
                    </svg>
                {/each}
            </language-icons>
        </header>
        <main>
            <Tabs bind:activeTabValue items={tabItemsFromArrayOfFilenames(project.markdownFiles)}>
                {#await api.get.text(`readfile/${encodeURIComponent(`${project.path}/${project.markdownFiles[activeTabValue - 1]}`)}`) then content}
                    <Markdown {content}/>
                {/await}
            </Tabs>
        </main>
        <footer>
            {#await apps.get() then applist}
                {#each applist as aid, i}
                    <button on:click={apps.launch(project.id, aid)}><img class="appicon" src="../{aid}.png" alt="Submit"></button>
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
        margin-bottom: 0;
        padding-bottom: 0;
    }
    main {
        flex: 1;
        display:flex;
        flex-direction: column;
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
        cursor: pointer;
    }

</style>