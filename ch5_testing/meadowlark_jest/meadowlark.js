const express = require('express')
const { engine } = require('express-handlebars');
const handlers = require('./lib/handlers')

const app = express()
const port = process.env.PORT || 3000

// Настройка механизма представлений Handlebars.
app.engine('handlebars', engine({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')
app.set('views', './views');

// for static files
app.use(express.static(__dirname + '/public'))

app.get('/', handlers.home)

app.get('/about', handlers.about)

// to get request headers
app.get('/headers', (req, res) => {
    res.type('text/plain')
    const headers = Object.entries(req.headers)
        .map(([key, value]) => `${key}: ${value}`)
    res.send(headers.join('\n'))
})

// Пользовательская страница 404
app.use(handlers.notFound)

// Пользовательская страница 500
app.use(handlers.serverError)

if(require.main === module){
    app.listen(port, () => console.log(
        `Express web server started on http://localhost:${port}\n` +
        `Press Ctrl+C for exit...`
    ))
} else {
    module.exports = app
}
