const express = require("express");
const thingsToPackController = require('./../controllers/thingsToPackController');

const router = express.Router();

router.route('/')
    .get(thingsToPackController.getAllThingsToPack)
    .post(thingsToPackController.checkBody, thingsToPackController.createThingToPack);

router.route('/:id')
    .get(thingsToPackController.getThingToPack)
    .delete(thingsToPackController.deleteThingToPack)
    .put(thingsToPackController.updateThingToPack);

module.exports = router;