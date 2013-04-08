/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../Models/Book.ts" />

module App {
    export class SpaBooksCtrl {
        static $inject = ["$scope"];
        constructor(private $scope: ng.IScope) {
        }
    }

    export class SpaBooksPage1Ctrl extends SpaBooksCtrl{
        static $inject = ["$scope"];
        constructor(private $scope: SpaBooksPage1Scope) {
            super($scope);

            $scope.select = angular.bind(this, this.select);
            this.loadData();
        }

        loadData() {
            this.$scope.books = App.createBooks();
            this.$scope.selected = this.$scope.books[0];
        }

        select(book: App.Book) {
            this.$scope.selected = book;
        }
    }

    export class SpaBooksPage2Ctrl extends SpaBooksCtrl {
        static $inject = ["$scope"];
        constructor(private $scope: SpaBooksPage2Scope) {
            super($scope);
            $scope.createdAt = new Date().toLocaleTimeString();
        }
    }

    export interface SpaBooksPage1Scope extends ng.IScope {
        books: App.Book[];
        selected: App.Book;
        select: Function;
    }

    export interface SpaBooksPage2Scope extends ng.IScope {
        createdAt: string;
    }

    var app = angular.module('app');
    app.config(["$routeProvider", ($routeProvider: ng.IRouteProvider) => {

        $routeProvider.when("/page1", { controller: "App.SpaBooksPage1Ctrl", templateUrl: "/SpaBooks/page1" });
        $routeProvider.when("/page2", { controller: "App.SpaBooksPage2Ctrl", templateUrl: "/SpaBooks/page2" });

        $routeProvider.otherwise({ redirectTo: '/page1' });
    }]);
}
