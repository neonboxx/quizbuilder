namespace QuizBuilder.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddQuizzes : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.QuizItems",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        quizTitle = c.String(),
                        serializedQuiz = c.String(),
                        User_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.id)
                .ForeignKey("dbo.AspNetUsers", t => t.User_Id)
                .Index(t => t.User_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.QuizItems", "User_Id", "dbo.AspNetUsers");
            DropIndex("dbo.QuizItems", new[] { "User_Id" });
            DropTable("dbo.QuizItems");
        }
    }
}
