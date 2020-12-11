using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPITest.Models
{
  public class AuthenticateResponse
  {
    public string Id { get; set; }
    public string Nombre { get; set; }
    public string Apellido { get; set; }
    public string Username { get; set; }
    public string Token { get; set; }

    public AuthenticateResponse(Usuario user, string token)
    {
      Id = user.Id;
      Nombre = user.Nombre;
      Apellido = user.Apellido;
      Username = user.nombreUsuario;
      Token = token;      
    }    
  }
}
