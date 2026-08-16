using OxygenSolutions.Models;

namespace OxygenSolutions.Data;

public static class ProductData
{
    public static readonly List<Product> Products = new()
    {
        new Product
        {
            Id          = "hv500",
            Sku         = "OS-HV500",
            Name        = "OxySpace HV500EV-50SCFH",
            Category    = "Systems",
            ImageFile   = "hv500ev.jpg",
            Stock       = "Made to order",
            LeadTime    = "Build 4–6 weeks",
            Tag         = "Whole home",
            Variants    = new List<string> { "Black", "Gray" },
            Description = "OxySpace Double Module-50SCFH. High-volume oxygen generator for whole-home enrichment at extreme elevations.",
            Features    = new List<string>
            {
                "50 SCFH output",
                "Dual-module design",
                "Available in Black or Gray"
            }
        },
        new Product
        {
            Id          = "hv250",
            Sku         = "OS-HV250",
            Name        = "OxySpace HV250EV",
            Category    = "Systems",
            ImageFile   = "units-catalog.png",
            Stock       = "In stock",
            LeadTime    = "Ships 3–5 days",
            Tag         = "Best seller",
            Description = "Compact single-module oxygen generator.",
            Features    = new List<string>
            {
                "25 SCFH output",
                "Single-module",
                "Wall-mount ready"
            }
        },
        new Product
        {
            Id          = "hv250double",
            Sku         = "OS-HV250D",
            Name        = "OxySpace Single Module, Double Enclosure HV250EV",
            Category    = "Systems",
            ImageFile   = "units-catalog.png",
            Stock       = "Made to order",
            LeadTime    = "Build 4–6 weeks",
            Tag         = "Expandable"
        },
        new Product
        {
            Id        = "appcontrols",
            Sku       = "OS-APPCT",
            Name      = "Ambient Oxygen Room/Zone Controls (App Access)",
            Category  = "Controls",
            ImageFile = "zone-control.jpg",
            Stock     = "In stock",
            LeadTime  = "Ships 3–5 days",
            Tag       = ""
        },
        new Product
        {
            Id        = "headset",
            Sku       = "OS-HDSET",
            Name      = "Headset Switching System",
            Category  = "Controls",
            ImageFile = "units-catalog.png",
            Stock     = "In stock",
            LeadTime  = "Ships 3–5 days",
            Tag       = ""
        },
        new Product
        {
            Id        = "timercontrols",
            Sku       = "OS-TIMER",
            Name      = "Ambient Oxygen Room/Zone Timer Controls",
            Category  = "Controls",
            ImageFile = "neumatic-timer.jpg",
            Stock     = "In stock",
            LeadTime  = "Ships 3–5 days",
            Tag       = ""
        },
        new Product
        {
            Id        = "module",
            Sku       = "OS-MODUL",
            Name      = "OxySpace Module",
            Category  = "Components",
            ImageFile = "oxyspace-module.jpg",
            Stock     = "In stock",
            LeadTime  = "Ships 3–5 days",
            Tag       = ""
        },
        new Product
        {
            Id        = "duraline",
            Sku       = "OS-DURAL",
            Name      = "DuraLine Custom Shielded 1000' Roll",
            Category  = "Components",
            ImageFile = "medical-tubing.jpg",
            Stock     = "In stock",
            LeadTime  = "Ships 3–5 days",
            Tag       = ""
        },
        new Product
        {
            Id        = "timer",
            Sku       = "OS-NAMBT",
            Name      = "Neumatic Ambient Timer",
            Category  = "Components",
            ImageFile = "neumatic-timer.jpg",
            Stock     = "In stock",
            LeadTime  = "Ships 3–5 days",
            Tag       = ""
        },
        new Product
        {
            Id        = "relay",
            Sku       = "OS-RELAY",
            Name      = "12v Relay Cube and Base",
            Category  = "Components",
            ImageFile = "relay-base.jpg",
            Stock     = "In stock",
            LeadTime  = "Ships 3–5 days",
            Tag       = ""
        },
        new Product
        {
            Id        = "fan",
            Sku       = "OS-FAN",
            Name      = "OxySpace Enclosure Intake/Exhaust Fan",
            Category  = "Components",
            ImageFile = "enclosure-fan.jpg",
            Stock     = "In stock",
            LeadTime  = "Ships 3–5 days",
            Tag       = "Service part"
        },
        new Product
        {
            Id        = "filter",
            Sku       = "OS-FILTR",
            Name      = "Module Air Intake Replacement Filter",
            Category  = "Consumables",
            ImageFile = "intake-filter.jpg",
            Stock     = "In stock",
            LeadTime  = "Ships 3–5 days",
            Tag       = "Service part"
        },
        new Product
        {
            Id        = "wye",
            Sku       = "OS-PNWYE",
            Name      = "Pneumatic Wye",
            Category  = "Pneumatics",
            ImageFile = "pneumatic-wye.jpg",
            Stock     = "In stock",
            LeadTime  = "Ships 3–5 days",
            Tag       = ""
        },
        new Product
        {
            Id        = "manualvalve",
            Sku       = "OS-MNVAL",
            Name      = "Pneumatic Manual Flow Adjustment Valve",
            Category  = "Pneumatics",
            ImageFile = "manual-valve.jpg",
            Stock     = "In stock",
            LeadTime  = "Ships 3–5 days",
            Tag       = ""
        },
        new Product
        {
            Id        = "coupling",
            Sku       = "OS-CPLNG",
            Name      = "Pneumatic Coupling",
            Category  = "Pneumatics",
            ImageFile = "pneumatic-coupling.jpg",
            Stock     = "In stock",
            LeadTime  = "Ships 3–5 days",
            Tag       = ""
        },
        new Product
        {
            Id        = "elbow",
            Sku       = "OS-ELBOW",
            Name      = "Pneumatic Elbow Fitting",
            Category  = "Pneumatics",
            ImageFile = "elbow-fitting.jpg",
            Stock     = "In stock",
            LeadTime  = "Ships 3–5 days",
            Tag       = ""
        },
        new Product
        {
            Id        = "actuvalve",
            Sku       = "OS-ACVAL",
            Name      = "Pneumatic 12v Actuating Valve",
            Category  = "Pneumatics",
            ImageFile = "actuating-valve.jpg",
            Stock     = "In stock",
            LeadTime  = "Ships 3–5 days",
            Tag       = ""
        }
    };

    public static readonly List<Installer> Installers = new()
    {
        new Installer
        {
            State       = "CA",
            CompanyName = "Oxygen Solutions",
            Email       = "jlausen@oxygen-solutions.net",
            Phone       = "(406)209-4450",
            Website     = ""
        },
        new Installer
        {
            State       = "ID",
            CompanyName = "Energy 1",
            Email       = "adykstra@energy-1.net",
            Phone       = "941-660-5854",
            Website     = "www.energy-1.net"
        },
        new Installer
        {
            State       = "NV",
            CompanyName = "Oxygen Solutions",
            Email       = "jlausen@oxygen-solutions.net",
            Phone       = "(406)209-4450",
            Website     = ""
        },
        new Installer
        {
            State       = "CO",
            CompanyName = "Altitude Solutions",
            Email       = "Sales@altsol.com",
            Phone       = "970-456-4646",
            Website     = "www.altsol.com"
        },
        new Installer
        {
            State       = "MT",
            CompanyName = "Energy 1",
            Email       = "adykstra@energy-1.net",
            Phone       = "941-660-5854",
            Website     = "www.energy-1.net"
        },
        new Installer
        {
            State       = "WY",
            CompanyName = "Energy 1",
            Email       = "adykstra@energy-1.net",
            Phone       = "941-660-5854",
            Website     = "www.energy-1.net"
        }
    };
}
