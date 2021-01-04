const apps = new Map([
    [
        'code',
        {
            cmd: 'code',
            opts: [],
        }
    ],
    [
        'term',
        {
            cmd: 'gnome-terminal',
            opts: ['--working-directory']
        }
    ],
    [
        'files',
        {
            cmd: 'nautilus',
            opts: [],
        }
    ],
])

module.exports = apps