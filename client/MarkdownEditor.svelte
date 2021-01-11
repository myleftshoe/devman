<script>
    export let pid = 'devman'
    export let file = 'none.md'

    import { onMount } from 'svelte'
    import api from './store/api'
    import { read, write } from './store/file'
    import Markdown from './markdown.svelte'
    import SplitPane from './SplitPane.svelte'

    let content
    
    async function init() {
        content = await read(file)
    }
    
    onMount(init)

    console.log('Markdown.svelte', pid, file)

</script>
<page>
    <header>
        <strong>{file}</strong>
        <button on:click={write(file, content)}>SAVE</button>
    </header>
    <main>
        {#if content}
            <SplitPane type="horizontal">
                <section slot=a style="border-right:1px solid #000">
                    <Markdown {content}/>
                </section>
                <section slot=b>
                    <textarea bind:value={content}/>
                </section>
            </SplitPane>
        {/if}
    </main>
</page>
<style>
    page { 
        display:flex;
        flex-direction: column;
        height: 100%;
    }
    main { 
        width: 100%;
        height: 100%;
        display:flex;
        /* align-items: stretch; */
    }
    section { 
        height: 100%;
        background:#f003
    }
    textarea { 
        padding: 20px 40px;
        width: 100%;
        height: 100%;
        resize: none;
    }
    button { 
        float: right;
        padding-left: 24px;
        padding-right: 24px;
    }
    
</style>

