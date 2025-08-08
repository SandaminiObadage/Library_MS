using System.ComponentModel.DataAnnotations;

namespace LibraryAPI.Models
{
    public class CreateBookDto
    {
        [Required(ErrorMessage = "Title is required")]
        public string Title { get; set; }
        
        [Required(ErrorMessage = "Author is required")]
        public string Author { get; set; }
        
        [Required(ErrorMessage = "Description is required")]
        public string Description { get; set; }
        
        [Required(ErrorMessage = "User ID is required")]
        public int UserId { get; set; }
    }
}
