using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPITest.Models;

namespace WebAPITest.Services
{
  public class UserService
  {
    private readonly IMongoCollection<Usuario> _user;

    public UserService(IUserDatabaseSettings settings)
    {
      var client = new MongoClient(settings.ConnectionString);
      var database = client.GetDatabase(settings.DatabaseName);

      _user = database.GetCollection<Usuario>(settings.UserCollectionName);
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

    public Usuario Authentication(string username, string password)
    {
        return _user.Find<Usuario>(usuario => usuario.nombreUsuario == username &&
                                  usuario.password == password).FirstOrDefault();
    }

    public IEnumerable<ConocimientoUsuario> getConocimientos(string id)
    {
      return _user.Find<Usuario>(usuario => usuario.Id == id).FirstOrDefault().Conocimientos;
    }
  }
}
