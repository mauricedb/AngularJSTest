using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AngularJSTest.Models;
using Microsoft.AspNet.SignalR;

namespace AngularJSTest.Hubs
{
    public class BooksHub : Hub
    {

        public IEnumerable<Book> GetBooks()
        {
            using (IBooksRepository repo = new BooksRepository())
            {
                return repo.GetBooks();
            }
        }

        public void UpdateBook(Book newBook)
        {
            using (IBooksRepository repo = new BooksRepository())
            {
                var book = repo.UpdateBook(newBook);
                Clients.All.BookUpdated(book);
            }
        }

        public void AddBook(Book newBook)
        {
            using (IBooksRepository repo = new BooksRepository())
            {
                var book = repo.AddBook(newBook);
                Clients.All.BookUpdated(book);
            }
        }
    }
}