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
        const string ConnectionString = "Server=localhost;Database=DiaperJungle;Trusted_Connection=True;";

        //Gets all users
        public List<User> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT *
                        FROM [User]";

            var results = db.Query<User>(sql).ToList();
            return results;
        }

        //Gets a single user
        public User Get(int id)
        {
            var sql = @"SELECT *
                        FROM [User]
                        WHERE id = @id";

            using var db = new SqlConnection(ConnectionString);

            var singleUser = db.QueryFirstOrDefault<User>(sql, new { id = id });

            return singleUser;
        }

        //Adds a user
        public void Add(User user)
        {
            var sql = @"INSERT INTO [dbo].[User] ([companyId], [isManager], [isEmployee], [firstName], [lastName], [companyEmail], [username], [password])
                        OUTPUT inserted.id
                        VALUES(@companyId, @isManager, isEmployee, @firstName, @lastName, @companyEmail, @username, @password)";

            using var db = new SqlConnection(ConnectionString);

            var id = db.ExecuteScalar<int>(sql, user);

            user.id = id;
        }

        //Removes a user
        public void Remove(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"DELETE
                        FROM [User]
                        WHERE id = @id";

            db.Execute(sql, new { id });
        }

        //updates a user
        public void Update(User user)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"UPDATE [User]
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
