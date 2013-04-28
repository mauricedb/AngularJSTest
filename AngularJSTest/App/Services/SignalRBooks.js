var appBooks = angular.module('app.SignalRBooks', []);
appBooks.factory("SignalRBooks", function ($rootScope) {
    var booksHub = $.connection.booksHub;
    var books = [];
    function getBooks(done) {
        $.connection.hub.start(function () {
            booksHub.server.getBooks().then(function (newBooks) {
                angular.copy(newBooks, books);
                if(done) {
                    done();
                }
                $rootScope.$apply();
            });
        });
        return books;
    }
    function save(book) {
        if(book.id) {
            booksHub.server.updateBook(book);
        } else {
            booksHub.server.addBook(book);
        }
    }
    booksHub.client.bookUpdated = function (newBook) {
        var oldBook = findBook(newBook.id);
        if(oldBook) {
            angular.copy(newBook, oldBook);
        } else {
            books.push(newBook);
        }
        $rootScope.$apply();
    };
    function findBook(id) {
        var book = books.reduce(function (result, current) {
            if(current.id === id) {
                result = current;
            }
            return result;
        }, null);
        return book;
    }
    return {
        getBooks: getBooks,
        save: save
    };
});
