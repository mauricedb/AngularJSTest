using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AngularJSTest.Models;

namespace AngularJSTest.Api
{
    public class BooksController : ApiController
    {
        private readonly IBooksRepository _repo = new BooksRepository();

        public BooksController()
        {
            //System.Threading.Thread.Sleep(1000);
        }

        // GET api/books
        public IEnumerable<Book> Get()
        {
            return _repo.GetBooks();
        }

        // GET api/books/5
        public HttpResponseMessage Get(int id)
        {
            var book = _repo.GetBook(id);

            if (book == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, book);
        }

        // POST api/books
        public HttpResponseMessage Post(Book book)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            var newBook = _repo.AddBook(book);
            var response = Request.CreateResponse(HttpStatusCode.Created, newBook);
            var uriString = Url.Link("DefaultApi", new { id = newBook.Id }) ?? string.Empty;
            response.Headers.Location = new Uri(uriString);

            return response;
        }

        // PUT api/books/5
        public HttpResponseMessage Put(int id, Book book)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            var newBook = _repo.UpdateBook(book);
            return Request.CreateResponse(HttpStatusCode.OK, newBook);
        }

        // DELETE api/books/5
        public void Delete(int id)
        {
            _repo.DeleteBook(id);
        }
    }
}
