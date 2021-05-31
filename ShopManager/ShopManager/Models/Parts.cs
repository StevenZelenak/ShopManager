using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopManager.Models
{
    public class Parts
    {
        public int Id { get; set; }
        public int jobId { get; set; }
        public string partName { get; set; }
        public string materialType { get; set; }
        public string materialFinish { get; set; }
        public double sizeLength { get; set; }
        public double sizeWidth { get; set; }
        public double sizeHeight { get; set; }
        public double price { get; set; }
        public int userId { get; set; }
        public bool isComplete { get; set; }
        public DateTime startTime { get; set; }
        public DateTime endTime { get; set; }
    }
}
