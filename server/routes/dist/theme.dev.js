"use strict";

var express = require('express');

var _require = require('express/lib/response'),
    append = _require.append;

var router = express.Router();

var userController = require('../controllers/userController');

router.get('/theme', themeController.view);
router.post('/theme', themeController.find);
router.get('/addtheme', themeController.form);
router.post('/addtheme', themeController.create);
router.get('/edittheme/:id', themeController.edit);
router.get('theme/:id', themeController["delete"]);
router.post('/edittheme/:id', themeController.update);
router.get('/viewtheme/:id', themeController.viewall);
module.exports = router;