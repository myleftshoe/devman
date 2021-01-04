const git = require('simple-git')();

git.listRemote(['--get-url'], (err, data) => {
    console.log('fsdfs')
    if (!err) {
        console.log('Remote url for repository at ' + __dirname + ':');
        console.log(data);
    }
});