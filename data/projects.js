const PROJECTS_DIR = '/home/paul/Development'
function fullPath(folderName) {
    return `${PROJECTS_DIR}/${folderName}/`
}

const GIT_PATH = 'https://github.com/myleftshoe'
function fullGitPath(repoName) {
    return `${GIT_PATH}/${repoName}/`
}


const projects = new Map([
    [
        'vlctv',
        {
            id: 'vlctv',
            path: fullPath('vlctv'),
            git: fullGitPath('vlctv'),
            tags: ['gnome', 'gjs', 'web'],
        }
    ],
    [
        'pm',
        {
            id: 'pm',
            path: fullPath('pm'),
            git: fullGitPath('devman'),
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

module.exports = projects
