'use strict';

angular.module('megazord')
    .directive('mzClass', [function(){
       return {
           restrict: 'A',
           link: function(scope, el, attrs) {
               var className = attrs.mzClass;
               el.addClass(className);
               el.addClass(scope.screenName + '-' + className);
           }
       }
    }]);