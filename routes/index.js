var express = require('express');
var router = express.Router();

//Require controller modules
var category_controller = require('../controllers/categoryController');
var component_controller = require('../controllers/componentController');

// redirect to homepage
router.get('/', function (req, res) {
  res.redirect('category_list');
});

// Category routes //
router.get('/category_list', category_controller.category_list);

// Component routes //


module.exports = router;