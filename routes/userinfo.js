const express = require('express')
var router = express.Router()
var wiiro = require('./kayn')

//Declarations

router.get('/', async (req, res, next) => {
  let name = 'Waerυ'
  let summoner
  let championMastery
  let rankData
  let matchIds
  let matcheHistory
  let simpleMh

  // Calls

  if (req.query.name !== undefined && req.query.name !== '') {
    name = req.query.name
  }
  try {
    await wiiro.Summoner.by.name(name).then(owo => (summoner = owo))
    wiiro.ChampionMastery.list(summoner.id).then(owo => (championMastery = owo))
    wiiro.League.Entries.by
      .summonerID(summoner.id)
      .then(owo => (rankData = owo))
    await wiiro.Matchlist.Recent.by
      .accountID(summoner.accountId)
      .then(response => {
        matchIds = response.matches.map(owo => owo.gameId)
      })
    await wiiro.Match.get(matchIds[0]).then(ewe => (matcheHistory = [ewe]))
    await wiiro.Match.get(matchIds[1]).then(ewe => matcheHistory.push(ewe))
  } catch (error) {
    console.log(error)
  }

  // data process

  simpleMh = matcheHistory.map(ex => ({
    queueId: ex.queueId,
    date: ex.gameCreation,
    duration: ex.gameDuration,
    mode: ex.gameMode,
    type: ex.gameType,
    participants: ex.participants,
    participantIds: ex.participantIdentities,
    teams: ex.teams.map(owo => ({
      teamId: owo.teamId,
      win: owo.win,
      towers: owo.towerKills,
      barons: owo.baronKills,
      dragonKills: owo.dragonKills
    }))
  }))

  res.send([summoner, championMastery, rankData, simpleMh])
})

module.exports = router
