angular.module('app')
    .service('MsgService', function($http) {
        return {
            send: function (newMsg) {
                return $http.post('/msg', newMsg);
            },
            findAll: function () {
                return $http.get("/msg")
            },
            like: function (msgId, userId) {
                return $http.post("/msg/" + msgId, {userId: userId})
            }
        };
    });
