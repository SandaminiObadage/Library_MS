﻿
using System.ComponentModel.DataAnnotations;
namespace LibraryAPI.Models
{
    public class RegisterDto
    {
        [Required]
        [StringLength(50)]
        public string Username { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string Password { get; set; }
    }
}
