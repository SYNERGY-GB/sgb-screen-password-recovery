(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
angular.module('sgb-screen-password-recovery', ['megazord'])
    .controller('sgb-screen-password-recovery-controller', ['_router', '_screenParams', '_screen', '_data', '$scope','$http',
                function(_router, _screenParams, _screen, _data, $scope, $http){

        //Screen template parameters
        _screen.initialize($scope, _screenParams);
        $scope.data = _data; 

        $scope.$on('$ionicView.beforeEnter', function(){
            $scope.recover = {
                username: ''
            }; 
        })
        
        //Fire event to go to next screen
        $scope.goTo = function(event) {
            _router.fireEvent({
                name: event, 
                params: {}
            });
        };

        $scope.validateUser = function() {
            _router.fireEvent({
                name: 'validateRecover', 
                params: {
                    username: $scope.recover.username
                }
            });     
        };

    }]);

},{}]},{},[1]);
