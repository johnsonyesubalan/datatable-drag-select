nokiaApp
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.

            /*----------  index  ----------*/
            
            when('/', {
                templateUrl: 'views/index.html',
                controller: 'tableController',
                label: 'Index'
            }) 


            /*----------  detail  ----------*/

            .when('/view', {
                templateUrl: 'views/view.html',
                controller: 'viewController',
                label: 'Detail'
            });
        }
    ]);