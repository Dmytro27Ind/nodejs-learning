const express = require('express')
const { engine } = require('express-handlebars');
const handlers = require('./lib/handlers')

const app = express()
const port = process.env.PORT || 3000

// to disable x-powered-by header for request from hackers
app.disable('x-powered-by')

// Настройка механизма представлений Handlebars.
app.engine('handlebars', engine({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')
app.set('views', './views');

// for static files
app.use(express.static(__dirname + '/public'))

app.get('/', handlers.home)


//* in own module
app.get('/about', handlers.about)

// //* standard uses
// app.get('/about', (req, res) => {
//     res.render('about')
// })
// //* send code (default 200)
// app.get('/about', (req, res) => {
//     res.status(500)
//     res.render('error')
// })
// //* send code (default 200)     in one row
// app.get('/about', (req, res) => {
//     res.status(500).render('500')
// })

//* Передача контекста представлению, включая строку запроса, cookies
//* и значения сеансовых переменных
app.get('/greeting', (req, res) => {
    res.render('greeting', {
        message: 'Hello, man',
        style: req.query.style,
        userid: req.cookies.userid,
        username: req.session.username
    })
})

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
