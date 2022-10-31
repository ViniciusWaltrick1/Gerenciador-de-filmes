using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrudAngular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilmesController : ControllerBase
    {
        private readonly CrudAngularAppDbContext _context;

        public FilmesController(CrudAngularAppDbContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetFilme()
        {
            return Ok(await _context.filmes.ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> CreateFilme(filmes element)
        {
            await _context.filmes.AddAsync(element);
            await _context.SaveChangesAsync();

            return Created(string.Empty, element);
        }

        [HttpPut]
        public async Task<IActionResult> EditFilme(filmes element)
        {
            if(!_context.filmes.Any(e => e.Id == element.Id))
            {
                return NotFound();
            }

            _context.Entry(element).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(element);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteFilme(int id)
        {
            var dbElement = await _context.filmes.FindAsync(id);

            if (dbElement == null)
            {
                return NotFound("Element not found!");
            }

            _context.filmes.Remove(dbElement);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
