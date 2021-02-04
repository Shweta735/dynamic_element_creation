const express = require('express');
const router = express.Router();
const { attribute } = require('../controller/attribute');

router.post('/property', attribute.createAttribute);

router.put('/property/:id', attribute.editAttribute);

router.get('/property/:id', attribute.getAttribute);

module.exports = router;
