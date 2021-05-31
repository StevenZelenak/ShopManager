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
        public double sizeLength { get; set; }
        public double sizeWidth { get; set; }
        public double sizeHeight { get; set; }
        public double price { get; set; }
        public int userId { get; set; }
        public DateTime dateStart { get; set; }
        public DateTime dateEnd { get; set; }
    }
}
