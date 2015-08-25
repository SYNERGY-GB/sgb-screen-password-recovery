(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
angular.module('sgb-screen-password-recovery', ['megazord'])
    .controller('sgb-screen-password-recovery-controller', ['_router', '_screenParams', '_screen', '$injector', '$stateParams', '$scope', '$q','$ionicPopup', 
                function(_router, _screenParams, _screen, $injector, $stateParams, $scope, $q, $ionicPopup){

        //Screen template parameters
        _screen.initialize($scope, _screenParams);
        $scope.data = $stateParams.data; 

        $scope.recover = {}; 
        
        var defaultRecoverHandler = function(username) {
            //TODO: Default to rest api call instead of this dummy implementation
            var result = $q.defer();
            result.resolve(username == '04121111111');
            return result.promise;
        };

        var recoverHandler = (_screenParams.recoverHandler?_screenParams.recoverHandler : defaultRecoverHandler);

        $scope.checkField = function (regexp, field) {
            console.log(regexp, field);
            if (!field || !regexp) return true; 
            if(regexp) {
                var exp = new RegExp(regexp);
                return (exp.test(field));
            }
        };

        //Fire event to go to next screen
        $scope.goTo = function() {
            _router.fireEvent({name: 'goTo', 
                               params: {}
            });
        };

        //Dummy implementation
        $scope.validateUser = function() {

            if (!($scope.checkField($scope._screenParams.usernameRegexp, $scope.recover.username))) {
                return; 
            }

            $injector.invoke(recoverHandler, null, { username: $scope.recover.username })
                .then(function(result){
                    /* If user valid do something */
                    if(result) {
                        $scope.goTo(); 
                    }
                });
        };

    }]);

},{}]},{},[1]);
