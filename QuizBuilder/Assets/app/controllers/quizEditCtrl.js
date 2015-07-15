angular.module('quizEdit', [])
    .controller('quizEditCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
        $scope.id = $routeParams.id;
        if ($scope.id) {
            $http.get('/api/WS_Quiz/GetUserQuizItem/' + $scope.id)
                .success(function (data, status, headers, config) {
                    $scope.quiz = JSON.parse(data.serializedQuiz);
                });
        }
        else
        {
            //default quiz
            $scope.quiz = {
                CorrectText: '',
                incorrectText: '',
                Questions: [
                    {
                        Id: 0,
                        Title: "",
                        Type: "multiple",//or truefalse
                        QuestionText: "",
                        Answers: [
                            {
                                Id: 0,
                                Text: "",
                                ImageUrl: ""
                            }
                        ],
                        Hint: "",
                        ImageUrl: ""
                    }


                ]


            };
        }

        $scope.postItem = function()
        {
        }


        $scope.delete = function(index)
        {
            $http.post('/api/WS_Quiz/DeleteQuizItem/' + $scope.todoList[index].id)
                .success(function (data, status, headers, config) {
                    
                });
        }
        
    }]);