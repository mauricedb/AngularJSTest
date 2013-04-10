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
    var SpaBooksPage3Ctrl = (function () {
        function SpaBooksPage3Ctrl($scope, Books) {
            this.$scope = $scope;
            this.Books = Books;
            $scope.select = angular.bind(this, this.select);
            this.loadData();
        }
        SpaBooksPage3Ctrl.$inject = [
            "$scope", 
            "Books"
        ];
        SpaBooksPage3Ctrl.prototype.loadData = function () {
            var _this = this;
            this.$scope.books = this.Books.query(function () {
                _this.$scope.selected = _this.$scope.books[0];
            });
        };
        SpaBooksPage3Ctrl.prototype.select = function (book) {
            this.$scope.selected = this.Books.get({
                id: book.id
            });
        };
        return SpaBooksPage3Ctrl;
    })();
    App.SpaBooksPage3Ctrl = SpaBooksPage3Ctrl;    
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
            $routeProvider.when("/page3", {
                controller: "App.SpaBooksPage3Ctrl",
                templateUrl: "/SpaBooks/page3"
            });
            $routeProvider.otherwise({
                redirectTo: '/page1'
            });
        }    ]);
})(App || (App = {}));
