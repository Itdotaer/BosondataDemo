(function() {
    'use sctrict';

    var app = angular.module('app', ['ui.router', 'services']);

    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
    ]);

    //Router
    app.config(router);
    router.$inject = ['$stateProvider', '$urlRouterProvider'];

    function router($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: '/app/views/main.html',
                controller: 'mainController',
                controllerAs: 'vm'
            });
    }

    //Constants
    app.constant("DEBUG", false);
})();