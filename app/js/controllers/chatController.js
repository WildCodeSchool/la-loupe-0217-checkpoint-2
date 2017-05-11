angular.module('app')
    .controller('ChatController', function($scope, CurrentUser, UserService, ChatService) {

      
        UserService.getOne(CurrentUser.user()._id).then(function(res) {
            $scope.user = res.data;
        });
        $scope.date = new Date();
        $scope.message = '';
        $scope.userinput = '';
        $scope.daysinput = '';
        $scope.messageslist = [];


        $scope.refresh = function() {
            ChatService.getAll().then(function(res) {

                $scope.messageslist = res.data.chats;
            }, function(err) {
                //bad
            });
        };
        $scope.refresh();


        // Ajouter
        $scope.addMessage = function() {

            var messages = {
                Message: $scope.message,
                User: $scope.userinput,
                Day: $scope.daysinput,
            };

            ChatService.addOne(messages).then(function(res) {
                console.log('coucou');

                $scope.messageslist.push(res.data.message);

                $scope.message = '';
                $scope.userinput = '';
                $scope.daysinput = '';

                $scope.refresh();



            }, function(err) {
                console.error('erreur ajout message');
            });

        };

    });
