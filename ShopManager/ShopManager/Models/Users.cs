using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopManager.Models
{
    public class Users
    {
        public int id { get; set; }
        public int companyId { get; set; }
        public bool isManager { get; set; }
        public bool isEmployee { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string companyEmail { get; set; }
        public string username { get; set; }
        public string password { get; set; }

    }
}
