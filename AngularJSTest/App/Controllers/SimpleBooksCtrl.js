var App;
(function (App) {
    var SimpleBooksCtrl = (function () {
        function SimpleBooksCtrl($scope) {
            this.$scope = $scope;
            $scope.books = App.createBooks();
            $scope.selected = $scope.books[0];
            $scope.select = function (book) {
                $scope.selected = book;
            };
        }
        SimpleBooksCtrl.$inject = [
            "$scope"
        ];
        return SimpleBooksCtrl;
    })();
    App.SimpleBooksCtrl = SimpleBooksCtrl;    
})(App || (App = {}));
