const _get = async (path) => fetch(`/api/${path}`)
const json = async (path) => (await _get(path)).json()
const text = async (path) => (await _get(path)).text()

// return json by default
const get = json
get.json = json
get.text = text


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

