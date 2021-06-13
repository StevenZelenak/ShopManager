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
    [Route("api/Jobs")]
    [ApiController]
    public class JobsController : ControllerBase
    {
        JobRepo _repo;
        public JobsController()
        {
            _repo = new JobRepo();
        }

        //Get to api/Jobs
        [HttpGet]
        public IActionResult GetAllJobs()
        {
            return Ok(_repo.GetAll());
        }

        //GET to /api/Jobs/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var job = _repo.Get(id);
            if (job == null)
            {
                return NotFound("This job id does not exist");
            }
            return Ok(job);
        }

        //GET to /api/Users/{companyId}
        [HttpGet("company_jobs/{companyId}")]
        public IActionResult GetAllJobsByCompanyId(int companyId)
        {
            var user = _repo.GetByCompanyId(companyId);
            if (user == null)
            {
                return NotFound("These users id does not exist");
            }
            return Ok(user);
        }

        //POST to /api/Jobs
        [HttpPost]
        public IActionResult AddAJob(Job job)
        {
            _repo.Add(job);
            return Created($"api/Jobs/{job.id}", job);
        }

        //DELETE to /api/Jobs/{jobId}
        [HttpDelete("{jobId}")]
        public IActionResult DeleteJob(int jobId)
        {
            _repo.Remove(jobId);
            return Ok();
        }

        //PUT to /api/Job/{id}/update
        [HttpPut("{id}/update")]
        public IActionResult UpdateJob(int id, Job jobObj)
        {
            var job = _repo.Get(id);

            job.companyId = jobObj.companyId;
            job.jobName = jobObj.jobName;
            job.customer = jobObj.customer;
            job.dateRec = jobObj.dateRec;
            job.dateDue = jobObj.dateDue;
            job.dateFinished = jobObj.dateFinished;
            job.budget = jobObj.budget;
            job.isComplete = jobObj.isComplete;

            _repo.Update(job);
            return NoContent();
        }
    }
}
