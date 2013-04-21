var App;
(function (App) {
    var MainMenuCtrl = (function () {
        function MainMenuCtrl($scope, $rootScope) {
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            $scope.workItems = [
                {
                    href: "Static",
                    title: "Static content"
                }, 
                {
                    href: "SimpleBooks",
                    title: "Simple books"
                }, 
                {
                    href: "SpaBooks",
                    title: "SPA books"
                }, 
                {
                    href: "SignalRBooks",
                    title: "SignalR books"
                }, 
                
            ];
        }
        MainMenuCtrl.$inject = [
            "$scope", 
            "$rootScope"
        ];
        return MainMenuCtrl;
    })();
    App.MainMenuCtrl = MainMenuCtrl;    
})(App || (App = {}));
