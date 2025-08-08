using LibraryAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryAPI.Data;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly AppDbContext _context;

    public BooksController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetBooks() => Ok(await _context.Books.ToListAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetBook(int id)
    {
        var book = await _context.Books.FindAsync(id);
        if (book == null) return NotFound();
        return Ok(book);
    }

    [HttpPost]
    public async Task<IActionResult> CreateBook(CreateBookDto bookDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Check if user exists
        var userExists = await _context.Users.AnyAsync(u => u.Id == bookDto.UserId);
        if (!userExists)
        {
            return BadRequest("Invalid user ID");
        }

        // Create book entity from DTO
        var book = new Book
        {
            Title = bookDto.Title,
            Author = bookDto.Author,
            Description = bookDto.Description,
            UserId = bookDto.UserId
        };

        _context.Books.Add(book);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBook(int id, UpdateBookDto bookDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var existingBook = await _context.Books.FindAsync(id);
        if (existingBook == null)
        {
            return NotFound();
        }

        // Check if user exists
        var userExists = await _context.Users.AnyAsync(u => u.Id == bookDto.UserId);
        if (!userExists)
        {
            return BadRequest("Invalid user ID");
        }

        // Update book properties
        existingBook.Title = bookDto.Title;
        existingBook.Author = bookDto.Author;
        existingBook.Description = bookDto.Description;
        existingBook.UserId = bookDto.UserId;

        _context.Entry(existingBook).State = EntityState.Modified;
        
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await _context.Books.AnyAsync(e => e.Id == id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBook(int id)
    {
        var book = await _context.Books.FindAsync(id);
        if (book == null) return NotFound();
        _context.Books.Remove(book);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
