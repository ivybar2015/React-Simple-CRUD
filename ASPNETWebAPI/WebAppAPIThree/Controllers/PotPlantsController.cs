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
using WebAppAPIThree.Models;

namespace WebAppAPIThree.Controllers
{
    // ADD THIS FOR ALL APP CAN ACCESS IT
    [EnableCors(origins: "*", headers: "*", methods: "*")]

    [RoutePrefix("api/pot")]

    public class PotPlantsController : ApiController
    {
        private DataEntities dabase = new DataEntities();

        // GET: api/PotPlants
        public IQueryable<PotPlant> GetPotPlants()
        {
            return dabase.PotPlants;
        }

        /// Get() method will handle HTTP GET request
        // GET: api/Products
        [Route("default")]
        public IQueryable<PotPlant> GetProducts()
        {
            // Advantage - It will close you databse connection from Entity Framework ORM automatically every time - 
            // .NET MVC - ORM is called Entity Framework

            //using (DataEntities entities = new DataEntities())
            //{
            //    return entities.Products;
            //}

            return dabase.PotPlants;

        }
        // GET: api/PotPlants/5
        [Route("allpotlist")]
        [HttpGet]
        public object GetAllPot()
        {
            try
            {
                var value = dabase.PotPlants.ToList();
                if (value != null)
                {
                    return new { result = value };
                }
                else
                {
                    return new { msg = "ERROR" };
                }

            }
            catch (Exception)
            {

                return new { msg = "ERROR" };
            }

          

        }
        // JOIN 3 TABLEs
        // for enter name of pot want ro search
        [Route("getjoint")]
        [HttpGet]
        public object JoinTable()
        {
            try
            {
                var getresult = from p in dabase.PotPlants
                                join c in dabase.PotCategories on p.PotCategory equals c.Id
                                join s in dabase.PotSizes  on p.PotPrice equals s.Id
                                select new { p.Id, p.PotName,c.Kind, s.Size};
                return new { status = 200, msg = "Success", data = getresult.ToList() };
            }
            catch (Exception e)
            {

                return new { status = 404, msg = "Error" + e.InnerException };
            }


        }




        // POST: api/PotPlants



        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                dabase.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PotPlantExists(int id)
        {
            return dabase.PotPlants.Count(e => e.Id == id) > 0;
        }
    }
}