using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopManager.Models
{
    public class Part
    {
        public int id { get; set; }
        public int jobId { get; set; }
        public string partName { get; set; }
        public string materialType { get; set; }
        public string MaterialFinish { get; set; }
        public int sizeLength { get; set; }
        public int sizeWidth { get; set; }
        public int sizeHeight { get; set; }
        public int price { get; set; }
        public int? userId { get; set; }
        public bool isComplete { get; set; }
        public string dateStart { get; set; }
        public string dateEnd { get; set; }
       
    }
}
