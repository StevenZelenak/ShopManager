using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopManager.Models
{
    public class Job
    {
        public int id { get; set; }
        public int companyId { get; set; }
        public string jobName { get; set; }
        public string customer { get; set; }
        public DateTime dateRec { get; set; }
        public DateTime dateDue { get; set; }
        public DateTime dateFinished { get; set; }
        public double budget { get; set; }
        public bool isComplete { get; set; }
    }
}
