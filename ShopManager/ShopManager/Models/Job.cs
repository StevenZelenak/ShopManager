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
        public string dateRec { get; set; }
        public string dateDue { get; set; }
        public string dateFinished { get; set; }
        public int budget { get; set; }
        public bool isComplete { get; set; }
    }
}
