'use strict';
angular.module('sgb-screen-password-recovery', ['megazord'])
    .controller('sgb-screen-password-recovery-controller', ['_router', '_screenParams', '_screen', '$injector', '$stateParams', '$scope', '$q',
                function(_router, _screenParams, _screen, $injector, $stateParams, $scope, $q){

        //Screen template parameters
        _screen.initialize($scope, _screenParams);
        $scope.data = $stateParams.data; 

        $scope.recover = {
            username: ''
        }; 
        
        var defaultRecoverHandler = function(username) {
            //TODO: Default to rest api call instead of this dummy implementation
            var result = $q.defer();
            result.resolve(username == '1111');
            return result.promise;
        };

        var recoverHandler = (_screenParams.recoverHandler?_screenParams.recoverHandler : defaultRecoverHandler);

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

            if (!($scope.checkField($scope._screenParams.usernameRegexp, $scope.recover.username))) {
                return; 
            }

            $injector.invoke(recoverHandler, null, { username: $scope.recover.username })
                .then(function(result){
                    /* If user valid do something */
                    if(result) {
                        $scope.goTo('goTo'); 
                    } else {
                    /* If user invalid do something */
                        $scope.goTo('goToFail'); 

                    }
                }
            );
        };

    }]);



