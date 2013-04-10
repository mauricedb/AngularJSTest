/// <reference path="../Services/Books.ts" />
/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../Models/Book.ts" />

module App {
    export class SpaBooksCtrl {
        static $inject = ["$scope"];
        constructor(private $scope: ng.IScope) {
        }
    }

    export class SpaBooksPage1Ctrl extends SpaBooksCtrl {
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

    export class SpaBooksPage3Ctrl {
        static $inject = ["$scope", "Books"];
        constructor(private $scope: SpaBooksPage3Scope, private Books: ng.resource.IResourceClass) {

            $scope.select = angular.bind(this, this.select);
            this.loadData();
        }

        loadData() {
            this.$scope.books = <any>this.Books.query(() => {
                this.$scope.selected = this.$scope.books[0];
            });
        }

        select(book: App.Book) {
            this.$scope.selected = <Book>this.Books.get({ id: book.id });
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

    export interface SpaBooksPage3Scope extends ng.IScope {
        books: App.Book[];
        selected: App.Book;
        select: Function;
    }

    var app = angular.module('app');
    app.config(["$routeProvider", ($routeProvider: ng.IRouteProvider) => {

        $routeProvider.when("/page1", { controller: "App.SpaBooksPage1Ctrl", templateUrl: "/SpaBooks/page1" });
        $routeProvider.when("/page2", { controller: "App.SpaBooksPage2Ctrl", templateUrl: "/SpaBooks/page2" });
        $routeProvider.when("/page3", { controller: "App.SpaBooksPage3Ctrl", templateUrl: "/SpaBooks/page3" });

        $routeProvider.otherwise({ redirectTo: '/page1' });
    }]);
}
