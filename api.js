const fetch = require('node-fetch');

async function get(path) {
    const res = await fetch(path)
    return res.json()
}

module.exports = { 
    get,
}