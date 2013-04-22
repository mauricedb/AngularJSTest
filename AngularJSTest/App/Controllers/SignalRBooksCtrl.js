var App;
(function (App) {
    var SignalRBooksCtrl = (function () {
        function SignalRBooksCtrl($scope, ctrlUtils) {
            this.$scope = $scope;
            this.ctrlUtils = ctrlUtils;
            var _this = this;
            var $$ = $;
            this.booksHub = $$.connection.booksHub;
            $$.connection.hub.start(function () {
                _this.booksHub.server.getBooks().then(function (books) {
                    $scope.$apply(function () {
                        $scope.books = books;
                    });
                });
            });
            this.booksHub.client.bookUpdated = angular.bind(this, this.bookUpdated);
            $scope.select = angular.bind(this, this.select);
            $scope.addNew = angular.bind(this, this.addNew);
            $scope.save = angular.bind(this, this.save);
        }
        SignalRBooksCtrl.$inject = [
            "$scope", 
            "ctrlUtils"
        ];
        SignalRBooksCtrl.prototype.select = function (book, formName) {
            this.ctrlUtils.reset(this.$scope, formName);
            this.$scope.selected = angular.extend({
            }, book);
        };
        SignalRBooksCtrl.prototype.save = function (book, formName) {
            this.ctrlUtils.reset(this.$scope, formName);
            if(book.id) {
                this.booksHub.server.updateBook(book);
            } else {
                this.booksHub.server.addBook(book);
            }
        };
        SignalRBooksCtrl.prototype.bookUpdated = function (newBook) {
            var _this = this;
            this.$scope.$apply(function () {
                var oldBook = _this.findBook(newBook.id);
                if(oldBook) {
                    angular.extend(oldBook, newBook);
                } else {
                    _this.$scope.books.push(newBook);
                }
            });
        };
        SignalRBooksCtrl.prototype.findBook = function (id) {
            var book = this.$scope.books.reduce(function (result, current) {
                if(current.id === id) {
                    result = current;
                }
                return result;
            }, null);
            return book;
        };
        SignalRBooksCtrl.prototype.addNew = function (formName) {
            this.ctrlUtils.reset(this.$scope, formName);
            this.$scope.selected = {
                id: 0,
                title: "",
                author: ""
            };
        };
        return SignalRBooksCtrl;
    })();
    App.SignalRBooksCtrl = SignalRBooksCtrl;    
})(App || (App = {}));
