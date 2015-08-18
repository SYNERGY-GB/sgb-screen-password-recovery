'use strict';
angular.module('sgb-screen-password-recovery', ['megazord'])
    .controller('sgb-screen-password-recovery-controller', ['_router', '_screenParams', '_screen', '$injector', '$stateParams', '$scope', '$translate', '$q','$ionicPopup', 
                function(_router, _screenParams, _screen, $injector, $stateParams, $scope, $translate, $q, $ionicPopup){

        //Screen template parameters
        _screen.initialize($scope, _screenParams);

        $scope.goTo = function() {
            _router.fireEvent({name: 'goTo', 
                               params: {}
            });
        }

        $scope.extraParams = {
            goTo : $scope.goTo,
            finishRecovery : $scope.finishRecovery
        };

    }]);



