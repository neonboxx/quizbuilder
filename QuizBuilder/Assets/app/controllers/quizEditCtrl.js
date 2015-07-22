angular.module('quizEdit', [])
    .controller('quizEditCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
        $scope.id = $routeParams.id;
        if ($scope.id) {
            $http.get('/api/WS_Quiz/GetUserQuizItem/' + $scope.id)
                .success(function (data, status, headers, config) {
                    $scope.title = data.quizTitle;
                    $scope.quiz = JSON.parse(data.serializedQuiz);
                    $scope.quizAsJSON = JSON.stringify($scope.quiz, null, 2);
                });
        }
        else
        {
            //default quiz
            $scope.title = "";
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
            $scope.quizAsJSON = JSON.stringify($scope.quiz, null, 2);
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
            question.Answers.push(
                {
                    Text: answer.Text,
                    Correct:answer.Correct
                }
            )
            answer.Text = "",
            answer.Correct = false
        }

        $scope.addQuestion = function (question) {
            $scope.quiz.Questions.push({
                Title: question.Title,
                Answers:[]
            });
            question.Title = ""
        }

        $scope.deleteAnswer = function (answer, question) {
            var index = question.Answers.indexOf(answer)
            question.Answers.splice(index,1)
        }
       
        $scope.postItem = function()
        {
        }


        $scope.delete = function(item)
        {
            var index = $scope.quiz.Questions.indexOf(item);
            $scope.quiz.Questions.splice(index, 1)
        }
        
        $scope.refreshJSON = function ()
        {
            $scope.quizAsJSON = JSON.stringify($scope.quiz,null,2) 
        }
        $scope.updateFromJSON = function ()
        {
            try{
                $scope.quiz = JSON.parse($scope.quizAsJSON)
            }
            catch(error)
            {
                alert(error)
            }
            
        }
        $scope.save = function()
        {
            //if theres an id, do a put to update the quiz
            if ($scope.id > 0) {
                $http.put('/api/WS_Quiz/PostQuizItem/' + $scope.id,  { Title: $scope.title, SerializedQuiz: JSON.stringify($scope.quiz) } )
                    .success(function (data, status, headers, config) {
                        $scope.quiz = data.Quiz;
                    });
            }
        }
        
    }]);