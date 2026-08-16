using Microsoft.AspNetCore.Mvc;
using OxygenSolutions.Data;
using OxygenSolutions.Models;

namespace OxygenSolutions.Controllers;

public class ContactController : Controller
{
    public IActionResult Index() => View(new QuoteRequest());

    [HttpPost]
    public IActionResult Index(QuoteRequest model)
    {
        if (!ModelState.IsValid) return View(model);
        TempData["Success"] = "Thank you! We'll be in touch within 1–2 business days.";
        return RedirectToAction(nameof(Index));
    }

    public IActionResult FindInstaller()
    {
        ViewBag.Installers = ProductData.Installers;
        return View();
    }

    public IActionResult DesignService() => View(new QuoteRequest { ProjectType = "Builder" });

    [HttpPost]
    public IActionResult DesignService(QuoteRequest model)
    {
        if (!ModelState.IsValid) return View(model);
        TempData["Success"] = "Thanks! Our team will review your plans and respond within 2 business days.";
        return RedirectToAction(nameof(DesignService));
    }
}
