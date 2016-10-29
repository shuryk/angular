(function () {
'use strict';

    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);    

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {

        $scope.lunchDishes = "";
        $scope.commentMsg = "Initial Comment!";

        $scope.checkIfTooMuch = function() {
            var elements = removeEmptyElements( $scope.lunchDishes.split(','));

            console.log(elements);
            console.log(elements.length);


            if (elements.length == 0 ) {
                $scope.commentMsg = "Please enter data first";
            }
            else if (elements.length <= 3) {
                $scope.commentMsg = "Enjoy";
            }
            else if (elements.length > 3) {

                $scope.commentMsg = "Too much!"; 
            }
        }

        function removeEmptyElements(elements) {
            var sanitizedElements = []
            for(var i = 0; i < elements.length; i++) {
                if(elements[i] != "") {
                    sanitizedElements.push(elements[i]);
                }                
            }
            return sanitizedElements;
        }
    }

})();