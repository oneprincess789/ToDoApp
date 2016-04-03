 angular.module('toDoApp', [])

 .controller('homeController', ['$scope', '$firebaseArray', '$http', function ($scope, $firebaseArray, $http) {
     $scope.list;
     $scope.elements;
     $scope.newElement = "";
     //Push article to firebase
     var firebase = new Firebase("https://todolist1989.firebaseio.com/");
     var firebaseObject = $firebaseArray(firebase);
     $http.get('http://localhost:8080/api/list').then(function (result) {
         console.log(result);
         console.log('i have received the results')
     });

     console.log('continue with the code')

     $scope.newListButton = function () {
         var list = {
             name: $scope.list,
             elements: $scope.elements = []
         }

         // download the data from a Firebase reference into a (pseudo read-only) array

         firebase.push(list, function (error) {
             if (error) {
                 alert("something happened");
             } else {
                 alert("Data stored");
             }
         });
     }


     $scope.deleteListButton = function (id) {
         console.log(id)
         firebaseObject.$remove(id)
         var removeListRef = new Firebase("https://todolist1989.firebaseio.com/" + id);
         removeListRef.remove();
     }

     $scope.deleteItemButton = function (index) {
         console.log("Item Deleted")
         $scope.list.elements.splice(index, 1);
     }



     $scope.addItemButton = function () {
         if ($scope.newElement == "") {
             alert("Please add an item!")
         } else {
             var listRef = new Firebase('https://todolist1989.firebaseio.com/-K7iEp2PVwEn8N1Um-X_');
             listRef.push({
                 'elements': ['apples', 'bananas', 'cookies']
             });
             // Same effect as the previous example, but we've combined the push() and the set().
         }
     }


}]);
