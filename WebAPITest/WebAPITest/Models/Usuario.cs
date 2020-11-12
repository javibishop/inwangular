using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace WebAPITest.Models
{
  public class Usuario
  {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("Name")]
    public string BookName { get; set; }

    [Required]
    public decimal Price { get; set; }

    [StringLength(8, ErrorMessage = "Name length can't be more than 8.")]
    public string Category { get; set; }

    public string Author { get; set; }
  }
}
