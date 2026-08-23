using Microsoft.AspNetCore.Mvc;
using OxygenSolutions.Data;
using OxygenSolutions.Models;

namespace OxygenSolutions.Controllers;

public class ContactController : Controller
{
    public IActionResult Index() => View(new GeneralInquiry());

    [HttpPost]
    public IActionResult Index(GeneralInquiry model)
    {
        if (!ModelState.IsValid) return View(model);
        Console.WriteLine($"[Inquiry] {model.FirstName} {model.LastName} <{model.Email}> — {model.Subject}");
        TempData["Success"] = "Thank you for your message. Our team will get back to you shortly.";
        return RedirectToAction(nameof(Index));
    }

    public IActionResult FindInstaller()
    {
        ViewBag.Installers = ProductData.Installers;
        return View();
    }

    public IActionResult Quote() => View(new QuotePageRequest());

    [HttpPost]
    public IActionResult Quote(QuotePageRequest model)
    {
        if (!ModelState.IsValid) return View(model);
        Console.WriteLine($"[Quote] {model.Name} <{model.Email}> — {model.Rooms} rooms @ {model.Elevation}");
        TempData["QuoteSuccess"] = "true";
        TempData["QuoteName"] = model.Name;
        TempData["QuoteEmail"] = model.Email;
        TempData["QuoteRooms"] = model.Rooms.ToString();
        TempData["QuoteElevation"] = model.Elevation;
        return RedirectToAction(nameof(Quote));
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
