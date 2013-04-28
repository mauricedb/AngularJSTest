/// <reference path="../../Scripts/typings/signalr/signalr.d.ts" />
/// <reference path="../Models/Book.ts" />

interface BooksHubServer {
    getBooks(): JQueryDeferred;
    addBook(book: App.Book): JQueryDeferred;
    updateBook(book: App.Book): JQueryDeferred;
}

interface BooksHubClient {
    bookUpdated: Function;
}

interface BooksHub extends HubProxy {
    server: BooksHubServer;
    client: BooksHubClient;
}

interface SignalR {
    chat: HubConnection;
    booksHub: BooksHub;
}

var appBooks = angular.module('app.SignalRBooks', []);
appBooks.factory("SignalRBooks", ($rootScope: any) => {
    var booksHub = $.connection.booksHub;
    var books = [];


    function getBooks(done: Function) {
        $.connection.hub.start(() => {
            booksHub.server.getBooks().then((newBooks) => {
                angular.copy(newBooks, books);
                if (done) {
                    done();
                }
                $rootScope.$apply();
            });
        })

        return books;
    }

    function save(book: App.Book) {
        if (book.id) {
            booksHub.server.updateBook(book);
        }
        else {
            booksHub.server.addBook(book);
        }
    }

    booksHub.client.bookUpdated = (newBook: App.Book) => {
        var oldBook = findBook(newBook.id);
        if (oldBook) {
            angular.copy(newBook, oldBook);
        } else {
            books.push(newBook);
        }
        $rootScope.$apply();
    }

    function findBook(id): App.Book {
        var book: App.Book = books.reduce((result, current) => {
            if (current.id === id) {
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
