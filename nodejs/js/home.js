(function() {
    var app = angular.module("myApp", []);
    app.controller("myCtrl", function($scope,$http) {//sets up controller with scope and http



        //retrieves data from node.js variable. need to modify to retrieve from database
        $scope.data = [];
        var request = $http.get('/data');  //gets data from /data that node js generates
        request.success(function(data) {
            $scope.data = data;
        });
        request.error(function(data){
            console.log('Error: ' + data);
        });


        //submit inserts into database
        $scope.myTxt = "Please enter all fields";
        $scope.submit = function(){
            var obj = {
                id: $scope.null,
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                studentID: $scope.studentID,
                item: $scope.item,
                qrlCode: $scope.qrlCode
            };

            var json = JSON.stringify(obj);

            $scope.myTxt = "Entries added to database";
            $http.post("/api/entry/", json).success(function(json,status){
                console.log('Entry posted successfully');
            })
        };

    });
})();