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

namespace WebAPITest.Services
{
  public class KnowledgeService
  {

    private readonly IMongoCollection<Conocimiento> _Knowledge;
    private readonly AppSettings _appSettings;

    public KnowledgeService(IDatabaseSettings settings, IOptions<AppSettings> appSettings)
    {
      var client = new MongoClient(settings.ConnectionString);
      var database = client.GetDatabase(settings.DatabaseName);
      _appSettings = appSettings.Value;
      _Knowledge = database.GetCollection<Conocimiento>("Knowledge");
    }

    public List<Conocimiento> Get() =>
        _Knowledge.Find(conocmiento => true).ToList();

    public Conocimiento Get(string id) =>
        _Knowledge.Find<Conocimiento>(conocimiento => conocimiento.Id == id).FirstOrDefault();

    public Conocimiento Create(Conocimiento conocimiento)
    {
      try
      {
        _Knowledge.InsertOne(conocimiento);
      }
      catch (Exception e)
      {
        throw new Exception("No se pudo dar de alta el conocimiento." + e.Message);
      }
      return conocimiento;
    }

    public void Update(string id, Conocimiento conocimientoIn) =>
        _Knowledge.ReplaceOne(conocimiento => conocimiento.Id == id, conocimientoIn);

    public void Remove(Conocimiento userIn) =>
        _Knowledge.DeleteOne(conocimiento => conocimiento.Id == userIn.Id);

    public void Remove(string id) =>
        _Knowledge.DeleteOne(conocimiento => conocimiento.Id == id);
        
  }
}
