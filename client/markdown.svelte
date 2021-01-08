<script>
    import marked from 'marked';
    export let content = "# Default Content"
    export let editMode = false
</script>
{#if editMode}
    <textarea>
        {content}
    </textarea>
{:else}
    <div>
        {@html marked(content)}
    </div>
{/if}
<style>
    textarea {
        height: 100%;
        width: 100%;
        border: none;
        margin: 0;
    }
    div {
        padding-left: 40px;
        padding-right: 40px;
    }
</style>

