(
    function(){
        'use strict'

        angular.module("ShoppingListCheckOff",[])
        .controller("ToBuyController",ToBuyController)
        .controller("AlreadyBoughtController",AlreadyBoughtController)
        .service("ShoppingListCheckOffService", ShoppingService);

        ToBuyController.$inject = ['ShoppingListCheckOffService'];
        function ToBuyController(ShoppingListCheckOffService){

            this.list = [];
            
            this.emptyMessage = "Everything is bought!";

            
            this.list = ShoppingListCheckOffService.getToBuyList();
            

            this.buy = function(index){
                ShoppingListCheckOffService.moveItem(index);
            
                this.list = ShoppingListCheckOffService.getToBuyList();
                
            } 


        }

        AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
        function AlreadyBoughtController(ShoppingListCheckOffService){

            this.list = [];
    
            this.emptyMessage = "Nothing bought yet.";

            this.list = ShoppingListCheckOffService.getBoughtList();
            
        }
        
        function ShoppingService(){

            var ToBuyList = [{name: "cookies", quantity: 10},
                             {name: "chips", quantity: 6},
                             {name: "chocolate", quantity: 5},
                             {name: "water", quantity: 2},
                             {name: "biscuit", quantity: 10}];
            var BoughtList = [];

            this.moveItem = function(index){
                BoughtList.push(ToBuyList[index]);
                ToBuyList.splice(index,1);
            }

            this.getToBuyList = function(){
                return ToBuyList;
            }
            
            this.getBoughtList = function(){
                return BoughtList;
            }
        }


    }
)();