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
    [Route("api/Companies")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        CompanyRepo _repo;
        public CompaniesController()
        {
            _repo = new CompanyRepo();
        }

        //Get to api/Companies
        [HttpGet]
        public IActionResult GetAllCompanies()
        {
            return Ok(_repo.GetAll());
        }

        //Get to api/Companies
        [HttpGet("get_latest_company")]
        public IActionResult GetLastCompany()
        {
            return Ok(_repo.GetLast());
        }

        //GET to /api/Companies/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var company = _repo.Get(id);
            if (company == null)
            {
                return NotFound("This company id does not exist");
            }
            return Ok(company);
        }

        //POST to /api/Companies
        [HttpPost]
        public IActionResult AddACompany(Company company)
        {
            _repo.Add(company);
            return Created($"api/Companies/{company.id}", company);
        }

        //DELETE to /api/Companies/{companyId}
        [HttpDelete("{companyId}")]
        public IActionResult DeleteCompany(int companyId)
        {
            _repo.Remove(companyId);
            return Ok();
        }
    }
}
