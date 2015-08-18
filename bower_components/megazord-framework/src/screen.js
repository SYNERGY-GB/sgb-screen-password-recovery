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
    this.$get = ['lodash', function(_) {
        return {
            initialize: function($scope, _screenParams) {
                $scope._screenParams = _screenParams;
                _.defaults(_screenParams, { title: _screenParams.screenName });
            }
        };
    }];
});