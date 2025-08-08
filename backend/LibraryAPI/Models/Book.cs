namespace LibraryAPI.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Author { get; set; }

        //foreign key of user
        public int UserId { get; set; }
        public User User { get; set; }

    }
}
