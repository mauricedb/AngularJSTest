/// <reference path="../../Scripts/typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" />

var appBooks = angular.module('app.Books', ["ngResource"]);
appBooks.factory("Books", ($resource: ng.resource.IResourceService) => {
    return $resource('/api/books/:id', { id: '@id' }, { update: { method: 'PUT' } });
});


module App {

    export interface Books extends ng.resource.IResourceClass  {
        update: ng.resource.IActionCall;
    }
}

