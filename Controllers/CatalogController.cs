using Microsoft.AspNetCore.Mvc;
using OxygenSolutions.Data;
using OxygenSolutions.Models;

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

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult ProductQuote([FromForm] ProductQuoteRequest model)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();
            return Json(new { success = false, errors });
        }

        // Phase 1: log to console. Phase 2: send email / save to DB.
        Console.WriteLine($"[Quote] {model.FirstName} {model.LastName} <{model.Email}> — {model.ProductName} x{model.Quantity}");

        return Json(new { success = true });
    }
}
