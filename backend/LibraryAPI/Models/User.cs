using System.ComponentModel.DataAnnotations;
namespace LibraryAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Username { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string PasswordHash { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        //Naviagation properties
        public ICollection<Book> Books { get; set; } = new List<Book>();
    }
}
