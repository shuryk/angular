(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItems)
        .constant('ApiMenuItems', "https://davids-restaurant.herokuapp.com/menu_items.json");



    function FoundItems() {
        var ddo = {
            restrict: "A",
            templateUrl: 'foundList.html',
            scope: {
                foundItems: '<',
                onRemove: '&'
            },
            controller: NarrowItDownController,
            controllerAs: 'menu',
            bindToController: true
        };

        return ddo;
    }


    MenuSearchService.$inject = ['$http', 'ApiMenuItems']
    function MenuSearchService($http, ApiMenuItems) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {

            console.log("searchTerm", searchTerm);

            return $http({
                method: "GET",
                url: "https://davids-restaurant.herokuapp.com/menu_items.json"
            }).then(function (response) {
                console.log(response.data);
                // process result and only keep items that match
                var foundItems = [];

                for (var i = 0; i < response.data.menu_items.length; i++) {

                    console.log("item", response.data.menu_items[i]);
                    console.log("description", response.data.menu_items[i].description);

                    var description = response.data.menu_items[i].description;
                    if ((searchTerm != undefined && searchTerm != "") && description.indexOf(searchTerm) !== -1 ) {
                        foundItems.push(response.data.menu_items[i]);
                    }
                }

                // return processed items
                return foundItems;
            });

        }

    }

    NarrowItDownController.$inject = ['MenuSearchService']
    function NarrowItDownController(MenuSearchService) {
        var menu = this;

        menu.getMenut = function (searchTerm) {
            MenuSearchService.getMatchedMenuItems(searchTerm).then(function (response) {
                console.log(response);
                menu.found = response;


                console.log("FOUND", menu.found);
            })
        }

        menu.removeItem = function(index) {
            menu.found.splice(index, 1);
        }


    }

})();