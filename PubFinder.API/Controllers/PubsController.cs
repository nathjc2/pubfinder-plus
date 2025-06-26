using Microsoft.AspNetCore.Mvc;

namespace PubFinder.Server.Controllers
{
    // Tells ASP.NET this class is a Web API controller
    [ApiController]
    // This sets the URL path to access this controller's endpoints: /api/pubs
    [Route("api/[controller]")]
    public class PubsController : ControllerBase
    {
        // A static in-memory list that stores our pub data
        private static List<Pub> pubs = new List<Pub>
        {
            new Pub { Id = 1, Name = "The King's Arms", Location = "London" },
            new Pub { Id = 2, Name = "The Crown", Location = "Oxford" },
            new Pub { Id = 3, Name = "The Red Lion", Location = "Manchester" }
        };

        // Returns the current list of pubs to the client
        [HttpGet]
        public IEnumerable<Pub> Get()
        {
            return pubs;
        }

        // Accepts a new pub from the client and adds it to the list
        [HttpPost]
        public IActionResult Post([FromBody] Pub newPub)
        {
            // Simple validation: reject if either field is missing or empty
            if (string.IsNullOrWhiteSpace(newPub.Name) || string.IsNullOrWhiteSpace(newPub.Location))
            {
                return BadRequest("Name and Location are required.");
            }

            // Assign a new unique ID based on the current max ID
            newPub.Id = pubs.Max(p => p.Id) + 1;

            // Add the new pub to the list
            pubs.Add(newPub);

            // Return a 201 response with the new pub data
            return CreatedAtAction(nameof(Get), new { id = newPub.Id }, newPub);
        }
    }

    // Simple class to define the shape of a Pub object
    public class Pub
    {
        public int Id { get; set; }          // Unique ID
        public string Name { get; set; }     // Name of the pub
        public string Location { get; set; } // City or location of the pub
    }
}
