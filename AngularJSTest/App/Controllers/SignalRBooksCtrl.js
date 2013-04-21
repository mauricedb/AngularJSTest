var App;
(function (App) {
    var SignalRBooksCtrl = (function () {
        function SignalRBooksCtrl($scope) {
            this.$scope = $scope;
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
            "$scope"
        ];
        SignalRBooksCtrl.prototype.select = function (book) {
            this.$scope.selected = book;
        };
        SignalRBooksCtrl.prototype.save = function (book, formName) {
            if(book.id) {
                this.booksHub.server.updateBook(book);
            } else {
                this.booksHub.server.addBook(book);
            }
        };
        SignalRBooksCtrl.prototype.reset = function (formName, defaults) {
            var scope = this.$scope;
            $('form[name=' + formName + '], form[name=' + formName + '] .ng-dirty').removeClass('ng-dirty').addClass('ng-pristine');
            var form = scope[formName];
            form.$dirty = false;
            form.$pristine = true;
            for(var field in form) {
                if(form[field].$pristine === false) {
                    form[field].$pristine = true;
                }
                if(form[field].$dirty === true) {
                    form[field].$dirty = false;
                }
            }
            for(var d in defaults) {
                scope[d] = defaults[d];
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
            this.reset(formName);
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
