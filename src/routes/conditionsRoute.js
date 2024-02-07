const express = require('express')
const conditionsController = require('../controllers/conditionsController');

const router = express.Router();

router.route('/')
    .get(conditionsController.getAllConditions)
    .post(conditionsController.createCondition)

router.route('/:id')
   .get(conditionsController.getCondition)
   .delete(conditionsController.deleteCondition)
   .put(conditionsController.updateCondition)

module.exports = router;