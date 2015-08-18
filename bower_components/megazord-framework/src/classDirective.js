'use strict';

angular.module('megazord')
    .directive('mzClass', ['lodash', function(_){
       return {
           restrict: 'A',
           link: function(scope, el, attrs) {
               var classNames = attrs.mzClass.split(' ');
               el.addClass(className);
               _.forEach(classNames, function(className){
                   el.addClass(scope._screenParams.screenName.replace('.', '_') + '-' + className);
               });
           }
       }
    }]);
