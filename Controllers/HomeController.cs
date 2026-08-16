using Microsoft.AspNetCore.Mvc;
using OxygenSolutions.Data;

namespace OxygenSolutions.Controllers;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        var featured = ProductData.Products.Take(8).ToList();
        ViewBag.Featured = featured;
        ViewBag.ProductCount = ProductData.Products.Count;
        return View();
    }
}
