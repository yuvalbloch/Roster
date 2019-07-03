const express = require( 'express' )
const router = express.Router()
const app = express()
const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

router.get("/teams/:teamName" , function (req, res) {
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
router.post("/picture" , function (req, res) {
    console.log(req ,"asdasd")
    const firstName = req.body.firstName
    console.log(firstName)
    const lastName = req.body.lastName
    requesty("https://nba-players.herokuapp.com/players/" +lastName + "/" +firstName , function(err, respons){
        res.send(respons)
    })
})
router.listen(port , function () {
    console.log("yay our server run on port" + port)
})
