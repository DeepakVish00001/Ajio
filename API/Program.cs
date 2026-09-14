using API.Middeware;
using Core.Entities;
using Core.Interface;
using Infrastructure.Data;
using Infrastructure.Implementation;
using Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultContect"));
});

builder.Services.AddSingleton<IConnectionMultiplexer>(config =>
{
    var conString = builder.Configuration.GetConnectionString("Redis")
     ?? throw new Exception("Cannot get redis connection string");
    var configuration = ConfigurationOptions.Parse(conString, true);
    return ConnectionMultiplexer.Connect(configuration);
});

builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

builder.Services.AddSingleton<ICartService,CartService>();

builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<AppUser>()
        .AddEntityFrameworkStores<StoreContext>();


builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy
            .AllowAnyHeader()
            .AllowAnyMethod()
            .WithOrigins("http://localhost:4200");
    });
});
var app = builder.Build();

app.UseCors("AllowAngular");
app.UseStaticFiles();
app.UseAuthorization();
app.UseAuthentication();


app.UseMiddleware<ExceptionMiddleware>();
app.MapControllers();

app.MapGroup("api").MapIdentityApi<AppUser>();

try
{
    var scope = app.Services.CreateScope();
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<StoreContext>();
    await context.Database.MigrateAsync();
    await StoreContextSeed.SeedAsync(context);

}
catch (Exception ex)
{
    Console.WriteLine(ex);

}

app.Run();
