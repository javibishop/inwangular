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
using WebAPITest.Helpers;

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
      services.Configure<DatabaseSettings>(
          Configuration.GetSection(nameof(DatabaseSettings)));

      services.AddSingleton<IDatabaseSettings>(sp => sp.GetRequiredService<IOptions<DatabaseSettings>>().Value);
      services.AddSingleton<UserService>();
      services.AddSingleton<KnowledgeService>();
      // configure strongly typed settings object
      services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));
      services.AddCors();
      services.AddControllers();

      // https://geeks.ms/jorge/2020/06/01/anadir-swagger-a-una-web-api-con-asp-net-core-3-1/
      AddSwagger(services);
    }

  // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
  public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
  {
    if (env.IsDevelopment())
    {
      app.UseDeveloperExceptionPage();
    }

      //app.UseHttpsRedirection();
      // custom jwt auth middleware
      app.UseMiddleware<JwtMiddleware>();
      app.UseSwagger();
      app.UseSwaggerUI(c =>
      {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API Doc INW test");
      });


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
