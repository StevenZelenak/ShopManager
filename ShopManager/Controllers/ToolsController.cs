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
    [Route("api/Tools")]
    [ApiController]
    public class ToolsController : ControllerBase
    {
        ToolRepo _repo;
        public ToolsController()
        {
            _repo = new ToolRepo();
        }

        //Get to api/Tools
        [HttpGet]
        public IActionResult GetAllTools()
        {
            return Ok(_repo.GetAll());
        }

        //GET to /api/Tools/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var tool = _repo.Get(id);
            if (tool == null)
            {
                return NotFound("This tool id does not exist");
            }
            return Ok(tool);
        }

        //POST to /api/Tools
        [HttpPost]
        public IActionResult AddATool(Tool tool)
        {
            _repo.Add(tool);
            return Created($"api/Tools/{tool.id}", tool);
        }

        //DELETE to /api/Tools/{toolId}
        [HttpDelete("{toolId}")]
        public IActionResult DeleteTool(int toolId)
        {
            _repo.Remove(toolId);
            return Ok();
        }

        //PUT to /api/Tool/{id}/update
        [HttpPut("{id}/update")]
        public IActionResult UpdateTool(int id, Tool toolObj)
        {
            var tool = _repo.Get(id);

            tool.userId = toolObj.userId;
            tool.toolName = toolObj.toolName;
            tool.toolType = toolObj.toolType;
            tool.slotNumber = toolObj.slotNumber;

            _repo.Update(tool);
            return NoContent();
        }
    }
}
