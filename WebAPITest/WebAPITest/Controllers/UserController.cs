using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
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
    /* En este caso, tengo que indicar el parametro en el verbo, por ej: [HttpGet("{id}")]. El nombre del metodo no importa, solo hay que tener en cuenta el
     * verbo y la ruta.
     */
    // GET: api/User/5
    [HttpGet("{id}")]
    public Usuario GetUsuario(string id)
    {
      return this._userService.Get(id);
    }
    /*Si, uso Route, los verbos van solo el nombre, por ej: [HttpGet] y los parametros se matchean con lo que esta en la ruta. Por ej:
     * [Route("knowledges/{idusuario}")] => el metodo deberia ser por ej: IEnumerable<ConocimientoUsuario> getConocimientos(string idusuario)
     */

    [Route("knowledges/{idusuario}")]
    [HttpGet]
    public IEnumerable<ConocimientoUsuario> getConocimientos(string idusuario)
    {
      return _userService.getConocimientos(idusuario);
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
    [Route("addKnowledge/{id}")]
    [HttpPost]
    public void AddKnowledge(string id, [FromBody] ConocimientoUsuario conocimiento)
    {
      Usuario user = this._userService.Get(id);

      if(user.Conocimientos == null)
      {
        user.Conocimientos = new List<ConocimientoUsuario>() as IEnumerable<ConocimientoUsuario>;
      }
      user.Conocimientos = user.Conocimientos.Append<ConocimientoUsuario>(conocimiento);
      _userService.Update(id, user);
    }

   [Route("addKnowledge/{id}")]
    [HttpPut]
    public void Put(string id, [FromBody] ConocimientoUsuario conocimiento)
    {
      Usuario user = this._userService.Get(id);

      if(user.Conocimientos == null)
      {
        user.Conocimientos = new List<ConocimientoUsuario>() as IEnumerable<ConocimientoUsuario>;
      }
      user.Conocimientos = user.Conocimientos.Append<ConocimientoUsuario>(conocimiento);
      _userService.Update(id, user);
    }

    // PUT: api/User/5
    [Route("removeKnowledge/{id}")]
    [HttpPut]
    public void DeleteConocimiento(string id, [FromBody] ConocimientoUsuario conocimiento)
    {
      Usuario user = this._userService.Get(id);

      var aux = user.Conocimientos.Where<ConocimientoUsuario>( x => x.Conocimiento.Nombre != conocimiento.Conocimiento.Nombre).ToList();
      user.Conocimientos = aux as IEnumerable<ConocimientoUsuario>;
      _userService.Update(id, user);
    }

    // PUT: api/User/5
    [Route("editKnowledge/{id}")]
    [HttpPut]
    public void EditConocimiento(string id, [FromBody] ConocimientoUsuario conocimiento)
    {
      Usuario user = this._userService.Get(id);

      var aux = user.Conocimientos.ToList();
      aux.Find(x => x.Conocimiento.Nombre == conocimiento.Conocimiento.Nombre).Nivel = conocimiento.Nivel;

      user.Conocimientos = aux as IEnumerable<ConocimientoUsuario>;
      _userService.Update(id, user);
    }
  }
}
