var App;
(function (App) {
    var SignalRBooksCtrl = (function () {
        function SignalRBooksCtrl($scope, SignalRBooks, ctrlUtils) {
            this.$scope = $scope;
            this.SignalRBooks = SignalRBooks;
            this.ctrlUtils = ctrlUtils;
            var _this = this;
            $scope.books = SignalRBooks.getBooks(function () {
                _this.select($scope.books[0]);
            });
            $scope.select = angular.bind(this, this.select);
            $scope.addNew = angular.bind(this, this.addNew);
            $scope.save = angular.bind(this, this.save);
        }
        SignalRBooksCtrl.$inject = [
            "$scope", 
            "SignalRBooks", 
            "ctrlUtils"
        ];
        SignalRBooksCtrl.prototype.select = function (book, formName) {
            if(formName) {
                this.ctrlUtils.reset(this.$scope, formName);
            }
            this.$scope.selected = angular.extend({
            }, book);
        };
        SignalRBooksCtrl.prototype.save = function (book, formName) {
            this.ctrlUtils.reset(this.$scope, formName);
            this.SignalRBooks.save(book);
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
