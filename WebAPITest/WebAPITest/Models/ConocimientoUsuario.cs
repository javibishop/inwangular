using System.Collections;

namespace WebAPITest.Models
{
  public class ConocimientoUsuario
  {
    public Conocimiento Conocimiento { get; set; }

    public Niveles Nivel { get; set; }

  }

  public enum Niveles
  {
    inicial = 1,
    satisfactorio,
    intermedio,
    avanzado,
    experto
  }

}
