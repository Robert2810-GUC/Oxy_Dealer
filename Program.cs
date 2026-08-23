var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();

app.MapControllerRoute(
    name: "catalog-detail",
    pattern: "equipment/{id}",
    defaults: new { controller = "Catalog", action = "Detail" });

app.MapControllerRoute(
    name: "why",
    pattern: "why",
    defaults: new { controller = "Home", action = "Why" });

app.MapControllerRoute(
    name: "system",
    pattern: "system",
    defaults: new { controller = "Home", action = "TheSystem" });

app.MapControllerRoute(
    name: "quote",
    pattern: "quote",
    defaults: new { controller = "Contact", action = "Quote" });

app.MapControllerRoute(
    name: "find-installer",
    pattern: "find-installer",
    defaults: new { controller = "Contact", action = "FindInstaller" });

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();


app.Run();
