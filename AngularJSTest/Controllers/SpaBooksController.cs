using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularJSTest.Controllers
{
    public class SpaBooksController : Controller
    {
        //
        // GET: /SpaBooks/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult SubMenu()
        {
            return PartialView();
        }

        public ActionResult Page1()
        {
            return PartialView();
        }

        public ActionResult Page2()
        {
            return PartialView();
        }

        public ActionResult Page3()
        {
            return PartialView();
        }

        public ActionResult Page4()
        {
            return PartialView();
        }
    }
}
