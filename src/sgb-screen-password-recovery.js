'use strict';
angular.module('sgb-screen-password-recovery', ['megazord'])
    .controller('sgb-screen-password-recovery-controller', ['_router', '_screenParams', '_screen', '_data', '$scope','$http',
                function(_router, _screenParams, _screen, _data, $scope, $http){

        //Screen template parameters
        _screen.initialize($scope, _screenParams);
        $scope.data = _data; 

        $scope.recover = {
            username: ''
        }; 
        
        $scope.getServiceUrl = function(url, processId) {
            if (processId) return url+"/"+processId; 
            return url; 
        }

        $scope.checkField = function (regexp, field) {
            if (!regexp) return true; 
            var exp = new RegExp(regexp);
            return (exp.test(field));
        };


        //Fire event to go to next screen
        $scope.goTo = function(event) {
            _router.fireEvent({name: event, 
                               params: {}
            });
        };

        $scope.validateUser = function() {

            if (!($scope.checkField($scope._screenParams.usernameRegexp, $scope.recover.username)) || $scope.freeze) {
                return; 
            }

            var data = {
                "username": $scope.recover.username
            }

            var getData = function() {
                $scope.freeze = true; 
                return $http({
                    method: "POST",
                    url: $scope.getServiceUrl(_screenParams.serviceUrl, $scope.data.processId),
                    data: data,
                    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
                })
                .then(function(result) {
                    return result.data; 
                })
            }

            var myDataPromise = getData();
            myDataPromise.then(function(result) {  // this is only run after $http completes
               if (result) {
                   $scope.questionData = result;
                   $scope.freeze = false; 
                   _screenParams.onSuccess(_router, $scope); 
               } else {
                   $scope.goTo('goToFail'); 
               }


            });
                    
        };

    }]);