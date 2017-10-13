/**
 * Copyright (c) 2017-present, Alejandro Mantilla <@AlejoJamC>.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

var app = angular.module('watcherman', []);
app.controller('WatchermanCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
    $scope.DataError = false;
    $scope.listAll = function () {
        $http({
            method: 'GET',
            url: '/watchermen',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            console.log(response);
            var resultado = response.data.resultado;

        }, function errorCallback(response) {
            $scope.DataError = true;
        });
    }
}]);