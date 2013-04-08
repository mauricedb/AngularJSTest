/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../Models/Book.ts" />

module App {
    export class MainViewCtrl {
        static $inject = ["$scope"];
        constructor(private $scope: MainViewScope) {

            $scope.books = App.createBooks();
            $scope.selected = $scope.books[0];

            $scope.select = function (book: App.Book) {
                $scope.selected = book;
            };
        }
    }

    export interface MainViewScope {
        books: App.Book[];
        selected: App.Book;
        select: Function;
    }


    //var playApp = angular.module('playApp');
    //playApp.config(["$routeProvider", ($routeProvider: ng.IRouteProvider) => {

    //    $routeProvider.when("/draft", { controller: "App.MainViewCtrl", templateUrl: "/permitTemplate/draft" });
    //    $routeProvider.when("/requesting", { controller: "App.MainViewCtrl", templateUrl: "/permitTemplate/requesting" });
    //    //$routeProvider.when("/live", { controller: "App.MainViewCtrl", templateUrl: "/permitTemplate/live" });
    //    //$routeProvider.when("/suspended", { controller: "App.MainViewCtrl", templateUrl: "/permitTemplate/suspended" });
    //    //$routeProvider.when("/search", { controller: "App.MainViewCtrl", templateUrl: "/permitTemplate/search" });

    //    $routeProvider.otherwise({ redirectTo: '/' });
    //}]);
}
