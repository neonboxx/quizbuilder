﻿angular.module('quizEdit', [])
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
        $scope.editQuestion = function (item) {
            var current = item.isEdit;
            for (var idx in $scope.quiz.Questions)
            {
                $scope.quiz.Questions[idx].isEdit = false;
            }
            item.isEdit = !current;
        }

        $scope.addAnswer= function (answer,question) {
            alert(answer.Text)
        }
       
        $scope.postItem = function()
        {
        }


        $scope.delete = function(item)
        {
            var index = $scope.quiz.Questions.indexOf(item);
            $scope.quiz.Questions.splice(index, 1)
        }
        
    }]);