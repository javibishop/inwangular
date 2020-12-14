using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPITest.Models;
using WebAPITest.Services;

namespace WebAPITest.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class KnowledgeController : ControllerBase
  {
    private readonly KnowledgeService _knowledgeService;

    public KnowledgeController(KnowledgeService knowledgeService)
    {
      this._knowledgeService = knowledgeService;
    }


    [HttpGet]
    public IEnumerable<Conocimiento> Get()
    {
      return _knowledgeService.Get();
    }
    [HttpGet("{id}")]
    public Conocimiento GetConocimiento(string id)
    {
      return this._knowledgeService.Get(id);
    }


    [HttpPost]
    public IActionResult Post([FromBody] Conocimiento value)
    {
      Conocimiento newConocimiento = _knowledgeService.Create(value);
      return Ok(newConocimiento);
    }

    [HttpPut("{id}")]
    public void Put(string id, [FromBody] Conocimiento value)
    {
      _knowledgeService.Update(id, value);
    }


    [HttpDelete("{id}")]
    public void Delete(string id)
    {
      Conocimiento deletconocimiento = _knowledgeService.Get(id);
      _knowledgeService.Remove(deletconocimiento);
    }
  }
}
