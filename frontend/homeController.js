angular.module('toDoApp')

.controller('homeController', ['$scope', '$http', function ($scope, $http) {
    $scope.todoList;
    $scope.newElement = "";
    $scope.newList = "";

    $http.get('http://localhost:2023/api/list').then(function (result) {
        $scope.todoList = result.data;
        console.log('i have received the results')
    });

    $scope.deleteListButton = function (index) {
        console.log("List Deleted")
        $scope.todoList.splice(index, 1);
    }

    $scope.deleteItemButton = function (index) {
        //Make this works with node api
        console.log("Item Deleted")
        $scope.todoList.elements.splice(index, 1);
    }

    $scope.addItemButton = function () {
        //Make this work on node api
        if ($scope.newElement == "") {
            alert("Please add an item!")
        } else {
            var data = {
                toDo: $scope.newElement
            }
            $http.post('http://localhost:2023/api/list', data).then(function (result) {
                console.log(result);
                console.log('i have added the element to the list')
            });
        }
    }

    $scope.addListButton = function () {
        //Make this work on node api
        if ($scope.newList == "") {
            alert("Please add an item!")
        } else {
            var data = {
                name: $scope.newList
            }
            $http.post('http://localhost:2023/api/list', data).then(function (result) {
                console.log(result);
                console.log('i have added the the new list')
            });
        }
    }


    }]);
