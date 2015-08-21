'use strict';
angular.module('sgb-screen-password-recovery', ['megazord'])
    .controller('sgb-screen-password-recovery-controller', ['_router', '_screenParams', '_screen', '$injector', '$stateParams', '$scope', '$translate', '$q','$ionicPopup', 
                function(_router, _screenParams, _screen, $injector, $stateParams, $scope, $translate, $q, $ionicPopup){

        //Screen template parameters
        _screen.initialize($scope, _screenParams);
        $scope.data = $stateParams.data; 

        $scope.recover = {}; 
        
        var defaultRecoverHandler = function(username) {
            //TODO: Default to rest api call instead of this dummy implementation
            var result = $q.defer();
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
                    console.log('test')
                    /* If user valid do something */
                    if(result) {
                        console.log("Success");
                        $scope.goTo(); 
                    }
                });
        };

    }]);



