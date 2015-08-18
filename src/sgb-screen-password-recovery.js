'use strict';
angular.module('sgb-screen-password-recovery', ['megazord'])
    .controller('sgb-screen-password-recovery-controller', ['_router', '_screenParams', '_screen', '$injector', '$stateParams', '$scope', '$translate', '$q','$ionicPopup', 
                function(_router, _screenParams, _screen, $injector, $stateParams, $scope, $translate, $q, $ionicPopup){

        //Screen template parameters
        _screen.initialize($scope, _screenParams);

        $scope.goToQuestion = function() {
            _router.fireEvent({name: 'goToQuestion', 
                               params: {}
            });
        }

        $scope.finishRecovery = function() {
            _router.fireEvent({name: 'finishRecovery', 
                               params: {}
            });
        }

        $scope.extraParams = {
            goToQuestion : $scope.goToQuestion,
            finishRecovery : $scope.finishRecovery
        };

    }]);



