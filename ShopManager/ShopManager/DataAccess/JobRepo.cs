using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShopManager.Models;
using Microsoft.Data.SqlClient;
using Dapper;

namespace ShopManager.DataAccess
{
    public class JobRepo
    {
        const string ConnectionString = "Server=localhost;Database=ShopManager;Trusted_Connection=True;";

        //Gets all jobs
        public List<Job> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT *
                        FROM [Jobs]";

            var results = db.Query<Job>(sql).ToList();
            return results;
        }

        //Gets a single job
        public Job Get(int id)
        {
            var sql = @"SELECT *
                        FROM [Jobs]
                        WHERE id = @id";

            using var db = new SqlConnection(ConnectionString);

            var singleJob = db.QueryFirstOrDefault<Job>(sql, new { id = id });

            return singleJob;
        }

        //Gets jobs by companyId
        public List<Job> GetByCompanyId(int companyId)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT *
                        FROM [Jobs]
                        WHERE companyId = @companyId";


            var results = db.Query<Job>(sql, new { companyId = companyId }).ToList();

            return results;
        }

        //Adds a job
        public void Add(Job job)
        {
            Console.WriteLine(job);
        
            var sql = @"INSERT INTO [dbo].[Jobs] ([companyId], [jobName], [customer], [dateRec], [dateDue], [dateFinished], [budget], [isComplete])
            OUTPUT inserted.id
            VALUES(@companyId, @jobName, @customer, @dateRec, @dateDue, @dateFinished, @budget, @isComplete)";

            using var db = new SqlConnection(ConnectionString);

            var id = db.ExecuteScalar<int>(sql, job);

            job.id = id;
        }

        //Removes a job and the parts related to the job
        public void Remove(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"DELETE
                        FROM [Parts]
                        WHERE jobId = @id
                        DELETE
                        FROM [Jobs]
                        Where id = @id
                        ";

            db.Execute(sql, new { id });
        }

        //updates a job
        public void Update(Job job)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"UPDATE [Jobs]
                        SET companyId = @companyId,
                            jobName = @jobName,
	                        customer = @customer,
	                        dateRec = @dateRec,
	                        dateDue = @dateDue,
                            dateFinished = @dateFinished,
	                        budget = @budget,
                            isComplete = @isComplete
                        WHERE id = @id";

            db.Execute(sql, job);
        }
    }
}
