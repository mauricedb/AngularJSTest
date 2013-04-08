/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" />


module App {
    export class MainMenuCtrl {
        static $inject = ["$scope", "$rootScope"];
        constructor(
            private $scope: MainMenuScope,
            private $rootScope: ng.IScope) {
             
            $scope.workItems = [
                { href: "Static", title: "Static content" },
                { href: "SimpleBooks", title: "Simple books" },
                { href: "SpaBooks", title: "SPA books" },
            ];

        }
    }

    export interface MainMenuScope extends ng.IScope {
        workItems: MenuItem[];
    }

    export interface MenuItem {
        href: string;
        title: string;
    }
}