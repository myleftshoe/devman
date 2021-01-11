<script>
    export let languages
    const total = Object.values(languages).reduce((a, b) => a + b, 0)
    const _languages = Object.entries(languages).reduce((acc, [k, v]) => {
        console.log(k,v)
        const percentage = v/total*100
        if (percentage < 1) { 
            if (!acc.other)
                acc.other = 0
            acc.other += percentage
        }
        else 
            acc[k] = percentage
        return acc
    }, {})
    // const _languages = Object.entries(languages).map(([k, v]) => {
    //     console.log(k,v)
    //     const percentage = Math.round(v/total*100) || '< 1' + '%'
    //     return [k, `${percentage}%`]
    // })
    console.log(_languages)
    console.log(Object.entries(_languages))
    const colors = ['green', 'red', 'blue']
</script>
<div>
    {#each Object.entries(_languages) as [language, percent], i}
        <div class='bar' style="background: {colors[i]}; flex: 0 0 {percent}%"></div>
    {/each}
</div>
<style>
    div { 
        display: flex;
        height: 8px;
        width: 400px;
        border-radius:4px;
        background: gray;
        overflow:hidden;
    }
    .bar {
        background: red;
        height:100%;
    }
</style>