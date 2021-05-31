using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShopManager.Models;
using Microsoft.Data.SqlClient;
using Dapper;

namespace ShopManager.DataAccess
{
    public class PartRepo
    {
        const string ConnectionString = "Server=localhost;Database=ShopManager;Trusted_Connection=True;";

        //Gets all parts
        public List<Part> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT *
                        FROM [Parts]";

            var results = db.Query<Part>(sql).ToList();
            return results;
        }

        //Gets a single part
        public Part Get(int id)
        {
            var sql = @"SELECT *
                        FROM [Parts]
                        WHERE id = @id";

            using var db = new SqlConnection(ConnectionString);

            var singlePart = db.QueryFirstOrDefault<Part>(sql, new { id = id });

            return singlePart;
        }

        //Adds a part
        public void Add(Part part)
        {
            Console.WriteLine(part);

            var sql = @"INSERT INTO [dbo].[Parts] ([jobId], [partName], [materialType], [materialFinish], [sizeLength], [sizeWidth], [sizeHeight], [price], [userId], [isComplete], [dateStart], [dateFinish])
            OUTPUT inserted.id
            VALUES(@jobId, @partName, materialType, @materialFinish, @sizeLength, @sizeWidth, @sizeHeight, @price, @userId, @isComplete, @dateStart, @dateFinish)";

            using var db = new SqlConnection(ConnectionString);

            var id = db.ExecuteScalar<int>(sql, part);

            part.id = id;
        }

        //Removes a part and the parts related to the part
        public void Remove(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"DELETE
                        FROM [Parts]
                        WHERE id = @id
                        ";

            db.Execute(sql, new { id });
        }

        //updates a part
        public void Update(Part part)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"UPDATE [Parts]
                        SET jobId = @jobId,
                            partName = @partName,
	                        materialType = @materialType,
	                        materialFinish = @materialFinish,
	                        sizeLength = @sizeLength,
                            sizeWidth = @sizeWidth,
	                        sizeHeight = @sizeHeight,
                            price = @price,
                            userId = @userId,
                            isComplete = @isComplete,
                            dateStart = @dateStart,
                            dateFinish = @dateFinish
                        WHERE id = @id";

            db.Execute(sql, part);
        }
    }
}
