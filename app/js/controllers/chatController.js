angular.module('app')
.controller('ChatController', function($scope, CurrentUser, MsgService) {
  $scope.user = CurrentUser.user();

  $scope.newMsg = '';

  $scope.sendMsg = function () {
    MsgService.send({content: $scope.newMsg, author: $scope.user._id}).then(function(res){
      console.log(res.data);
      $scope.newMsg = '';
    }, function (err) {
      // oups
    })
  }

});
