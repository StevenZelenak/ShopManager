using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShopManager.Models;
using ShopManager.DataAccess;

namespace ShopManager.Controllers
{
    [Route("api/Parts")]
    [ApiController]
    public class PartsController : ControllerBase
    {
        PartRepo _repo;
        public PartsController()
        {
            _repo = new PartRepo();
        }

        //Get to api/Parts
        [HttpGet]
        public IActionResult GetAllParts()
        {
            return Ok(_repo.GetAll());
        }

        //GET to /api/Parts/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var part = _repo.Get(id);
            if (part == null)
            {
                return NotFound("This part id does not exist");
            }
            return Ok(part);
        }

        //GET to /api/company_parts/{jobId}
        [HttpGet("company_parts/{jobId}")]
        public IActionResult GetAllPartsByJobId(int jobId)
        {
            var part = _repo.GetByJobId(jobId);
            if (part == null)
            {
                return NotFound("These users id does not exist");
            }
            return Ok(part);
        }


        //POST to /api/Parts
        [HttpPost]
        public IActionResult AddAPart(Part part)
        {
            _repo.Add(part);
            return Created($"api/Parts/{part.id}", part);
        }

        //DELETE to /api/Parts/{partId}
        [HttpDelete("{partId}")]
        public IActionResult DeletePart(int partId)
        {
            _repo.Remove(partId);
            return Ok();
        }

        //PUT to /api/Part/{id}/update
        [HttpPut("{id}/update")]
        public IActionResult UpdatePart(int id, Part partObj)
        {
            var part = _repo.Get(id);

            part.jobId = partObj.jobId;
            part.partName = partObj.partName;
            part.materialType = partObj.materialType;
            part.MaterialFinish = partObj.MaterialFinish;
            part.sizeLength = partObj.sizeLength;
            part.sizeWidth = partObj.sizeWidth;
            part.sizeHeight = partObj.sizeHeight;
            part.price = partObj.price;
            part.userId = partObj.userId;
            part.isComplete = partObj.isComplete;
            part.dateStart = partObj.dateStart;
            part.dateEnd = partObj.dateEnd;

            _repo.Update(part);
            return NoContent();
        }

        //PUT to /api/Part/{id}/update
        [HttpPut("{id}/update_user")]
        public IActionResult UpdatePartUser(int id, Part partObj)
        {
            var part = _repo.Get(id);

            part.userId = partObj.userId;

            _repo.UpdateUserIdPart(part);
            return NoContent();
        }
    }
}
