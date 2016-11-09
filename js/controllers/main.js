nokiaApp

    
    /*----------  mainController  ----------*/

    .controller('tableController', ['appFactory', '$scope', function(appFactory, $scope) {


        $scope.header = [];
        $scope.data = [];


        /*----------  getJson Data  ----------*/


        appFactory.getJsonData().success(function(data) { 

            
            /*----------  table header data ----------*/

            for (idx in data.columns) {
                header = data.columns[idx];
                $scope.header.push({ 'title': header, 'key': header.replace(/[\/\s]+/gi) });
            }

            
            /*----------  table body data ----------*/

            for (idx in data.data) {
                rows = data.data[idx];
                $scope.newrow = {};
                for (idy in $scope.header) {
                    col = $scope.header[idy].key;
                    $scope.newrow[col] = rows[idy];
                }
                $scope.data.push($scope.newrow);
            }

            
            /*----------  copying original data  ----------*/

            $scope.orig = angular.copy($scope.data);


            /*----------  original data : (with default all data selected) ----------*/

            $scope.dataAllSelected = angular.copy($scope.data);
            angular.forEach($scope.dataAllSelected, function(el) {
                el.selected = true;
            });

        });


        /*----------  sorting Data settings ----------*/

        $scope.sort = function(keyname) {
            $scope.sortKey = keyname; //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        }
 


        /*---------- Select on Mouse Up/Move ----------*/

        $scope.mouseIsDown = false;

        $scope.selectall = function() {
            if ($scope.isSelectAll) {
                $scope.data = $scope.dataAllSelected;
            } else {
                $scope.reset();
            }
        };

        $scope.chooseRow = function(row, event) {
            event.preventDefault();
            if ($scope.mouseIsDown == false) return;
            console.log(row);
            row.selected = true;
        }

        $scope.currentRow = function(row) {
            if (!event.shiftKey) {
                $scope.reset();
            }
            $scope.isSelectAll = false;
            $scope.mouseIsDown = true;
            if (row.selected != undefined) {
                if (row.selected == true) {
                    delete row.selected;
                }
                return;
            }
            angular.forEach($scope.data, function(el) {
                if (el.id == row.id) {
                    el.selected = true;
                }
            });
        }

        $scope.doNotSelect = function() {
            $scope.mouseIsDown = false;
        }



        /*----------  get selected Rows ----------*/
 
        $scope.getSelected = function() {
            $scope.selectedRows = [];
            angular.forEach($scope.data, function(el) {
                if (el.selected == true) {
                    $scope.selectedRows.push(el);
                }
            });
            appFactory.saveSelected($scope.selectedRows, $scope.header);
        }


        /*----------  reset on Every mouseUp ----------*/

        $scope.reset = function() {
            $scope.data = angular.copy($scope.orig);
        };


    }])


    /*----------  viewController  ----------*/

    .controller('viewController', ['appFactory', '$scope', function(appFactory, $scope) {
 
        $scope.header = [];
        $scope.data = [];


        /*----------  getSelectedJson Data  ----------*/

            $scope.header = appFactory.getSelected().header;
            $scope.data = appFactory.getSelected().data;  
            console.log($scope.data);

    }])
