/**
 * Copyright (c) 2017-present, Alejandro Mantilla <@AlejoJamC>.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

var app = angular.module('watcherman', []);
app.controller('WatchermanCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.loadData = function () {
        $http({
            method: 'GET',
            url: '/watchermen',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            $scope.DataError = false;
            $scope.watchermen = JSON.parse(response.data);
            console.log($scope.watchermen);
            console.log($scope.watchermen[0].mobile);
            console.log($scope.watchermen[1]);
            console.log(typeof $scope.watchermen);
        }, function errorCallback(response) {
            $scope.DataError = true;
            $scope.watchermen = {};
        });
    };

    $scope.deleteById = function (id) {
        $http({
            method: 'DELETE',
            url: '/watchermen',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            $scope.DataError = false;
            $scope.watchermen = JSON.parse(response.data);
            console.log($scope.watchermen);
            console.log($scope.watchermen[0].mobile);
            console.log($scope.watchermen[1]);
            console.log(typeof $scope.watchermen);
        }, function errorCallback(response) {
            $scope.DataError = true;
            $scope.watchermen = {};
        });
    }
}]);