/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../Models/Book.ts" />


module App {
    export class SignalRBooksCtrl {
        static $inject = ["$scope", "SignalRBooks", "ctrlUtils"];

        constructor(private $scope: SignalRBooksScope, private SignalRBooks, private ctrlUtils) {
            $scope.books = SignalRBooks.getBooks(() => {
                this.select($scope.books[0])
            });

            $scope.select = angular.bind(this, this.select);
            $scope.addNew = angular.bind(this, this.addNew);
            $scope.save = angular.bind(this, this.save);
        }

        select(book: App.Book, formName?) {
            if (formName) {
                this.ctrlUtils.reset(this.$scope, formName);
            }
            this.$scope.selected = angular.extend({}, book);
        }

        save(book: Book, formName) {
            this.ctrlUtils.reset(this.$scope, formName);
            this.SignalRBooks.save(book);
        }

        addNew(formName) {
            this.ctrlUtils.reset(this.$scope, formName);
            this.$scope.selected = <Book> {
                id: 0,
                title: "",
                author: ""
            };
        }
    }

    export interface SignalRBooksScope extends ng.IScope {
        books: App.Book[];
        selected: App.Book;
        select: Function;
        save: Function;
        addNew: Function;
    }
}