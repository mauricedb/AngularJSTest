var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var App;
(function (App) {
    var SpaBooksCtrl = (function () {
        function SpaBooksCtrl($scope) {
            this.$scope = $scope;
        }
        SpaBooksCtrl.$inject = [
            "$scope"
        ];
        return SpaBooksCtrl;
    })();
    App.SpaBooksCtrl = SpaBooksCtrl;    
    var SpaBooksPage1Ctrl = (function (_super) {
        __extends(SpaBooksPage1Ctrl, _super);
        function SpaBooksPage1Ctrl($scope) {
                _super.call(this, $scope);
            this.$scope = $scope;
            $scope.select = angular.bind(this, this.select);
            this.loadData();
        }
        SpaBooksPage1Ctrl.$inject = [
            "$scope"
        ];
        SpaBooksPage1Ctrl.prototype.loadData = function () {
            this.$scope.books = App.createBooks();
            this.$scope.selected = this.$scope.books[0];
        };
        SpaBooksPage1Ctrl.prototype.select = function (book) {
            this.$scope.selected = book;
        };
        return SpaBooksPage1Ctrl;
    })(SpaBooksCtrl);
    App.SpaBooksPage1Ctrl = SpaBooksPage1Ctrl;    
    var SpaBooksPage2Ctrl = (function (_super) {
        __extends(SpaBooksPage2Ctrl, _super);
        function SpaBooksPage2Ctrl($scope) {
                _super.call(this, $scope);
            this.$scope = $scope;
            $scope.createdAt = new Date().toLocaleTimeString();
        }
        SpaBooksPage2Ctrl.$inject = [
            "$scope"
        ];
        return SpaBooksPage2Ctrl;
    })(SpaBooksCtrl);
    App.SpaBooksPage2Ctrl = SpaBooksPage2Ctrl;    
    var app = angular.module('app');
    app.config([
        "$routeProvider", 
        function ($routeProvider) {
            $routeProvider.when("/page1", {
                controller: "App.SpaBooksPage1Ctrl",
                templateUrl: "/SpaBooks/page1"
            });
            $routeProvider.when("/page2", {
                controller: "App.SpaBooksPage2Ctrl",
                templateUrl: "/SpaBooks/page2"
            });
            $routeProvider.otherwise({
                redirectTo: '/page1'
            });
        }    ]);
})(App || (App = {}));
