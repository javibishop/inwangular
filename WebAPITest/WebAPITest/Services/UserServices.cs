using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using MongoDB.Driver;
using System.Linq;
using WebAPITest.Models;
using WebAPITest.Helpers;
using System.Text.Encodings;
using System.Text;
using System.Security.Claims;

namespace WebAPITest.Services
{
  public class UserService
  {
    private readonly IMongoCollection<Usuario> _user;
    private readonly AppSettings _appSettings;

    public UserService(IDatabaseSettings settings, IOptions<AppSettings> appSettings)
    {
      var client = new MongoClient(settings.ConnectionString);
      var database = client.GetDatabase(settings.DatabaseName);            
      _appSettings = appSettings.Value;      
      _user = database.GetCollection<Usuario>("User");
    }

    public List<Usuario> Get() =>
        _user.Find(usuario => true).ToList();

    public Usuario Get(string id) =>
        _user.Find<Usuario>(usario => usario.Id == id).FirstOrDefault();

    public Usuario Create(Usuario usuario)
    {
      try
      {
        _user.InsertOne(usuario);
      }
      catch (Exception e)
      {
        throw new Exception("No se pudo dar de alta el usuario." + e.Message);
      }
      return usuario;
    }

    public void Update(string id, Usuario userIn) =>
        _user.ReplaceOne(user => user.Id == id, userIn);

    public void Remove(Usuario userIn) =>
        _user.DeleteOne(usuario => usuario.Id == userIn.Id);

    public void Remove(string id) =>
        _user.DeleteOne(usuario => usuario.Id == id);

    public AuthenticateResponse Authentication(string username, string password)
    {
        var usr = _user.Find<Usuario>(usuario => usuario.nombreUsuario == username &&
                                  usuario.password == password).FirstOrDefault();
      // return null if user not found
      if (usr == null) return null;

      var token = generateJwtToken(usr);

      return new AuthenticateResponse(usr, token);
    }

    public IEnumerable<ConocimientoUsuario> getConocimientos(string id)
    {
      return _user.Find<Usuario>(usuario => usuario.Id == id).FirstOrDefault().Conocimientos;
    }

    private string generateJwtToken(Usuario user)
    {
      // generate token that is valid for 7 days
      var tokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
        Expires = DateTime.UtcNow.AddDays(7),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
      };
      var token = tokenHandler.CreateToken(tokenDescriptor);
      return tokenHandler.WriteToken(token);
    }
  }
}
