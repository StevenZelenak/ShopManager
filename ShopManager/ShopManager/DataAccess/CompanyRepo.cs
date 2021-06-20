using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShopManager.Models;
using Microsoft.Data.SqlClient;
using Dapper;

namespace ShopManager.DataAccess
{
    public class CompanyRepo
    {
        const string ConnectionString = "Server=localhost;Database=ShopManager;Trusted_Connection=True;";

        //Gets all companiess
        public List<Company> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT *
                        FROM [Companies]";

            var results = db.Query<Company>(sql).ToList();
            return results;
        }

        //Gets last company
        public Company GetLast()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT TOP 1 * 
                        FROM Companies 
                        ORDER BY ID DESC";

            var singleCompany = db.QueryFirstOrDefault<Company>(sql);
            return singleCompany;
        }

        //Gets a single company
        public Company Get(int id)
        {
            var sql = @"SELECT *
                        FROM [Companies]
                        WHERE id = @id";

            using var db = new SqlConnection(ConnectionString);

            var singleUser = db.QueryFirstOrDefault<Company>(sql, new { id = id });

            return singleUser;
        }

        //Adds a company
        public void Add(Company company)
        {
            
            var sql = @"INSERT INTO [dbo].[Companies] ([companyName])
            OUTPUT inserted.id
            VALUES(@companyName)";

            using var db = new SqlConnection(ConnectionString);

            var id = db.ExecuteScalar<int>(sql, company);

            company.id = id;
        }

        //Removes a company
        public void Remove(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"DELETE
                        FROM [Companies]
                        WHERE id = @id";

            db.Execute(sql, new { id });
        }
    }
}
