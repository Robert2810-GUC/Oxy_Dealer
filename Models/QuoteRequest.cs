using System.ComponentModel.DataAnnotations;

namespace OxygenSolutions.Models;

public class QuoteRequest
{
    [Required] public string Name { get; set; } = "";
    [Required, EmailAddress] public string Email { get; set; } = "";
    public string Phone { get; set; } = "";
    [Required] public string Elevation { get; set; } = "";
    public string Rooms { get; set; } = "";
    public string ProjectType { get; set; } = "Homeowner";
    public string Message { get; set; } = "";
}
