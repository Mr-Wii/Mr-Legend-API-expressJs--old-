var express = require('express')
var router = express.Router()
var wiiro = require('./kayn')

let pId
let pId1
let playerData
let rankData
let champData
let matchData //getting matchId
let matchIds //Filtering it
let gameData //games by ID
router.get('/', async (req, res, next) => {
  try {
    if (req.query.name !== undefined && req.query.name !== '') {
      name = req.query.name
    }

    await axios
      .get(
        `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURI(
          name
        )}${key}`
      )
      .then(response => {
        pId = response.data.id
        pId1 = response.data.accountId
        playerData = response.data
      })
  } catch (error) {
    console.log(error)
  }
  try {
    await axios
      .get(
        `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${pId}${key}`
      )
      .then(response => {
        rankData = response.data
      })
  } catch (error) {
    console.log(error)
  }
  try {
    await axios
      .get(
        `https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${pId}${key}`
      )
      .then(response => {
        champData = response.data
      })
  } catch (error) {
    console.log(error)
  }
  try {
    await axios
      .get(
        `https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/${pId1}${key}`
      )
      .then(response => {
        matchData = response.data.matches
        const slicedMatches = matchData.map(x => x)
        const fror = slicedMatches.slice(0, 5)
        const cyka = fror.map(x => x.gameId)
        matchIds = cyka
      })
  } catch (error) {
    console.log(error)
  }
  try {
    await axios
      .get(
        `https://euw1.api.riotgames.com/lol/match/v4/matches/${matchIds[0]}${key}`
      )
      .then(responseu => {
        gameData = responseu.data
      })
  } catch (error) {
    console.log(error)
  }
  const whholeData = [playerData, rankData, champData, gameData]
  res.send(whholeData)
})

module.exports = router
