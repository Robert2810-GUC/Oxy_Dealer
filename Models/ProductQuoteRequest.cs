using System.ComponentModel.DataAnnotations;

namespace OxygenSolutions.Models;

public class ProductQuoteRequest
{
    [Required] public string FirstName { get; set; } = "";
    [Required] public string LastName { get; set; } = "";
    public string CompanyName { get; set; } = "";
    [Required, EmailAddress] public string Email { get; set; } = "";
    public string Phone { get; set; } = "";
    [Required] public string ProductName { get; set; } = "";
    public string ProductSku { get; set; } = "";
    public int Quantity { get; set; } = 1;
    public string Message { get; set; } = "";
}
