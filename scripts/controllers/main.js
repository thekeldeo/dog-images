'use strict';

/**
 * @ngdoc function
 * @name techkidsWeb.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the techkidsWeb
 */
angular.module('dogApp')
    .controller('MainCtrl', function ($scope, $http) {
        $scope.listDog = [];

        $http.get('https://dog.ceo/api/breeds/list/all').then(function (res) {
            $scope.dogs = res.data.message;
            Object.keys($scope.dogs).map(function (objectKey, index) {
                let value = $scope.dogs[objectKey];
                if (value.length == 0) {
                    let new_dog = {
                        name: objectKey,
                        type: 'parent'
                    };
                    $scope.listDog.push(new_dog);
                }
                else {
                    value.forEach(function (item, index) {
                        let new_dog = {
                            name: objectKey + ' ' + item,
                            type: 'child',
                            parent: objectKey,
                            child: item
                        };
                        $scope.listDog.push(new_dog);
                    })
                }
            });

            $scope.listDog.forEach(function (item, index) {
                if (item.type == 'parent') {
                    $http.get('https://dog.ceo/api/breed/' + item.name + '/images/random').then(function (res) {
                        item.image = res.data.message;
                    })
                }
                else {
                    $http.get('https://dog.ceo/api/breed/' + item.parent + '/' + item.child + '/images/random').then(function (res) {
                        item.image = res.data.message;
                    })
                }
            })
        });

        $scope.changeImage = function (item) {
            if (item.type == 'parent') {
                $http.get('https://dog.ceo/api/breed/' + item.name + '/images/random').then(function (res) {
                    item.image = res.data.message;
                })
            }
            else {
                $http.get('https://dog.ceo/api/breed/' + item.parent + '/' + item.child + '/images/random').then(function (res) {
                    item.image = res.data.message;
                })
            }
        };
    });