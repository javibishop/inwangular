using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebAPITest.Models
{
  public class Usuario
  {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("Name")]
    public string Nombre { get; set; }

    public string Apellido { get; set; }

    public int Edad { get; set; }

    public string CodRecurso { get; set; }

    public string Cargo { get; set; }

    public string nombreUsuario { get; set; }

    public string password { get; set; }
      
    public IEnumerable<ConocimientoUsuario> Conocimientos { get; set; }

    public bool Administrador { get; set; }

  }
}
