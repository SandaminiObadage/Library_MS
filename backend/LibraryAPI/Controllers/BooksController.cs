using LibraryAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryAPI.Data;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class BooksController : ControllerBase
{
    private readonly AppDbContext _context;

    public BooksController(AppDbContext context)
    {
        _context = context;
    }

    private int GetCurrentUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
        {
            throw new UnauthorizedAccessException("Invalid user token");
        }
        return userId;
    }

    [HttpGet]
    public async Task<IActionResult> GetBooks()
    {
        var userId = GetCurrentUserId();
        var books = await _context.Books.Where(b => b.UserId == userId).ToListAsync();
        return Ok(books);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetBook(int id)
    {
        var userId = GetCurrentUserId();
        var book = await _context.Books.FirstOrDefaultAsync(b => b.Id == id && b.UserId == userId);
        
        if (book == null)
        {
            return NotFound();
        }

        return Ok(book);
    }

    [HttpPost]
    public async Task<IActionResult> CreateBook(CreateBookDto bookDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var userId = GetCurrentUserId();

        // Create book entity from DTO
        var book = new Book
        {
            Title = bookDto.Title,
            Author = bookDto.Author,
            Description = bookDto.Description,
            UserId = userId // Always use the authenticated user's ID
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

        var userId = GetCurrentUserId();
        
        var existingBook = await _context.Books.FirstOrDefaultAsync(b => b.Id == id && b.UserId == userId);
        if (existingBook == null)
        {
            return NotFound();
        }

        // Update book properties
        existingBook.Title = bookDto.Title;
        existingBook.Author = bookDto.Author;
        existingBook.Description = bookDto.Description;
        // UserId remains the same (current user)

        _context.Entry(existingBook).State = EntityState.Modified;
        
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await _context.Books.AnyAsync(e => e.Id == id && e.UserId == userId))
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
        var userId = GetCurrentUserId();
        var book = await _context.Books.FirstOrDefaultAsync(b => b.Id == id && b.UserId == userId);
        
        if (book == null) 
        {
            return NotFound();
        }
        
        _context.Books.Remove(book);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
