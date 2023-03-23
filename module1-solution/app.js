(
    function(){
        'use strict'

        angular.module("LunchCheck", [ ])

        .controller("LunchCheckController", LunchCheckController);

        LunchCheckController.$inject = ['$scope'];
       function LunchCheckController ($scope){
        $scope.items = "";
        $scope.message = "";
        
        function numberOfitems(list) {
            const listOfitems= list.split(',');
            return listOfitems.length;
        }
          $scope.display = function(){
        if (!$scope.items) $scope.message = "Please enter data first";
        else if (numberOfitems($scope.items) <= 3) $scope.message = "Enjoy!";
        else if(numberOfitems($scope.items) > 3) $scope.message = "Too much!";
            
         }
        }
    }
)();

