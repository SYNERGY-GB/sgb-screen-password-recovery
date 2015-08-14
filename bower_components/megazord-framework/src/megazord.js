'use strict';

/**
 * @ngdoc overview
 * @name megazord
 * @requires ngLodash
 *
 * @description
 * This is the module for the framework stuff.
 */

/**
 * @ngdoc interface
 * @name megazord._router:event
 * @description An event that is handled by a {@link megazord.router router}.
 *
 * @property {string} name - The name of the event.
 * @property {object} params - The parameters that will be passed to the target DataSource and Screen.
 */

/**
 * @ngdoc interface
 * @name megazord._router:routes
 * @description An object that determines the screen to transition to when an event from a given screen is triggered.
 *
 * The object describes a navigation graph that will be used to connect the screens that make up the application.
 *
 * @example
 {
     login: {
         loginFinished: 'summary'
     },
     summary: {
         itemClicked: 'itemDetail'
     },
     itemDetail: {
         share: 'shareItem'
     }
  }
 *
 */
angular.module('megazord', ['ngLodash', 'pascalprecht.translate']);

require('./router');
require('./classDirective');
require('./screen');