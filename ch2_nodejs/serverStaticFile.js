const http = require('http')
const fs = require('fs')

const port = process.env.PORT || 3000

function serverStaticFile(res, path, contentType, responseCode = 200) {
    fs.readFile(__dirname + path, (err, data) => {
        if(err){
            res.writeHead(500, { 'Content-type': 'text/plain' })
            return res.end('500 - Internal error')
        }
        res.writeHead(responseCode, { 'Content-type': contentType })
        res.end(data)
    })
}

const server = http.createServer((req, res) => {
    // Приводим URL к единому виду, удаляя
    // строку запроса, необязательную косую черту
    // в конце строки и переводя в нижний регистр.
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()

    switch(path){
        case '':
            serverStaticFile(res, '/public/home.html', 'text/html')
            break
        case '/about':
            serverStaticFile(res, '/public/about.html', 'text/html')
            break
        case '/img/node_logo.png':
            serverStaticFile(res, '/public/img/node_logo.png', 'image/png')
            break
        default:
            serverStaticFile(res, '/public/404.html', 'text/html')
            break
    }
})

server.listen(port, () => console.log(`Server started on port ${port}; ` + `\nPress Ctrl+C for ended...`))