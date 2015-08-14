'use strict';

angular.module('megazord')

/**
 * @ngdoc service
 * @name megazord._screenProvider
 * @description
 *
 *
 */
.provider('_screen', function() {
    this.$get = [function() {
        return {
            initialize: function($scope, _screenParams) {
                $scope.screenName = _screenParams.screenName;
                $scope.title = _screenParams.title || _screenParams.screenName;
            }
        };
    }];
});