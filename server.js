const polka = require('polka')
const sirv = require('sirv')
const { spawn } = require('child_process')
const fs = require('fs').promises;
const path = require('path');

const apps = require('./data/apps')
const projects = require('./data/projects')

const Git = require('./simplegit')

const simpleIcons = require('simple-icons');


const app = polka();

app.use(sirv('public', { 
    single: true,
    ignores: ['/api/'],
}))

app.get('/api/projects', (req, res) => {
    res.end(JSON.stringify([...projects]))
})


function getLang(lang) {
    console.log(lang)
    const _lang = lang.toLowerCase()
    return { 
        html: 'html5',
        css: 'css3',
    }[_lang] || _lang
}


const byPathDepth = (a,b) => a.split('/').length - b.split('/').length

app.get('api/test2', async function (req, res) {
    const markdownFiles = await getMarkdownFiles()
    res.end(JSON.stringify(markdownFiles))
});

async function getMarkdownFiles(basePath = __dirname) {
    const glob = require('glob');
    const util = require('util');
    
    const globPromise = util.promisify(glob)
    const files = await globPromise(basePath + '/**/*.md', {})
    const filtered = files.filter(file => !file.includes('node_modules'))
    const relative = filtered.map(file => path.relative(basePath, file))
    const sorted = relative.sort(byPathDepth)
    return sorted
}

app.get('/api/read/:filename', async function (req, res) {
    const filename = decodeURIComponent(req.params.filename)
    const content = await fs.readFile(filename)
    res.end(content.toString());
});

const { json } = require('body-parser');

app.use(json()).post('/api/write', async function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const { file = 'NOFILE.md', content } = req.body
    await fs.writeFile(file, content, 'utf8')
    res.end('OK');
});



app.get('/api/projects/:id', async (req, res) => {
    const { id } = req.params
    const project = projects.get(id)
    const git = new Git(project.path)
    project.remote = await git.remote
    project.languages = await git.languages
    project.icons = Object.keys(project.languages).reduce((acc, cur) => {
        const icon = simpleIcons.get(getLang(cur));
        return { ...acc, [cur]: icon } 

    }, {})
    project.markdownFiles = await getMarkdownFiles(project.path)
    console.log(project)
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
    res.end(JSON.stringify("launched"))
})

const port = process.env.NODE_PORT || 4020

app.listen(port, err => {
    if (err) throw err
    console.log(`(server.js) listening on http://localhost:${port}`)
})




