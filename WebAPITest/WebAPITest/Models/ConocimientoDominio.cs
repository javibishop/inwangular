using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WebAPITest.Models
{
  public class ConocimientoDominio
  {
    [BsonElement("Nombre")]
    public string Nombre { get; set; }

    [BsonElement("Descripcion")]
    public string Descripcion { get; set; }

    [BsonElement("Sistema")]
    public string Sistema { get; set; }

    [BsonElement("Pasos")]
    public string Pasos { get; set; }

  }
}
