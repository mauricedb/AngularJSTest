using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularJSTest.Controllers
{
    public class SimpleBooksController : Controller
    {
        //
        // GET: /SimpleBooks/

        public ActionResult Index()
        {
            return View();
        }

    }
}
