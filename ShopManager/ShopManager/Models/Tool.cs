using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopManager.Models
{
    public class Tool
    {
        public int id { get; set; }
        public int userId { get; set; }
        public string toolName { get; set; }
        public string toolType { get; set; }
        public int slotNumber { get; set; }
    }
}
