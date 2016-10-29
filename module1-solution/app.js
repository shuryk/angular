(function () {
'use strict';

    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);    

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.lunchDishes = "";
        $scope.commentMsg = "Initial Comment! Find out how big is your lunch :)";
        $scope.customStyle = {};
        $scope.inputLunchStyle = {}

        $scope.checkIfTooMuch = function() {
            var elements = removeEmptyElements( $scope.lunchDishes.split(','));

            console.log(elements);
            console.log(elements.length);


            if (elements.length == 0 ) {
                $scope.commentMsg = "Please enter data first";
                $scope.customStyle.colorClass = "red";
                $scope.inputLunchStyle = "error-input-border"
            }
            else if (elements.length <= 3) {
                $scope.commentMsg = "Enjoy";
                $scope.customStyle.colorClass = "green";
                $scope.inputLunchStyle = "ok-input-border"
            }
            else if (elements.length > 3) {
                $scope.commentMsg = "Too much!";
                $scope.customStyle.colorClass = "green"; 
                $scope.inputLunchStyle = "ok-input-border"
            }
        }

        function removeEmptyElements(elements) {
            var sanitizedElements = []
            for(var i = 0; i < elements.length; i++) {
                if(elements[i].trim() != "") {
                    sanitizedElements.push(elements[i]);
                }                
            }
            return sanitizedElements;
        }
    }

})();