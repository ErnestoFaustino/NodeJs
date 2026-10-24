const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
const { engine } = require('express-handlebars')
const pool = require("./models/db")
const body = require("body-parser")
const bodyParser = require("body-parser")

//Configuração do Template Engine
app.engine('handlebars', engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//Config do body
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//ROTAS
app.get("/", async(req, res) => {

    try{
        const resultado = await pool.query("SELECT * FROM postagens")
        res.render("home", {resultado: resultado.rows})
    }catch(erro){
        console.error(erro)
    }  
})

app.get("/cad", (req, res) => {
    res.render("formulario")
})

app.post("/add", async (req, res) =>{

    const titulo = req.body.title
    const conteudo = req.body.cont

    try{
        const resultado = await pool.query(
            "INSERT INTO postagens(titulo, conteudo) values($1, $2) RETURNING *",[titulo, conteudo]) 
        res.redirect("/")

    }catch(erro){
        console.error(erro.message)
    }
})

app.get("/apagar/:id", async (req, res) =>{

    const id = req.params.id
    try{
        const resultado = await pool.query(
            "DELETE FROM postagens WHERE id = $1 RETURNING *", [id]) 
    
        res.redirect("/")
    }catch(erro){
        console.error(erro.message)
    }
})

app.listen(3000, () =>{
    console.log("Server iniciado em: http://localhost:3000")
})    