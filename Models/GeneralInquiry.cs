using System.ComponentModel.DataAnnotations;

namespace OxygenSolutions.Models;

public class GeneralInquiry
{
    [Required] public string FirstName { get; set; } = "";
    [Required] public string LastName { get; set; } = "";
    public string CompanyName { get; set; } = "";
    [Required, EmailAddress] public string Email { get; set; } = "";
    public string Phone { get; set; } = "";
    [Required] public string Subject { get; set; } = "";
    [Required] public string Message { get; set; } = "";
}
