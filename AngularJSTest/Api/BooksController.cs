using System.Collections.Generic;
using System.Web.Http;
using AngularJSTest.Models;

namespace AngularJSTest.Api
{
    public class BooksController : ApiController
    {
        private IBooksRepository _repo = new BooksRepository();

        // GET api/books
        public IEnumerable<Book> Get()
        {
            return _repo.GetBooks();
        }

        // GET api/books/5
        public Book Get(int id)
        {
            return _repo.GetBook(id);
        }

        // POST api/books
        public void Post(Book book)
        {
            _repo.AddBook(book);
        }

        // PUT api/books/5
        public void Put(int id, Book book)
        {
            _repo.UpdateBook(book);
        }

        // DELETE api/books/5
        public void Delete(int id)
        {
            _repo.DeleteBook(id);
        }
    }
}
