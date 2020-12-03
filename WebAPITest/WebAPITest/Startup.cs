using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using WebAPITest.Models;
using WebAPITest.Services;

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
    }

  // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
  public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
  {
    if (env.IsDevelopment())
    {
      app.UseDeveloperExceptionPage();
    }

    //app.UseHttpsRedirection();


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
}
}
