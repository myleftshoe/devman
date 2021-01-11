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
<button on:click={save(content)}>SAVE</button>

<style>
    main { 
        width: 100%;
        height: 100%;
        display:flex;
        align-items: strech;
    }
    section { 
        height: 80%;
        background:#f003
    }
    textarea { 
        padding: 20px 40px;
        width: 100%;
        height: 100%;
    }
    
</style>

