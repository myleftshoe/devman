const polka = require('polka')
const sirv = require('sirv')
const { spawn } = require('child_process')

const apps = require('./data/apps')
const projects = require('./data/projects')

const app = polka();

app.use(sirv('public', { 
    single: true,
    ignores: ['/api/'],
}))

app.get('/api/projects', (req, res) => {
    res.end(JSON.stringify([...projects]))
})

app.get('/api/projects/:id', (req, res) => {
    const { id } = req.params
    const project = projects.get(id)
    res.end(JSON.stringify(project))
})

app.get('/api/apps', (req, res) => {
    res.end(JSON.stringify([...apps]))
})

app.get('/api/launch/:aid/:pid', (req, res) => {
    const { aid, pid } = req.params
    const { cmd, opts } = apps.get(aid)
    const { id, path, tags } = projects.get(pid)
    const child = spawn(cmd, [...opts, path])
    res.end("launched")
})

const port = process.env.NODE_PORT || 4020

app.listen(port, err => {
    if (err) throw err
    console.log(`(server.js) listening on localhost:${port}`)
})

