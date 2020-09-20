using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAppAPIThree.FormModel
{
    // This for POST to pass to the [Route("add")] of ProductsController.cs in Controllers folder
    // C#
    public class ProductModel
    {   // property of functions 
        // as the unique  in a relational database.
        public int Id { get; set; }
        public string name { get; set; }
        public int price { get; set; }

    }
}