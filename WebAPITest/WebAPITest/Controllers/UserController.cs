using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WebAPITest.Models;
using WebAPITest.Services;

namespace WebAPITest.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UserController : ControllerBase
  {

    private readonly UserService _userService;


    public UserController(UserService userServices)
    {
      this._userService = userServices;
      Usuario user = new Usuario { BookName = "test23", Author = "core", Category = "zasa", Price = 23 };

      this._userService.Create(user);

    }


    // GET: api/User
    [HttpGet]
    public IEnumerable<Usuario> Get()
    {
      return _userService.Get();
    }

    // GET: api/User/5
    [HttpGet("{id}", Name = "Get")]
    public Usuario Get(string id)
    {
      return this._userService.Get(id);
    }

    // POST: api/User
    [HttpPost]
    public IActionResult Post([FromBody] Usuario value)
    {
      if (!ModelState.IsValid)
      {
        return StatusCode(StatusCodes.Status406NotAcceptable);
      }
      Usuario newUser = _userService.Create(value);
      return Ok(newUser);
    }

    // PUT: api/User/5
    [HttpPut("{id}")]
    public IActionResult Put(string id, [FromBody] Usuario value)
    {
      try
      {
        _userService.Update(id, value);
        throw new Exception("ROMPI");
      }
      catch (Exception) {
        return StatusCode(StatusCodes.Status404NotFound);
        throw;
      }
     }

    // DELETE: api/ApiWithActions/5
    [HttpDelete("{id}")]
    public void Delete(string id)
    {
      Usuario deletuser = _userService.Get(id);
      _userService.Remove(deletuser);
    }
  }

  //public class ResponseStatus {​​public string Status {​​ get; set; }​​ public string Message {​​ get; set; }​​}

}
