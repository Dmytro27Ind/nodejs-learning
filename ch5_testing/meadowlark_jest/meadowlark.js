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
