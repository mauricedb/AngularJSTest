var App;
(function (App) {
    var MainViewCtrl = (function () {
        function MainViewCtrl($scope) {
            this.$scope = $scope;
            $scope.books = App.createBooks();
            $scope.selected = $scope.books[0];
            $scope.select = function (book) {
                $scope.selected = book;
            };
        }
        MainViewCtrl.$inject = [
            "$scope"
        ];
        return MainViewCtrl;
    })();
    App.MainViewCtrl = MainViewCtrl;    
})(App || (App = {}));
