var express = require('express');
var api = express.Router();
var { storeAPI } = require('../controllers/store.controller');

// -- Get --
// get store by id
api.get('/:id', storeAPI.findById);
// list all stores
api.get('/', storeAPI.listAllStores);

// -- Post --
// create store
api.post('/create', storeAPI.createStore);

// -- Put --
// update store by id
api.put('/:id', storeAPI.updateStore);

// -- Delete --
// delete store by id
api.delete('/:id', storeAPI.deleteStore);

module.exports = api;
