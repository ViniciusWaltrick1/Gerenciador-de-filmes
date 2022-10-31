using Microsoft.EntityFrameworkCore.Migrations;

namespace CrudAngular.Migrations
{
    public partial class ChangeElement : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Number",
                table: "filmes",
                newName: "posicao");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "posicao",
                table: "filmes",
                newName: "Number");
        }
    }
}
