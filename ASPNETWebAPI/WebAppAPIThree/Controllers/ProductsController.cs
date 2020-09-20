
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using WebAppAPIThree.FormModel;
using WebAppAPIThree.Models;
using WebAppAPIThree.FormResult;

// WebAppAPIThree si project name
namespace WebAppAPIThree.Controllers
{
   // ADD THIS FOR ALL OTHER APP CAN ACCESS IT
    [EnableCors(origins: "*", headers: "*", methods: "*")]

    // RoutePrefix to expect whole thing of routes
    // for all inside of  product class
    [RoutePrefix("api/product")]

    // ProductsController == ' Products' is a name of table and end with 'Controller' 
    public class ProductsController : ApiController
    { 

        // db connect to MS SQL DATABASE
        // using "db"  to connect to all the table want to
        private DataEntities db = new DataEntities();

        ///////////////////////////// ALL ADD ACTION METHODS /////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////

        /// Get() method will handle HTTP GET request
        // ROUTE: api/Products/default
        [Route("default")]
        public IQueryable<Product> GetProducts()
        {
            // Advantage - It will close you databse connection from Entity Framework ORM automatically every time - 
            // .NET MVC - ORM is called Entity Framework

            //using (DataEntities entities = new DataEntities())
            //{
            //    return entities.Products;
            //}
            
            return db.Products;

        }
        /// Get() method will handle HTTP GET request
        // GET using [HttpGet]
        // ROUTE: api/Products/getall
        [HttpGet]
        [Route("getall")]
        // Use object to return custom output
        public object GetAllProducts()
        {
            try
            {
                var results = db.Products.ToList();
                if(results != null)
                {
                    return new { status = 200, msg = "Success", data = results };
                }
                else
                {
                    return new { status = 402, msg = "Error", data = 0 };

                }
            }
            catch (Exception)
            {

                return new { status = 404, msg = "Server Error", data = 0};
            }
            // get all the table database
            // because use 'objec't so have to use 'new' in return
            

        }

   
        [HttpGet]
        // searchStr is user input value to search
        [Route("search/{searchStr}")]        
        public object searchProducts(string searchStr)
        {
            try
            {
                // col => col is a lambda function which is a "pointer".  
                // Delegate is the obejct (Products) that is used as pointer object

                // To debug pick a point to stop and hit F5 and the F11 to step through
                var results = db.Products.Where(col => col.Name.Contains(searchStr));
                return new { status = 200, msg="Success", data = results };
            }
            catch (Exception e)
            {
                // because use object so have to use new in return
                return new { status=404, msg = "Error" + e.InnerException};                
            }
            
        }

        [HttpGet]
        [Route("searchadv/{searchSt}")]
        public object searchProductsAdv(string searchSt)
        {
            try
            {
                
                // JOIN TABLE
                var queryResults = from p in db.Products.Where(col => col.Name.Contains(searchSt))
                            join c in db.ProductColors on p.Category equals c.Id                            
                            select new { p.Id, p.Name, p.Price, c.Color};


                return new { status = 200, msg = "Success", data = queryResults.ToList() };
            }
            catch (Exception e)
            {
                return new { status = 404, msg = "Error" + e.InnerException };
            }

        }
        ////Post() method will handle HTTP POST request
        ///POST request is used to create a new record in the data source 
        [HttpPost]
        [Route("add")]
        // PASSING ProductModel file from FormModel folder, postedAddForm access input
        public object AddProduct(ProductModel postedAddForm)
        {
            try
            {
                var record = db.Products.Find(postedAddForm.Id);
                if (record != null)
                {  // change name n  price of the table which matching id post
                    // record.Name is existed in database already
                    // record.Price is existed in database already
                    record.Name = postedAddForm.name;
                    record.Price = postedAddForm.price;

                    // SaveChanges() to save the changed
                    db.SaveChanges();
                }

                return new { status = 200, msg = "Success" };
            }
            catch (Exception e)
            {
                return new { status = 404, msg = "Error" + e.InnerException };
            }
        }



        ///////////////////////////////////////////////////////
        // closed 
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProductExists(int id)
        {
            return db.Products.Count(e => e.Id == id) > 0;
        }
    }
}
