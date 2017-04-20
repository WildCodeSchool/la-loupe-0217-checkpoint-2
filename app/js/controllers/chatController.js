angular.module('app')
.controller('ChatController', function($scope, CurrentUser, MsgService) {
  $scope.user = CurrentUser.user();

  $scope.newMsg = '';

  $scope.msgs = [];

  MsgService.findAll().then(function(res){
    $scope.msgs = res.data;
  }, function (err) {
    // oups
  })

  $scope.sendMsg = function () {
    MsgService.send({content: $scope.newMsg, author: $scope.user._id}).then(function(res){
      $scope.newMsg = '';
      res.data.author = $scope.user;
      $scope.msgs.push(res.data);
    }, function (err) {
      // oups
    })
  }

  $scope.likeMsg = function (id, index) {
    MsgService.like(id, $scope.user._id).then(function(res){
      $scope.msgs[index].liked.push({author: $scope.user._id})
    }, function (err) {
      // oups
    });
  };

});
