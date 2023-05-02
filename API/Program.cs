using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Repository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<StoreContext>(option =>
option.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))
);


builder.Services.AddScoped<IProductRepository, ProductRepository>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// adding auto migration when running the program
using var scope = app.Services.CreateScope();

var Services = scope.ServiceProvider;
 
var context  = Services.GetRequiredService<StoreContext>();

var Logger = Services.GetRequiredService<ILogger<StoreContext>>();

try
{
    await context.Database.MigrateAsync();
}
catch(Exception ex)
{
    Logger.LogError(ex, "Error occured while migration process");
}

app.Run();
