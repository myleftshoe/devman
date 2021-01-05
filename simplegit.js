const simpleGit = require('simple-git');

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
}

module.exports = Git