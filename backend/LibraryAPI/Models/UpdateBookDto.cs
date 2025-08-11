using System.ComponentModel.DataAnnotations;

namespace LibraryAPI.Models
{
    public class UpdateBookDto
    {
        [Required(ErrorMessage = "Title is required")]
        public string Title { get; set; }
        
        [Required(ErrorMessage = "Author is required")]
        public string Author { get; set; }
        
        [Required(ErrorMessage = "Description is required")]
        public string Description { get; set; }
    }
}
