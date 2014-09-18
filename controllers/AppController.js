(function() {
    var app = angular.module('Controllers', ['Models']);

    app.controller('AppController', ['$scope', 'Verbes', 'Noms', function($scope, Verbes, Noms) {
        var scope = $scope;
        var controller = this;

        controller.currentRandom = '';

        controller.verbes = new Verbes();
        controller.noms = new Noms();

        controller.logged = false;

        $scope.$on('loggedIn', function() {
            controller.logged = true;
        });

        $scope.$on('loggedOut', function() {
            controller.logged = false;
        });

        controller.getRandomKittenUrl = function() {
            return "http://placekitten.com/g/"+(380+Math.round(Math.random()*40))+"/"+(380+Math.round(Math.random()*40));
        };

        controller.loadOneRandom = function() {
            var randomAction = controller.verbes.getOneRandom()+' '+controller.noms.getOneRandom();
            var firstLetter = randomAction.slice(0, 1).sansAccent();
            if (firstLetter == 'a'
                    || firstLetter == 'e'
                    || firstLetter == 'i'
                    || firstLetter == 'o'
                    || firstLetter == 'u'
                    || firstLetter == 'y'
                    || firstLetter == 'h') {
                randomAction = "J'aimerais t'"+randomAction;
            } else {
                randomAction = "J'aimerais te "+randomAction;
            }
            controller.currentRandom = randomAction;
            controller.kittenUrl = controller.getRandomKittenUrl();
        };

    }]);
})()
