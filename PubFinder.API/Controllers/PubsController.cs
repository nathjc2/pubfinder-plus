using Microsoft.AspNetCore.Mvc;

namespace PubFinder.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PubsController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            var pubs = new[]
            {
                new { id = 1, name = "The Crown and Anchor", location = "London", isOpen = true, rating = 4.6 },
                new { id = 2, name = "The Old Dog", location = "Manchester", isOpen = false, rating = 4.2 }
            };

            return Ok(pubs);
        }
    }
}
