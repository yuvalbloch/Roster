const express = require( 'express' )
const requesty = require('request')
const app = express()
const path = require('path')
const port = 3000
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'route')))
app.use(express.static(path.join(__dirname, 'node_modules')))
const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

app.get("/teams/:teamName" , function (req, res) {
    const group = req.params.teamName
    console.log(teamToIDs[group])
        requesty("http://data.nba.net/10s/prod/v1/2018/players.json", function(err, respons){
        let name =JSON.parse(respons.body).league.standard
        name = name.filter(n => n.teamId === teamToIDs[group])
            .filter(n => n.isActive)
            .map(n => {return {firstName : n.firstName , lastName : n.lastName ,jersey : n.jersey , pos : n.pos}})
        console.log(name)
        res.send(name)
    })
})
app.post("/picture" , function (req, res) {
    console.log(req ,"asdasd")
    const firstName = req.body.firstName
    console.log(firstName)
    const lastName = req.body.lastName
    requesty("https://nba-players.herokuapp.com/players/" +lastName + "/" +firstName , function(err, respons){
        res.send(respons)
    })
})
app.listen(port , function () {
    console.log("yay our server run on port" + port)
})
