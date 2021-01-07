const polka = require('polka')
const sirv = require('sirv')
const { spawn } = require('child_process')

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




app.get('api/test2', function (req, res) {
    const fs = require('fs').promises;
    const path = require('path');
    const glob = require('glob');
    
    glob(__dirname + '/**/*.md', {}, (err, files)=>{
        const filtered = files.filter(file => !file.includes('node_modules'))
        const relative = filtered.map(file => path.relative(__dirname, file))
        const sorted = relative.sort((a,b) => {
            return (a.split('/').length - b.split('/').length)
        })
        res.end(JSON.stringify(sorted))
    })
});



app.get('api/test', function (req, res) {
    fs.readFile(path.join(__dirname, '/README.md')).then(function(val) {
        console.log(path.join(__dirname, '/README.md'))
        console.log(val.toString())
        res.end(val.toString());
    });
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




