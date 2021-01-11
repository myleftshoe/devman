<script>
    export let pid = 'devman'
    export let file = 'none.md'

    import api from './store/api'
    import Markdown from './markdown.svelte'
    import SplitPane from './SplitPane.svelte'

    import { onMount } from 'svelte'

    let content
    onMount(async () => {
        content = await api.get.text(`readfile/${encodeURIComponent(file)}`)
    })
    console.log(pid, file)

    function save(content) {
        console.log(file, content)
        fetch('../api/writefile', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({file, content}),
        })
    }
</script>
<page>
    <header>
        <strong>{file}</strong>
        <button on:click={save(content)}>SAVE</button>
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

