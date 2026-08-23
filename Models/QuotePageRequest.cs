using System.ComponentModel.DataAnnotations;

namespace OxygenSolutions.Models;

public class QuotePageRequest
{
    // Step 1 — The house
    public string Elevation { get; set; } = "";
    public int Rooms { get; set; } = 1;
    public string Stage { get; set; } = "New build";
    public string Role { get; set; } = "Homeowner";

    // Step 2 — Your details
    [Required] public string Name { get; set; } = "";
    [Required, EmailAddress] public string Email { get; set; } = "";
    public string Phone { get; set; } = "";
    public string Town { get; set; } = "";
    public string Notes { get; set; } = "";
}
