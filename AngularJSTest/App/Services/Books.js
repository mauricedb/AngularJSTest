var appBooks = angular.module('app.Books', [
    "ngResource"
]);
appBooks.factory("Books", function ($resource) {
    return $resource('/api/books/:id', {
        id: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    });
});
