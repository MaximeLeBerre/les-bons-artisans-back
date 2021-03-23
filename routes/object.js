const express = require('express');
const Object = require('../models/Object');
const objectController = require('../controllers/object');

const router = express.Router();




router.get('/', objectController.getAllObject);

router.get('/:id', objectController.getOneObject);

router.post('/', objectController.createObject);

router.put('/:id', objectController.updateOneObject);

router.delete('/:id', objectController.deleteObject);



module.exports = router;