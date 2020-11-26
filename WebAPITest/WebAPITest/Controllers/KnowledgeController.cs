using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPITest.Models;
using WebAPITest.Services;

namespace WebAPITest.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class KnowledgeController : ControllerBase
  {
    private readonly UserService _userService;

    public KnowledgeController(UserService userServices)
    {
      this._userService = userServices;
    }

    // GET: api/Knowledge
    [HttpGet]
    public IEnumerable<string> Get()
    {
      return new string[] { "value1", "value2" };
    }

    //[HttpGet("conocimiento/test/{​​​​id}​​​​")]
    //public IEnumerable<ConocimientoUsuario> getConocimientos(string id)
    //{
    //  return _userService.getConocimientos(id);
    //}

    // POST: api/Knowledge
    [HttpPost]
    public void Post([FromBody] string value)
    {
    }

    // PUT: api/Knowledge/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody] string value)
    {
    }

    // DELETE: api/ApiWithActions/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }


  }
}
