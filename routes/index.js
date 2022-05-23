var express = require('express');
const res = require('express/lib/response');
var router = express.Router();

//Require controller modules
var category_controller = require('../controllers/categoryController');
var component_controller = require('../controllers/componentController');

// redirect to homepage
router.get('/', function (req, res) {
  res.redirect('list');
});

// CATEGORY ROUTES //
router.get('/list', function (req, res, next) {
  res.render('list', {title: 'Test'})
});

// GET request for creating Category. NOTE This must come before route for id (i.e. display category).
router.get("/category/create", category_controller.category_create_get);

// POST request for creating Category.
router.post("/category/create", category_controller.category_create_post);

// GET request to delete Category.
router.get("/category/:id/delete", category_controller.category_delete_get);

// POST request to delete Category.
router.post("/category/:id/delete", category_controller.category_delete_post);

// GET request to update Category.
router.get("/category/:id/update", category_controller.category_update_get);

// POST request to update Category.
router.post("/category/:id/update", category_controller.category_update_post);

// GET request for one Category.
router.get("/category/:id", category_controller.category_detail);

// GET request for list of all Categories.
router.get("/categories", category_controller.category_list);

// COMPONENT ROUTES //
// GET request for creating component. NOTE This must come before route for id (i.e. display category).
router.get("/component/create", component_controller.component_create_get);

// POST request for creating Components.
router.post("/component/create", component_controller.component_create_post);

// GET request to delete Components.
router.get("/component/:id/delete", component_controller.component_delete_get);

// POST request to delete Components.
router.post("/component/:id/delete", component_controller.component_delete_post);

// GET request to update Components.
router.get("/component/:id/update", component_controller.component_update_get);

// POST request to update Components.
router.post("/component/:id/update", component_controller.component_update_post);

// GET request for one Components.
router.get("/component/:id", component_controller.component_detail);

// GET request for list of all Components.
router.get("/components", component_controller.component_list);


module.exports = router;