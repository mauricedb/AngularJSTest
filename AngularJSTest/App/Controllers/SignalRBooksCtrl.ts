/// <reference path="../Services/Books.ts" />
/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../Models/Book.ts" />


module App {


    export class SignalRBooksCtrl {
        static $inject = ["$scope"];
        private booksHub: any;

        constructor(private $scope: SignalRBooksScope) {
            var $$: any = $;
            this.booksHub = $$.connection.booksHub;

            $$.connection.hub.start(() => {
                this.booksHub.server.getBooks().then((books) => {
                    $scope.$apply(() => {
                        $scope.books = books;
                    });
                });
            })
            this.booksHub.client.bookUpdated = angular.bind(this, this.bookUpdated);

            $scope.select = angular.bind(this, this.select);
            $scope.addNew = angular.bind(this, this.addNew);
            $scope.save = angular.bind(this, this.save);
        }

        select(book: App.Book) {
            this.$scope.selected = book;
        }

        save(book: Book, formName) {
            if (book.id) {
                this.booksHub.server.updateBook(book);
            }
            else {
                this.booksHub.server.addBook(book);
            }
        }

        // From: http://stackoverflow.com/questions/12603914/reset-form-to-pristine-state-angularjs-1-0-x
        reset(formName, defaults?) {
            var scope = this.$scope;

            $('form[name=' + formName + '], form[name=' + formName + '] .ng-dirty').removeClass('ng-dirty').addClass('ng-pristine');
            var form = scope[formName];
            form.$dirty = false;
            form.$pristine = true;
            for (var field in form) {
                if (form[field].$pristine === false) {
                    form[field].$pristine = true;
                }
                if (form[field].$dirty === true) {
                    form[field].$dirty = false;
                }
            }
            for (var d in defaults) {
                scope[d] = defaults[d];
            }
        }

        bookUpdated(newBook: Book) {
            this.$scope.$apply(() => {
                var oldBook = this.findBook(newBook.id);
                if (oldBook) {
                    angular.extend(oldBook, newBook);
                } else {
                    this.$scope.books.push(newBook);
                }
            });
        }

        findBook(id): Book {
            var book: Book = this.$scope.books.reduce((result, current) => {
                if (current.id === id) {
                    result = current;
                }
                return result;
            }, null);
            return book;
        }

        addNew(formName) {
            this.reset(formName);
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