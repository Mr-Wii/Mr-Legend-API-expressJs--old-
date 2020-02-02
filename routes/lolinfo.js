const express = require('express')
const wiiro = require('./kayn')
const router = express.Router()

router.get('/', async (req, res, next) => {
  //Declarations
  let gameStatus
  let rotationChamps

  // Calls:
  try {
    await wiiro.Status.get().then(rot => (gameStatus = rot.services))
    await wiiro.Champion.Rotation.list().then(
      rot => (rotationChamps = rot.freeChampionIds)
    )
  } catch (error) {
    console.log(error)
  }

  // Send to Front
  res.send([gameStatus, rotationChamps])
})

module.exports = router
