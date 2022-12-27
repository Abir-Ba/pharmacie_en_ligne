const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router();
const userController = require('../controllers/medicamentController');
router.get('/',userController.view);
router.post('/',userController.find);
router.get('/addmedicament',userController.form);
router.post('/addmedicament',userController.create);
router.get('/editmedicament/:id',userController.edit);
router.get('/:id',userController.delete);
router.post('/editmedicament/:id',userController.update);
router.get('/viewmedicament/:id',userController.viewall);
module.exports = router;