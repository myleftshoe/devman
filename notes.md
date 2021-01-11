These are the notes

TEST


```
import api from './api'

function write(file, content) {
    fetch('/api/writefile', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({file, content}),
    })
}

function read(file) {
    return api.get.text(`readfile/${encodeURIComponent(file)}`)
}

export {
    read,
    write,
}

```