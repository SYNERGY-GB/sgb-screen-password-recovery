'use strict';
angular.module('sgb-screen-password-recovery', ['megazord'])
    .controller('sgb-screen-password-recovery-controller', ['_router', '_screenParams', '_screen', '_data', '$scope','$ionicHistory',
                function(_router, _screenParams, _screen, _data, $scope, $ionicHistory){

        _screen.initialize($scope, _screenParams);
        
        //Screen template parameters
        $scope.$on('$ionicView.beforeEnter', function(){
            $scope.data = _data; 
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

        $scope.goBack = function() {
            $ionicHistory.goBack(); 
        }

        $scope.validateUser = function() {
            var data = {
                username: $scope.recover.username
            }

            if ($scope.data.processId) data.processId = $scope.data.processId; 

            _router.fireEvent({
                name: 'validateRecover', 
                params: data
            });     
        };

    }]);