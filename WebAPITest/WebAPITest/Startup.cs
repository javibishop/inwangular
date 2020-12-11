using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using WebAPITest.Models;
using WebAPITest.Services;
using Microsoft.OpenApi.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.Net;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Diagnostics;

namespace WebAPITest
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      // requires using Microsoft.Extensions.Options
      services.Configure<UserDatabaseSettings>(
          Configuration.GetSection(nameof(UserDatabaseSettings)));

      services.AddSingleton<IUserDatabaseSettings>(sp => sp.GetRequiredService<IOptions<UserDatabaseSettings>>().Value);
      services.AddSingleton<UserService>();
      services.AddCors();
      services.AddControllers();

      // https://geeks.ms/jorge/2020/06/01/anadir-swagger-a-una-web-api-con-asp-net-core-3-1/
      AddSwagger(services);
    }

  // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
  public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
  {
      app.UseExceptionHandler(a => a.Run(async context =>
      {
        var exceptionHandlerPathFeature = context.Features.Get<IExceptionHandlerPathFeature>();
        var exception = exceptionHandlerPathFeature.Error;

        string result;

        switch (exception)
        {
          case ValidationException validation:
            context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
            result = JsonConvert.SerializeObject(new { InternalMessage = validation.Message, BusinessMessage = validation.Message });
            break;
          case ArgumentException argument:
            context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
            result = JsonConvert.SerializeObject(new { InternalMessage = argument.Message });
            break;
          //case BusinessException business:
          //  context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
          //  result = JsonConvert.SerializeObject(new { InternalMessage = business.Message, business.BusinessMessage });
          //  break;
          case UnauthorizedAccessException unauthorizedAccess:
            context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
            result = string.Empty;
            break;
          default:
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            result = JsonConvert.SerializeObject(new { InternalMessage = exception.Message });
            break;
        }

        context.Response.ContentType = "application/json";
        await context.Response.WriteAsync(result);
      }));

      if (env.IsDevelopment())
    {
      app.UseDeveloperExceptionPage();
    }

      //app.UseHttpsRedirection();

      app.UseSwagger();
      app.UseSwaggerUI(c =>
      {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API Doc INW test");
      });

      //app.UseMiddleware<GoogleAuthorizeMiddleware>();
      //app.UseMiddleware<FacebookAuthorizeMiddleware>();

      app.UseCors(x =>
    {
      x
      .AllowAnyOrigin()
      .AllowAnyMethod()
      .AllowAnyHeader();
    });
    app.UseRouting();

    //app.UseAuthorization();

    app.UseEndpoints(endpoints =>
    {
      endpoints.MapControllers();
    });
  }

    private void AddSwagger(IServiceCollection services)
    {
      services.AddSwaggerGen(options =>
      {
        var groupName = "v1";

        options.SwaggerDoc(groupName, new OpenApiInfo
        {
          Title = $"Foo {groupName}",
          Version = groupName,
          Description = "Foo API",
          Contact = new OpenApiContact
          {
            Name = "Foo Company",
            Email = string.Empty,
            Url = new Uri("https://foo.com/"),
          }
        });
      });
    }
  }
}
