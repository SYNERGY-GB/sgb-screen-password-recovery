(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
angular.module('sgb-screen-password-recovery', ['megazord'])
    .controller('sgb-screen-password-recovery-controller', ['_router', '_screenParams', '_screen', '$injector', '$stateParams', '$scope', '$translate', '$q','$ionicPopup', 
                function(_router, _screenParams, _screen, $injector, $stateParams, $scope, $translate, $q, $ionicPopup){

        //Screen template parameters
        _screen.initialize($scope, _screenParams);

        $scope.recover = {}; 
        
        var defaultRecoverHandler = function(username) {
            console.log("default handler");
            //TODO: Default to rest api call instead of this dummy implementation
            var result = $q.defer();
            console.log(username);
            result.resolve(username == '0000');
            return result.promise;
        };

        var recoverHandler = (_screenParams.recoverHandler?_screenParams.recoverHandler : defaultRecoverHandler);

        $scope.checkField = function (regexp, field) {
            if(regexp) {
                var exp = new RegExp(regexp);
                return (exp.test(field));
            }
            return true; 
        };

        //Fire event to go to next screen
        $scope.goTo = function() {
            _router.fireEvent({name: 'goTo', 
                               params: {}
            });
        };

        //Dummy implementation
        $scope.validateUser = function() {

            if (!($scope.checkField($scope.usernameRegexp, $scope.recover.username))) {
                console.log("Invalid user");
                return; 
            }

            $injector.invoke(recoverHandler, null, { username: $scope.recover.username })
                .then(function(result){
                    /* If user valid do something */
                    if(result) {
                        console.log("Success");
                        $scope.goTo(); 
                    }
                });
        };

        //Extra params to include in templateDirective
        $scope.extraParams = {
            goTo : $scope.goTo
        };

    }]);

},{}]},{},[1]);
