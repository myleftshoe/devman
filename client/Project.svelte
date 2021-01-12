<script>
    export let pid = 'lab'

	import { onMount } from 'svelte'
    import { read } from './store/file'
    import projects from './store/projects'
    import apps from './store/apps'
    import Languages from './Languages.svelte'
    import Markdown from './Markdown.svelte'
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

    function activeFile(project) {
        return `${project.path}/${project.markdownFiles[activeTabValue - 1]}`
    }

</script>

{#await projects.get(pid) then project}
    <page>
        <icons>
            <a href="{project.git}" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" height=32 width=32 class="icon"><path d="M 11.9991,2C 6.47774,2 2.00001,6.47712 2.00001,12.0006C 2.00001,16.4184 4.86504,20.1665 8.83877,21.489C 9.33909,21.5807 9.52142,21.272 9.52142,21.007C 9.52142,20.7696 9.51282,20.1407 9.50791,19.3062C 6.72636,19.9105 6.13948,17.9657 6.13948,17.9657C 5.68459,16.8105 5.02895,16.5029 5.02895,16.5029C 4.121,15.8824 5.09771,15.895 5.09771,15.895C 6.10143,15.9657 6.62936,16.9256 6.62936,16.9256C 7.52135,18.4537 8.97014,18.0125 9.53984,17.7565C 9.63069,17.1102 9.88914,16.6696 10.1746,16.4196C 7.95415,16.1672 5.61952,15.3093 5.61952,11.4773C 5.61952,10.3856 6.00934,9.49292 6.64902,8.79388C 6.54588,8.54089 6.20271,7.52417 6.74723,6.14739C 6.74723,6.14739 7.58643,5.87851 9.49686,7.17252C 10.2943,6.95073 11.1501,6.8398 12.0003,6.83594C 12.8499,6.8398 13.7051,6.95073 14.5038,7.17252C 16.413,5.87851 17.2509,6.14739 17.2509,6.14739C 17.7967,7.52417 17.4535,8.54089 17.351,8.79388C 17.9919,9.49292 18.3787,10.3856 18.3787,11.4773C 18.3787,15.3189 16.0403,16.1642 13.8131,16.4118C 14.1717,16.7205 14.4915,17.3308 14.4915,18.2637C 14.4915,19.6005 14.4792,20.6791 14.4792,21.007C 14.4792,21.2744 14.6597,21.5855 15.1668,21.4878C 19.1374,20.1629 22,16.4172 22,12.0006C 22,6.47712 17.5223,2 11.9991,2 Z "/></svg>
            </a>
        </icons>
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
                <edit>
                    <a target="_blank" href={`/${project.id}/${encodeURIComponent(activeFile(project))}`}>EDIT</a>
                </edit>
                {#await read(activeFile(project)) then content}
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
    icons {
        display:flex;
        align-items: center;
        justify-content: flex-end;
        height: 32px;
        padding: 32px 32px;
    }
    header { 
        display:flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }
    .icon {
        fill:#333;
        stroke:#333;
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
    edit {
        float: right;
        padding: 16px 24px;
    }
</style>