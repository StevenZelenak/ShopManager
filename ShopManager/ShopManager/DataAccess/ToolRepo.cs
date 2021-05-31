using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShopManager.Models;
using Microsoft.Data.SqlClient;
using Dapper;

namespace ShopManager.DataAccess
{
    public class ToolRepo
    {
        const string ConnectionString = "Server=localhost;Database=ShopManager;Trusted_Connection=True;";

        //Gets all tools
        public List<Tool> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT *
                        FROM [Tools]";

            var results = db.Query<Tool>(sql).ToList();
            return results;
        }

        //Gets a single tool
        public Tool Get(int id)
        {
            var sql = @"SELECT *
                        FROM [Tools]
                        WHERE id = @id";

            using var db = new SqlConnection(ConnectionString);

            var singleTool = db.QueryFirstOrDefault<Tool>(sql, new { id = id });

            return singleTool;
        }

        //Adds a tool
        public void Add(Tool tool)
        {
            Console.WriteLine(tool);

            var sql = @"INSERT INTO [dbo].[Tools] ([userId], [toolName], [toolType], [slotNumber])
            OUTPUT inserted.id
            VALUES(@jobId, @toolName, @toolType, @slotNumber)";

            using var db = new SqlConnection(ConnectionString);

            var id = db.ExecuteScalar<int>(sql, tool);

            tool.id = id;
        }

        //Removes a tool 
        public void Remove(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"DELETE
                        FROM [Tools]
                        WHERE id = @id
                        ";

            db.Execute(sql, new { id });
        }

        //updates a tool
        public void Update(Tool tool)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"UPDATE [Tools]
                        SET userId = @userId,
                            toolName = @toolName,
	                        toolType = @toolType,
	                        slotNumber = @slotNumber
                        WHERE id = @id";

            db.Execute(sql, tool);
        }
    }
}
