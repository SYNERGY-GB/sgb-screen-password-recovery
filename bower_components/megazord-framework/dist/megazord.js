(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

angular.module('megazord')
    .directive('mzClass', [function(){
       return {
           restrict: 'A',
           link: function(scope, el, attrs) {
               var className = attrs.mzClass;
               el.addClass(className);
               el.addClass(scope.screenName + '-' + className);
           }
       }
    }]);
},{}],2:[function(require,module,exports){
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
},{"./classDirective":1,"./router":3,"./screen":4}],3:[function(require,module,exports){
'use strict';

angular.module('megazord')

    /**
     * @ngdoc service
     * @name megazord._routerProvider
     * @description
     *
     * Allows the configuration of the {@link megazord.router router} service.
     */
    .provider('_router', function(){
        var routes = null;
        var parents = {};

        /**
         * @ngdoc method
         * @name routes
         * @methodOf megazord._routerProvider
         * @description
         * Sets the routes to be used by the router. These routes determine what events will switch to what screens.
         *
         * @param {routes} value The routes that will be set to the router.
         */
        this.routes = function(value) {
            routes = value;
        };

        this.parents = function(value) {
            parents = value;
        };

        this.$get = ['$state', '$injector', '$ionicHistory', '$rootScope', 'lodash', function($state, $injector, $ionicHistory, $rootScope, _){
            /**
             * @ngdoc service
             * @name megazord._router
             * @requires $state
             * @requires $injector
             * @requires lodash
             * @description
             *
             * Allows for triggering of event that cause a screen transition.
             */
           return {
               /**
                * @ngdoc method
                * @name fireEvent
                * @methodOf megazord._router
                * @description
                * Triggers an event that will be handled by the router.
                * The event will trigger a transition to another screen, according to the metadata
                * defined in the applicaction's routing table.
                *
                * @param {event} event The {@link megazord._router:event event} to fire.
                */
               fireEvent: function(event) {
                   var currentState = $state.current;
                   var currentStateName = currentState.name;

                   if(currentStateName.indexOf('.') != -1) {
                       currentStateName = currentStateName.substring(currentStateName.indexOf('.') + 1);
                   }
                   var state = routes[currentStateName][event.name];

                   this.goToState(state, event);
               },
               /**
                * @ngdoc method
                * @name goToState
                * @methodOf megazord._router
                * @description
                * Initiates a transition to a given state, ignoring the routing table.
                *
                * @param {string} state The name of the state to transition to.
                * @param {event} event The event to provide to the next screen, if any. Can be null.
                */
               goToState: function(state, event) {
                   var parent = parents[state];
                   var destination = (parent ? parent + '.' : '') + state;
                   console.log('target is ' + state);
                   console.log('Parent is ' + parent);
                   console.log('Destintation is ' + destination);
                   var dataSourceSettings = $state.get(destination).dataSource;
                   var disableBack = $state.get(destination).disableBack;
                   var dataSource = $injector.get(dataSourceSettings.type);
                   var transformFunction = dataSourceSettings.transform;
                   var screenParams = $state.get(destination).metaParams;
                   var dataSourceParams = _.merge({}, dataSourceSettings.params, event?event.params:{});

                   $rootScope.$broadcast('_dataLoadStarted', { screen: state });
                   dataSource.getData(dataSourceParams)
                       .then(function(data){
                           if(transformFunction) {
                               console.log('Going to call transform function');
                               data = $injector.invoke(transformFunction, null, { data: data });
                           }
                           if(disableBack) {
                               $ionicHistory.nextViewOptions({
                                   disableBack: true
                               });
                           }
                           $rootScope.$broadcast('_dataLoadFinished', { screen: state });
                           $state.go(destination, { event: event?event:null, data: data, params: screenParams } );
                       })
                       .catch(function(err){
                           $rootScope.$broadcast('_dataLoadFinished', { screen: state, error: err });
                       });
               }
           }
        }];
    });
},{}],4:[function(require,module,exports){
'use strict';

angular.module('megazord')

/**
 * @ngdoc service
 * @name megazord._screenProvider
 * @description
 *
 *
 */
.provider('_screen', function() {
    this.$get = [function() {
        return {
            initialize: function($scope, _screenParams) {
                $scope.screenName = _screenParams.screenName;
                $scope.title = _screenParams.title || _screenParams.screenName;
            }
        };
    }];
});
},{}]},{},[2]);
