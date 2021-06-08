using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShopManager.Models;
using Microsoft.Data.SqlClient;
using Dapper;


namespace ShopManager.DataAccess
{
    public class UserRepo
    {
        const string ConnectionString = "Server=localhost;Database=ShopManager;Trusted_Connection=True;";

        //Gets all users
        public List<User> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT *
                        FROM [Users]";

            var results = db.Query<User>(sql).ToList();
            return results;
        }

        //Gets a single user
        public User Get(int id)
        {
            var sql = @"SELECT *
                        FROM [Users]
                        WHERE id = @id";

            using var db = new SqlConnection(ConnectionString);

            var singleUser = db.QueryFirstOrDefault<User>(sql, new { id = id });

            return singleUser;
        }

        //Gets users by companyId
        public List<User> GetByCompanyId(int companyId)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT *
                        FROM [Users]
                        WHERE companyId = @companyId";

            
            var results = db.Query<User>(sql, new { companyId = companyId }).ToList();

            return results;
        }

        //Adds a user
        public void Add(User user)
        {
            var sql = @"INSERT INTO [dbo].[Users] ([companyId], [isManager], [isEmployee], [firstName], [lastName], [companyEmail], [username], [password])
            OUTPUT inserted.id
            VALUES(@companyId, @isManager, @isEmployee, @firstName, @lastName, @companyEmail, @username, @password)";

            using var db = new SqlConnection(ConnectionString);

            var id = db.ExecuteScalar<int>(sql, user);

            user.id = id;
        }

        //Removes a user
        public void Remove(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"UPDATE [Parts]
                        SET userId = NULL
                        WHERE userId = @id
                        DELETE
                        FROM [Tools]
                        WHERE userId = @id
                        DELETE
                        FROM [Users]
                        WHERE id = @id
                        ";

            db.Execute(sql, new { id });
        }

        //updates a user
        public void Update(User user)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"UPDATE [Users]
                        SET companyId = @companyId,
                            isManager = @isManager,
	                        isEmployee = @isEmployee,
	                        firstName = @firstName,
	                        lastName = @lastName,
                            companyEmail = @companyEmail,
	                        username = @username,
                            password = @password
                        WHERE id = @id";

            db.Execute(sql, user);
        }
    }
}
