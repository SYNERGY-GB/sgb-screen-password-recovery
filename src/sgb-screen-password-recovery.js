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