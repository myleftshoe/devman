<script>
    export let pid = 'devman'
    export let file = 'none'

    import { fetchText } from './api'
    import Markdown from './markdown.svelte'
    import SplitPane from './SplitPane.svelte'

    console.log(pid, file)
</script>
<main>
{#await fetchText(`readfile/${encodeURIComponent(file)}`) then content}
	<SplitPane type="horizontal">
		<section slot=a style="border-right:1px solid #000">
            <Markdown {content}/>
		</section>
        <section slot=b>
            <textarea>
                {content}
            </textarea>
        </section>
	</SplitPane>{/await}
</main>

<style>
    main { 
        width: 100%;
        height: 100%;
        display:flex;
        align-items: strech;
    }
    section { 
        height: 100%;
        background:#f003
    }
    textarea { 
        padding: 20px 40px;
        width: 100%;
        height: 100%;
    }
    
</style>

