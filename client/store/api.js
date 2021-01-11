const fech = async (path) => fetch(`/api/${path}`)
const json = async (path) => (await fech(path)).json()
const text = async (path) => (await fech(path)).text()

// return json by default
const get = json
get.json = json
get.text = text


function post(path, content = {}) {
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

