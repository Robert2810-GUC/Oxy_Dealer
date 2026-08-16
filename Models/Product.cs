namespace OxygenSolutions.Models;

public class Product
{
    public string Id { get; set; } = "";
    public string Sku { get; set; } = "";
    public string Name { get; set; } = "";
    public string Category { get; set; } = "";
    public string Description { get; set; } = "";
    public string ImageFile { get; set; } = "";
    public string Stock { get; set; } = "";
    public string LeadTime { get; set; } = "";
    public string Tag { get; set; } = "";
    public bool RequestQuoteEligible { get; set; } = true;
    public List<string> Variants { get; set; } = new();
    public List<string> Features { get; set; } = new();
}
