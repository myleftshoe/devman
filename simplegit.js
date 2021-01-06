const simpleGit = require('simple-git');
const { get } = require('./api')

const git = simpleGit(undefined)

// git.listRemote(['--get-url'], (err, data) => {
//     if (!err) {
//         console.log('Remote url for repository at ' + __dirname + ':');
//         console.log(data);
//     }
// });

class Git {
    constructor(path) {
        this.path = path
        this.git = simpleGit(this.path)
    }
    get remote() {
        return this.git.listRemote(['--get-url'])
    }
    get languages() {
        const languages = get('https://api.github.com/repos/myleftshoe/vlctv/languages')
        return languages
    }

}

module.exports = Git