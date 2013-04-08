/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../Models/Book.ts" />

module App {
    export class SimpleBooksCtrl {
        static $inject = ["$scope"];
        constructor(private $scope: SimpleBooksScope) {

            $scope.books = App.createBooks();
            $scope.selected = $scope.books[0];

            $scope.select = function (book: App.Book) {
                $scope.selected = book;
            };
        }
    }

    export interface SimpleBooksScope {
        books: App.Book[];
        selected: App.Book;
        select: Function;
    }
}
