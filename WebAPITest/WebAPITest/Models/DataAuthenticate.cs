using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebAPITest.Models
{
  public class DataAuthenticate
  {
    public string nombreUsuario { get; set; }

    public string password { get; set; }
      
  }
}
