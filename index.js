const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
const { engine } = require('express-handlebars')
const pool = require("./config/db")
const body = require("body-parser")

//Configuração do Template Engine
app.engine('handlebars', engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.get("/cad", (req, res) => {
    res.render("formulario")
})

app.listen(3000, () =>{
    console.log("Server iniciado em: http://localhost:3000")
})    