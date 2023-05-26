
using API.Middleware;
using Core.Identity;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Identity;
using Infrastructure.Repository;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using StackExchange.Redis;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<StoreContext>(option =>
option.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddDbContext<AppIdentityDbContext>(option =>
option.UseSqlite(builder.Configuration.GetConnectionString("IdentityConnection"))
);

builder.Services.AddIdentityCore<AppUser>(opt =>
{

})
    .AddEntityFrameworkStores<AppIdentityDbContext>()
    .AddSignInManager<SignInManager<AppUser>>();

var jwt = builder.Configuration.GetSection("Token");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(
    options=>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt["key"])),
            ValidIssuer = jwt["Issuer"],
            ValidateIssuer =  true,
            ValidateAudience = false

        };
    });



builder.Services.AddAuthorization();

builder.Services.AddScoped<IBasketRepository, BasketRepository>();

builder.Services.AddScoped<IProductRepository, ProductRepository>();
// DB Generic Repository
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
// adding automapper 
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddScoped<ITokenService, TokenService>();

builder.Services.AddScoped<IPaymentService, PaymentService>();

builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();



builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });
    option.ResolveConflictingActions(x => x.First());
    option.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        In = ParameterLocation.Header,
        
        Description = "Please enter a valid token",
       
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                },
                Name ="Bearer",
                In = ParameterLocation.Header,
            },

            new string[]{}
        }
    });
});

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200");
    });
});

// setting up redis
builder.Services.AddSingleton<IConnectionMultiplexer>(c =>
{
    var options = ConfigurationOptions.Parse(builder.Configuration.GetConnectionString("Redis"));
    return ConnectionMultiplexer.Connect(options);
});
    



    
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionMiddleware>();

app.UseStatusCodePagesWithReExecute("/errors/{0}");
app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseRouting();

app.UseAuthorization();

app.MapControllers();

// adding auto migration when running the program + sedding some data
using var scope = app.Services.CreateScope();

var Services = scope.ServiceProvider;


//sedding data

var context  = Services.GetRequiredService<StoreContext>();

var identityContext = Services.GetRequiredService<AppIdentityDbContext>();
var userManger = Services.GetRequiredService<UserManager<AppUser>>();

var Logger = Services.GetRequiredService<ILogger<StoreContext>>();

try
{
    //sedding data

    await context.Database.MigrateAsync();
    await identityContext.Database.MigrateAsync();
    await StoreContextSeed.SeedAsync(context);
    await AppIdentityDbContextSeed.SeedUserAsync(userManger);
}
catch(Exception ex)
{
    Logger.LogError(ex, "Error occured while migration process");
}

app.Run();
