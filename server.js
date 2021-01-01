const polka = require('polka')
const sirv = require('sirv')
const { exec, spawn } = require("child_process");

const apps = require('./apps')

const app = polka();

const { server } = app.use(sirv('public'));


// let spawn = require('child_process').spawn;
// let vlc = spawn('vlc');
// vlc.stderr.on('data', function(data) {
//     console.log(data.toString());
// });
// vlc.on('exit', function(code){
//     console.log('Exit code: ' + code);
// });

app.get('/test', (req, res) => {
    console.log('/')
    // exec('code', () => {})
    res.end('<a href="#">vscode</a>');
})


let result = []
const child = spawn('ls', ['/home/paul/Development/svelte'])
child.stdout.on('data', (data) => {
    console.log(`child stdout:\n${data}`);
    const a = data.toString().trim().split('\n')
    console.log(a)
    result = a
});



const { resolve } = require('path');
const { readdir } = require('fs').promises;

async function getFiles(dir) {
    const _dirents = await readdir(dir, { withFileTypes: true });
    const dirents = _dirents.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item))
    const files = await Promise.all(dirents
        // .filter(dirent => dirent.isDirectory())
        .map((dirent) => {
            const res = resolve(dir, dirent.name);
            return dirent.isDirectory() ? getFiles(res) : res;
        }));
    //   return Array.prototype.concat(...files);
    return files.flat(1)
    return files
}

// getFiles('/home/paul/Development/svelte')
//   .then(files => console.log('VVVVVVVVV',files))
//   .catch(e => console.error(e));

async function getDirectories(path) {
    const _dirents = await readdir(path, { withFileTypes: true });
    const dirents = _dirents
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
    return dirents
}

getDirectories('/home/paul/Development')
    .then(files => console.log('VVVVVVVVV', files))
    .catch(e => console.error(e));

app.get('/start', (req, res) => {
    console.log('fsfsdf')
    // exec('code', () => {})
    // const child = spawn('ls')
    // child.stdout.on('data', (data) => {
    //     console.log(`child stdout:\n${data}`);
    //     result = data
    //   });
    res.end('Hello world!');
})

app.get('/stdout', (req, res) => {
    res.end(result.map(x => `<a href="#">${x}</a>`).join('<p></p>'))
})

const PROJECTS_DIR = '/home/paul/Development'
function fullPath(leaf) {
    return `${PROJECTS_DIR}/${leaf}/`
}

console.log(fullPath('test'))

const projects = new Map([
    [
        'vlctv',
        {
            id: 'vlctv',
            path: fullPath('vlctv'),
            git: 'https://github.com',
            tags: ['gnome', 'gjs', 'web'],
        }
    ],
    [
        'lab',
        {
            id: 'lab',
            path: fullPath('lab'),
            tags: [],
        },
    ]
])

app.get('/api/projects', (req, res) => {
    const { id } = req.params
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


const port = process.env.NODE_PORT || 4020;

app.listen(port, err => {
    if (err) throw err;
    console.log(`(server.js) listening on localhost:${port}`);
})

