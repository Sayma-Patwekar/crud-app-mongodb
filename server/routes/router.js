const express = require('express');
const route = express.Router(); // this method allows us to create different routers in separate file for app,here we cannot create app as it'll create a newapp

const services = require('../services/render');

/**
 * @description Root Route or Home Route
 * @method GET/ //route
 */
route.get('/',services.homeRoutes);

/**
 * @description add user
 * @method GET/add-user //route
 */
route.get('/add_user', services.add_user);

/**
 * @description update user
 * @method GET/update-user  //route
 */
route.get('/update-user', services.update_user)

module.exports = route;