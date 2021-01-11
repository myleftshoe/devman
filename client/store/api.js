const _get = async (path) => fetch(`/api/${path}`)
const json = async (path) => (await _get(path)).json()
const text = async (path) => (await _get(path)).text()

const get = (path) => json(path)
get.json = (path) => json(path)
get.text = (path) => text(path)


function post(path, content = { message: "NO CONTENT" }) {
    fetch(`/api/${path}`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
    })
}


export default {
    get,
    post,
}

