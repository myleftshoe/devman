const polka = require('polka')
const sirv = require('sirv')
const { exec, spawn } = require("child_process");
const { fetchGuide } = require('./server/guide')
const { Player } = require('./server/player')
const cron = require('node-cron');

let guide = ['No data']
const player = new Player()

async function getGuide() {
    guide = await fetchGuide()
    console.log(`Fetched ${guide.length} day guide`)
}

// Get guide immediately then at 1am every day (in case computer is never powered down)
// getGuide()
getGuide()
cron.schedule('0 1 * * *', getGuide)

const app = polka();

const { server } = app.use(sirv('public'));

const vlc = {
    started: false,
    start() {
        player.start()
        // const vlc = spawn('vlc');
        // vlc.stderr.on('data', function(data) {
        //     console.log(`vlc: ${data.toString()}`);
        // });
        this.started = true
        // vlc.on('exit', (code) => {
        //     this.started = false
        //     console.log(`vlc: exited with code ${code}`);
        // });
    }
}
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
  .then(files => console.log('VVVVVVVVV',files))
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


app.get('/guide', (req, res) => {
    res.end(JSON.stringify(guide))
})

app.get('/pause', (req, res) => {
    res.end('ok')
    sendCommand('pause')
})

app.get('/open/:channel', (req, res) => {
    console.log(vlc.started)
    if (!vlc.started) {
        vlc.start()
    }
    const { channel } = req.params
    res.end('ok')
    sendCommand('clear')
    sendCommand('add', `channels/${channel}.xspf`)
})

const port = process.env.NODE_PORT || 4007;

app.listen(port, err => {
    if (err) throw err;
    console.log(`(server.js) listening on localhost:${port}`);
})

function sendCommand(cmd, arg = '') {
    const cmdline = `../sendCommand.sh ${cmd} ../${arg}`
    console.log(cmdline)
    exec(cmdline, function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: ' + error.code);
            console.log('Signal received: ' + error.signal);
        }
        console.log('Child Process STDOUT: ' + stdout);
        console.log('Child Process STDERR: ' + stderr);
    })
}