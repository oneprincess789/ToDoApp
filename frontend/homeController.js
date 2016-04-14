angular.module('toDoApp')

.controller('homeController', ['$scope', '$http', function ($scope, $http) {
    $scope.todoList;
    $scope.newElement = "";
    $scope.newList = "";
    $scope.strike = false;

    $http.get('/api/list').then(function (result) {
        $scope.todoList = result.data;
        console.log('i have received the results')
        console.log(result.data)
    });

    //    $scope.deleteListButton = function (index) {
    //        console.log("List Deleted")
    //        $scope.todoList.splice(index, 1);
    //        $http.delete('http://localhost:2023/api/list/:toDo_id').then(function (result) {
    //            $scope.todoList = result.data;
    //            console.log('i have received the results')
    //        });
    //    }

    $scope.deleteItemButton = function (id, index) {
        //Make this works with node api
        console.log("Item Deleted")
        $http.delete('/api/list/' + id).then(function (result) {
            $scope.todoList.splice(index, 1);
            console.log('i have deleted the item')
        });
    }

    $scope.addItemButton = function () {
        //Make this work on node api
        if ($scope.newElement == "") {
            alert("Please add an item!")
        } else {
            var data = {
                toDo: $scope.newElement
            }
            $http.post('/api/list', data).then(function (result) {
                $scope.todoList.push(data);
                $scope.newElement = "";
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
            $http.post('/api/list', data).then(function (result) {
                console.log(result);
                console.log('i have added the the new list')
            });
        }
    }



    }]);
