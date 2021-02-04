const express = require('express');
const router = express.Router();
const { element } = require('../controller/element');

router.post('/property', element.createElement);

router.put('/property/:id', element.editElement);

router.get('/property/:id', element.getElement);

module.exports = router;
