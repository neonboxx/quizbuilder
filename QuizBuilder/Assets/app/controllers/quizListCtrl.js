angular.module('quizList', [])
    .controller('quizListCtrl', ['$scope', '$http', function ($scope, $http) {
        
        $scope.getList = function ()
        {
            $http.get('/api/WS_Quiz/GetUserQuizItems')
                .success(function (data, status, headers, config) {
                    $scope.todoList = data;
                });
        }

        $scope.postItem = function()
        {
            item =
                {
                    Title: $scope.newQuizTitle
                };

            if ($scope.newTaskText != '') {
                $http.post('/api/WS_Quiz/PostQuizItem', item)
                    .success(function (data, status, headers, config) {
                        $scope.newQuizTitle = '';
                        $scope.getList();
                    });
            }
        }


        $scope.delete = function(index)
        {
            $http.post('/api/WS_Quiz/DeleteQuizItem/' + $scope.todoList[index].id)
                .success(function (data, status, headers, config) {
                    $scope.getList();
                });
        }

        //Get the current user's list when the page loads.
        $scope.getList();
        
    }]);