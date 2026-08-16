using Microsoft.AspNetCore.Mvc;
using OxygenSolutions.Data;

namespace OxygenSolutions.Controllers;

public class CatalogController : Controller
{
    public IActionResult Index(string? category = null)
    {
        var products = string.IsNullOrEmpty(category)
            ? ProductData.Products
            : ProductData.Products.Where(p => p.Category == category).ToList();
        ViewBag.Categories = ProductData.Products.Select(p => p.Category).Distinct().ToList();
        ViewBag.ActiveCategory = category;
        ViewBag.ProductCount = ProductData.Products.Count;
        return View(products);
    }

    public IActionResult Detail(string id)
    {
        var product = ProductData.Products.FirstOrDefault(p => p.Id == id);
        if (product == null) return NotFound();
        ViewBag.Related = ProductData.Products.Where(p => p.Category == product.Category && p.Id != id).Take(3).ToList();
        return View(product);
    }
}
