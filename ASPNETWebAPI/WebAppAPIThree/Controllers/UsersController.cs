using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebAppAPIThree.FormResult;
using WebAppAPIThree.Models;
using WebAppAPIThree.FormModel;
using System.Web.Http.Cors;


/// WebAppAPIThree is a name of the project
/// 
namespace WebAppAPIThree.Controllers
{
 
    // ADD THIS FOR ALL APP CAN ACCESS IT
    [EnableCors(origins: "*", headers: "*", methods: "*")]

    // RoutePrefix for all inside of UsersController class
    [RoutePrefix ("api/user")]

    // UsersController == 'Users' is a name of table and end with 'Controller' 
    public class UsersController : ApiController
    {
        private DataEntities dbase = new DataEntities();

    //////////  ALL ACTION METHODS   ////////////////////

        [HttpGet]
        [Route("getusers")]
        public object GetAllUser()
        {   // get all the user table
            //  var users = dbase.Users.Where(col => col.IsActive == true).ToList();
            // return new { data = users };
            try
            {

                // user pointer to check if username and password is matching
                var record = dbase.Users.Where(col => col.IsActive == true).ToList();

                if (record == null)
                {
                    // No Match
                    return new { status = "401", message = "cannot get all user"};
                }
                else
                {
                    return new {  dbase = record };
                    // User is authenticated                    
                }

            }
            catch (Exception e)
            {
                return new { status = "401", message = "Server Error " + e.InnerException };

            }
        }
        // using POST
        [HttpPost]
        [Route("login")]
        public object Login(UserCredentialModel user)
        {
            try
            {

        // user pointer to check if username and password is matching
        var record = dbase.Users.Where(col => col.Username == user.Username &&  col.Password == user.Password).FirstOrDefault();

                if (record == null)
                {
                    // No Match
                    return new { status = "401", message = "Invalid Login" };
                }
                else
                {
                    return new { status = "201", message = "Success", userid = record.Id };
                    // User is authenticated                    
                }

            }
            catch (Exception e)
            {
                return new  { status = "401", message = "Server Error " + e.InnerException };

            }

        }
       
        // using POST
        [HttpPost]
        [Route("add")]
        // NewUserModel from FormModel folder
        public object AddUser(NewUserModel postUser)
        {

            try
            {  // create a new OBJECT to store new user information
                User tableRecord = new User();
                    tableRecord.Username = postUser.Username;
                    tableRecord.Password = postUser.Password;
                    tableRecord.FirstName = postUser.FirstName;
                    tableRecord.LastName = postUser.LastName;
                    tableRecord.IsActive = true;
                    tableRecord.DateCreated = DateTime.Now;

                    // adding use add() funtion and save into data table of Users
                    dbase.Users.Add(tableRecord);
                    dbase.SaveChanges();

                    return new { msg = "Success", dbase = tableRecord };

            }
            catch (Exception e)
            {
                return new { status = 404, msg = "Error" + e.InnerException };

            }

        }

        // get/search a single user record
        /*[HttpPost]
        [Route("searchUser")]
        public object SearchUser(int userid)
        {

            try
            {
                var userRecord = dbase.Users.Find(userid);

                if (userRecord != null)
                {                    
                    return new { msg = "Success", data = userRecord };

                }

                return new { msg = "Error", data = 0};
            }
            catch (Exception e)
            {
                return new { status = 404, msg = "Error" + e.InnerException };

            }

        }
        */

        [HttpGet]
        [Route("search/{searchStr}")]
        public object SearchUsers(string searchStr)
        {
            try
            {
               var userRes = dbase.Users.Where(col => col.Username.Contains(searchStr) || col.FirstName.Contains(searchStr) || col.LastName.Contains(searchStr)).ToList();
                var results = from m in userRes
                              select new UserResult()
                              {
                                  Id = m.Id,
                                  Username = m.Username,
                                  FirstName = m.FirstName,
                                  LastName = m.LastName

                              };
                    return new {  data = results };
                

            }
            catch (Exception)
            {

                return new { status = 401, msg = "cannot get data" };
            }
        }


        /// //////////////////////////////////////////

        // update/edit record already existed
        [HttpPost]
        [Route("update")]
        public object UpdateUser(UserResult postUser )
        {
            
            try
            {
                var tableRecord = dbase.Users.Find(postUser.Id);

                if(tableRecord != null)
                {
                 
                    tableRecord.Username = postUser.Username;
                    tableRecord.FirstName = postUser.FirstName;
                    tableRecord.LastName = postUser.LastName;
                    // save the changing data table
                    dbase.SaveChanges();
                    return new { status = 200 , msg = "Success", dbase = tableRecord };

                }

                return null;
            }
            catch (Exception e)
            {
                return new { status = 404, msg = "Error" + e.InnerException };

            }

        }

        // delete exist record
        [HttpPost]
        [Route("delete")]
        public object DeleteUser(int userid)
        {
            try
            {
                var tableRecord = dbase.Users.Find(userid);

                if (tableRecord != null)
                {
                    tableRecord.IsActive = false;
                    //   remove user infor matched id
                    dbase.Users.Remove(tableRecord);
                    // save the changing data table
                    dbase.SaveChanges();

                    return new { msg = " Record Delete" };

                }
                return null;
            }

            /*
                var obj = dbase.Users.Where(x => x.Id == userid).ToList().FirstOrDefault();
               //  remove user infor matched id
                 dbase.Users.Remove(obj);
                 dbase.SaveChanges();
                  return new 
                 {
                      msg = "Recored Deleted ", dbase = dbase
                  };

            }
            */
            catch (Exception e)
            {
                return new { status = 404, msg = "Error" + e.InnerException };

            }
            

        }

        //////////////////////////////////////////
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                dbase.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(int id)
        {
            return dbase.Users.Count(e => e.Id == id) > 0;
        }

    }
}