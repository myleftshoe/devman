const PROJECTS_DIR = '/home/paul/Development'

function fullPath(leaf) {
    return `${PROJECTS_DIR}/${leaf}/`
}

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
        'pm',
        {
            id: 'pm',
            path: fullPath('pm'),
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

module.exports = projects
