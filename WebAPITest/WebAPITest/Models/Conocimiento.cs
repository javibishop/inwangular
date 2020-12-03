using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WebAPITest.Models
{
  public class Conocimiento
  {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("Nombre")]
    public string Nombre { get; set; }

  }
}
