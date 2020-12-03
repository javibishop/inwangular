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
      Usuario newUser = _userService.Create(value);
      return Ok(newUser);
    }

    // PUT: api/User/5
    [HttpPut("{id}")]
    public void Put(string id, [FromBody] Usuario value)
    {
      _userService.Update(id, value);
    }     

    // DELETE: api/ApiWithActions/5
    [HttpDelete("{id}")]
    public void Delete(string id)
    {
      Usuario deletuser = _userService.Get(id);
      _userService.Remove(deletuser);
    }

    [HttpPost ("authenticate")]
    public Usuario Authentication([FromBody] DataAuthenticate objUser)
    {
      return _userService.Authentication(objUser.nombreUsuario, objUser.password);
    }

    // PUT: api/User/5
    [HttpPut("deleteConocimiento/{id}", Name = "DeleteConocimiento")]
    public void DeleteConocimiento(string id, [FromBody] Usuario value)
    {
      _userService.Update(id, value);
    }

    //[HttpGet("{id}", Name = "getConocimientos")]
    //public IEnumerable<ConocimientoUsuario> getConocimientos(string id)
    //{
    //  return _userService.getConocimientos(id);
    //}

    //[Route("user/{id}/conocimientos")]
    //[HttpGet]
    //public IEnumerable<ConocimientoUsuario> getConocimientosUsuario(string id) {
    //  return _userService.getConocimientos(id);
    //}

    [Route("knowledges/{id}")]
    [HttpGet]
    public IEnumerable<ConocimientoUsuario> getConocimientos(string id)
    {
      return _userService.getConocimientos(id);
    }
  }

  //public class ResponseStatus {​​public string Status {​​ get; set; }​​ public string Message {​​ get; set; }​​}

}
