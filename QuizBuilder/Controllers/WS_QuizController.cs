using QuizBuilder.Models;
using System;
using System.Collections.Generic;
using Microsoft.AspNet.Identity.Owin;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Threading.Tasks;

namespace QuizBuilder.Controllers
{

    public class WS_QuizController : ApiController
    {
        private DBContext db = new DBContext();
        //HttpContext httpContext = new HttpContext(new Http

        public RoleManager<IdentityRole> RoleManager { get; private set; }

        private ApplicationUserManager _userManager;
        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        [HttpGet]
        [Authorize]
        public QuizItem GetUserQuizItem(int id)
        {
            string userId = Request.GetOwinContext().Authentication.User.Identity.GetUserId();

            var currentUser = UserManager.FindById(userId);
            return currentUser.quizItems.First(q=>q.id==id);
        }

        [HttpGet]
        [Authorize]
        public List<QuizItem> GetUserQuizItems()
        {
            string userId = Request.GetOwinContext().Authentication.User.Identity.GetUserId();

            var currentUser = UserManager.FindById(userId);
            return currentUser.quizItems;
        }

        [HttpPost]
        [Authorize]
        public HttpResponseMessage PostQuizItem(QuizItemViewModel item)
        {
            var modelStateErrors = ModelState.Values.ToList();

            List<string> errors = new List<string>();

            foreach (var s in modelStateErrors)
                foreach (var e in s.Errors)
                    if (e.ErrorMessage != null && e.ErrorMessage.Trim() != "")
                        errors.Add(e.ErrorMessage);

            if (errors.Count == 0)
            {
                try
                {
                    string userId = Request.GetOwinContext().Authentication.User.Identity.GetUserId();

                    var currentUser = UserManager.FindById(userId);
                    currentUser.quizItems.Add(new QuizItem()
                    {
                        quizTitle = item.Title,
                        serializedQuiz = item.SerializedQuiz
                    });

                    UserManager.Update(currentUser);
                    return Request.CreateResponse(HttpStatusCode.Accepted);
                }
                catch
                {
                    return Request.CreateResponse(HttpStatusCode.InternalServerError);
                }
            }
            else
            {
                return Request.CreateResponse<List<string>>(HttpStatusCode.BadRequest, errors);
            }

            var user = db.Users.Where(u => u.firstName == "Test").FirstOrDefault();
        }

        [HttpPost]
        [Authorize]
        async public Task<HttpResponseMessage> DeleteQuizItem(int id)
        {
            var item = db.quizzes.Where(t => t.id == id).FirstOrDefault();
            if (item != null)
            {
                db.quizzes.Remove(item);
                await db.SaveChangesAsync();
            }
            return Request.CreateResponse(HttpStatusCode.Accepted);
        }




    }
}
