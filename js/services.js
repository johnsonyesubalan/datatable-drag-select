nokiaApp

    /*----------  get JsonData  ----------*/

    .factory('appFactory', function($http) {

        var appFactory = {};
        var savedData = {};
        

        appFactory.getJsonData = function() {
            return $http({
                method: 'GET',
                url: 'data/test.json',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }


        appFactory.saveSelected = function(data, header) {
           savedData = {
                header: header,
                data: data
           }; 
        }


        appFactory.getSelected = function() {
           return savedData;
        } 
        

        return appFactory;

    }) 