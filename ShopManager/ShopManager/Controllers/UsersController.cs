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
    [Route("api/Users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        UserRepository _repo;
        public UsersController()
        {
            _repo = new UserRepository();
        }

        //Get to api/Users
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            return Ok(_repo.GetAll());
        }

        //GET to /api/Users/{id}
        //GET to /api/Users/4
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user = _repo.Get(id);
            if (user == null)
            {
                return NotFound("This user id does not exist");
            }
            return Ok(user);
        }

        //POST to /api/Users
        [HttpPost]
        public IActionResult AddAUser(Users user)
        {
            _repo.Add(user);
            return Created($"api/Users/{user.id}", user);
        }

        //DELETE to /api/Users/{userId}
        [HttpDelete("{userId}")]
        public IActionResult DeleteUser(int userId)
        {
            _repo.Remove(userId);
            return Ok();
        }

        //PUT to /api/User/{id}/update
        [HttpPut("{id}/update")]
        public IActionResult UpdateUser(int id, Users userObj)
        {
            var user = _repo.Get(id);

            user.companyId = userObj.companyId;
            user.isManager = userObj.isManager;
            user.isEmployee = userObj.isEmployee;
            user.firstName = userObj.firstName;
            user.lastName = userObj.lastName;
            user.companyEmail = userObj.companyEmail;
            user.username = userObj.username;
            user.password = userObj.password;

            _repo.Update(user);
            return NoContent();
        }
    }
}
