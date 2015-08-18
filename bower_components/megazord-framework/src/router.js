'use strict';

angular.module('megazord')

/**
 * @ngdoc service
 * @name megazord._routerProvider
 * @description
 *
 * Allows the configuration of the {@link megazord.router router} service.
 */
    .provider('_router', function () {
        var routes = null;

        /**
         * @ngdoc method
         * @name routes
         * @methodOf megazord._routerProvider
         * @description
         * Sets the routes to be used by the router. These routes determine what events will switch to what screens.
         *
         * @param {routes} value The routes that will be set to the router.
         */
        this.routes = function (value) {
            routes = value;
        };

        this.$get = ['$state', '$injector', '$ionicHistory', '$rootScope', '$q', 'lodash', function ($state, $injector, $ionicHistory, $rootScope, $q, _) {
            /**
             * @ngdoc service
             * @name megazord._router
             * @requires $state
             * @requires $injector
             * @requires $ionicHistory
             * @requires $rootScope
             * @requires $q
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
                fireEvent: function (event) {
                    var currentState = $state.current;
                    var currentStateName = currentState.name;

                    var currentStateRoutes = routes[currentStateName];
                    if (!currentStateRoutes) {
                        console.error('No routes found for screen "' + currentStateName + '".');
                        return;
                    }
                    var state = currentStateRoutes[event.name];

                    if (!state) {
                        console.error('No route found for event "' + event.name + '" in screen "' + currentStateName + '"');
                        return;
                    }

                    this.goToState(state, event);
                },
                /**
                 * @ngdoc method
                 * @name goToState
                 * @methodOf megazord._router
                 * @description
                 * Initiates a transition to a given state, ignoring the routing table.
                 *
                 * @param {string} stateName The name of the state to transition to.
                 * @param {event} event The event to provide to the next screen, if any. Can be null.
                 */
                goToState: function (stateName, event) {
                    var state = $state.get(stateName);
                    if (!state) {
                        console.error('Screen not found: "' + stateName + '"');
                        return;
                    }
                    var disableBack = state.disableBack;
                    var screenParams = state.metaParams;

                    var dataSourceSettings = state.dataSource;
                    var dataPromise;
                    if (dataSourceSettings) {
                        var dataSource = $injector.get(dataSourceSettings.type);
                        var transformFunction = dataSourceSettings.transform;
                        var dataSourceParams = _.merge({}, dataSourceSettings.params, event ? event.params : {});
                        $rootScope.$broadcast('_dataLoadStarted', {screen: stateName});
                        dataPromise = dataSource.getData(dataSourceParams)
                            .then(function (data) {
                                if (transformFunction) {
                                    data = $injector.invoke(transformFunction, null, {data: data});
                                }
                                return data;
                            })
                            .finally(function() {
                                $rootScope.$broadcast('_dataLoadFinished', {screen: state});
                            });
                        //TODO: Data load error handling.
                    }
                    else {
                        dataPromise = $q.when({}); //Empty data object if no dataSource is present
                    }

                    dataPromise.then(function (data) {
                        if (disableBack) {
                            $ionicHistory.nextViewOptions({ disableBack: true });
                        }
                        $state.go(stateName, {event: event ? event : null, data: data, params: screenParams});
                    });
                }
            }
        }];
    });