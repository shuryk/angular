(function () {
'use strict'; 

angular.module('ShoppingListCheckOff', [])
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)

ToBuyController.$inject = ['ShoppingListCheckOffService']
function ToBuyController(ShoppingListCheckOffService){
    var toBuy = this;

    toBuy.items = ShoppingListCheckOffService.getItemsFomrShopingListToBuy();
    console.log("toBuy.items", toBuy.items);

    toBuy.markAsBought = function (index) {
        ShoppingListCheckOffService.removeItemFromShopingListToBuy(index);
        toBuy.isEmpty = ShoppingListCheckOffService.isToBuyListEmpty();
    }

    toBuy.isEmpty = ShoppingListCheckOffService.isToBuyListEmpty();
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService']
function AlreadyBoughtController(ShoppingListCheckOffService){
    var alreadyBought = this;
    alreadyBought.items = ShoppingListCheckOffService.getItemsFromShopingListAlreadyBought();

    alreadyBought.markAsToBuy = function (index) {
        ShoppingListCheckOffService.removeItemFromShopingListAlreadyBought(index);
        alreadyBought.isEmpty =  ShoppingListCheckOffService.isAlreadyBoughtEmpty();
    }

    alreadyBought.isEmpty =  ShoppingListCheckOffService.isAlreadyBoughtEmpty();
}


function ShoppingListCheckOffService () {

    var service = this;

    var shopingListToBuy = [
        { name: "cookies", quantity: 10 },
        { name: "nuts", quantity: '1 kg' },
        { name: "milk", quantity: '1 litre' },
        { name: "kiwi", quantity: 6 },
        { name: "banana", quantity: 7 },
        { name: "chips", quantity: '4 bags' },
        { name: "tomatos", quantity: 4 }];
        
    var shopingListAlreadyBought = [];


    service.isToBuyListEmpty = function () {
        if (shopingListToBuy.length == 0) {
            return true;
        }
        return false;
    }

    service.isAlreadyBoughtEmpty = function () { 
             
        if (shopingListAlreadyBought.lenght > 0) {
            return false;
        }
        else {
            return true;
        }        
    }

    service.addItemToShopingListToBuy = function (itemName, quantity) {
        var item = {
      name: itemName,
      quantity: quantity
    };
     shopingListToBuy.push(item);
    }

    service.removeItemFromShopingListToBuy = function (itemIndex) {

        console.log("remove item index", itemIndex);
        var item = shopingListToBuy.splice(itemIndex, 1)[0];
        console.log("remove item ", item);
        service.addItemToShopingListAlreadyBought(item); 
    }

    service.getItemsFomrShopingListToBuy = function () {
        console.log("shopingListToBuy", shopingListToBuy);

        return shopingListToBuy;
    }

    service.addItemToShopingListAlreadyBought = function (item) {
         shopingListAlreadyBought.push(item);
    }

    service.removeItemFromShopingListAlreadyBought = function (itemIndex) {
        var item = shopingListAlreadyBought.splice(itemIndex, 1);
         service.addItemToShopingListToBuy(item); 
        
    }

    service.getItemsFromShopingListAlreadyBought = function () {

        return shopingListAlreadyBought;
    }
}

})();