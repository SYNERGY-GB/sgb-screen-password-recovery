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