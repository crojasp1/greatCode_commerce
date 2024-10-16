const express = require('express');
const { getLocales } = require('../controllers/localController');
const router = express.Router();

router.get('/locales', getLocales);

module.exports = router;
