(    
function(){
'use strict'

    angular.module('NarrowItDownApp',[])
   .controller('NarrowItDownController',NarrowItDownController)
   .service('MenuSearchService', MenuSearchService)
   .directive('foundItems', foundItems)
   .constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com");

   function foundItems(){
    var ddo = {
        templateUrl: "foundItems.html",
        restrict: "E",
        scope: {
            foundItems: "<",
            onRemove: '&',
            term: "@"
        },
        transclude: true
        // controller: FoundItemsController,
        // controllerAs: 'list',
        // bindToController: true,
        // link: foundItemsLink
    }
    return ddo;
   }

//    function foundItemsLink(scope,element,attrs,controller){

//     scope.$watch('list.checkList()', function(newValue, oldValue){

//         if(newValue == true) displayMessage();
//         else removeMessage();
//     });

//     scope.$watch('list.term', function(newValue, oldValue){
//         console.log("oldValue: ",oldValue);
//         console.log("newValue: ",newValue);
     
//     });

//     function displayMessage(){
//         var elem = element.find('div');
//         elem.css('display','block');
//     }
    
//     function removeMessage(){
//         var elem = element.find('div');
//         elem.css('display','none');
//     }

//    }

//    function FoundItemsController(){
//     var list = this;
//     list.errorMessage="";

//     list.checkList = function(){
//         if(list.term == "" )//|| list.foundItems == undefined || list.foundItems.length == 0)
//         {
//             list.errorMessage = "Nothing Found";
//             list.foundItems = [];
//             return true;
//         }
//         else return false;
//     }

//    }

   NarrowItDownController.$inject=['MenuSearchService'];
   function NarrowItDownController(MenuSearchService){
     var narrow = this;

     narrow.searchTerm = "";
     narrow.errorMessage = "";

     narrow.search= function(){
         var promise = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);
             promise.then(function(result){
             narrow.foundItemsList = result;

            if(narrow.searchTerm == "" || narrow.foundItemsList.length == 0)
                {
                    narrow.errorMessage = "Nothing Found";
                    narrow.foundItemsList = [];
                }
            else narrow.errorMessage = ""
        })
        
            }

     narrow.remove = function(index){
    narrow.foundItemsList.splice(index,1);
     }

   }

   MenuSearchService.$inject =['$http','ApiBasePath']
   function MenuSearchService($http,ApiBasePath){

    this.getMatchedMenuItems = function(searchTerm){
        var searchterm = searchTerm.toLowerCase();
        
        return $http(
            {
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }
            ).then(function(response){

                var foundItems = [];
                    var allItems = response.data;

                    for (var item in allItems) {
                        var category = allItems[item];
                            for (var j = 0; j < category.menu_items.length; j++){
                           var description = category.menu_items[j].description;
                                if (description.toLowerCase().indexOf(searchterm) !== -1) {
                                     foundItems.push(category.menu_items[j]);
                                    }
                                }
                                    }

               return foundItems;
        });

    }
   }        
})();