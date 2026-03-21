using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WaterProject.API.Data;

namespace WaterProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WaterController : ControllerBase
    {
        private WaterDbContext _waterContext;
        public WaterController(WaterDbContext temp)  => _waterContext = temp;
        [HttpGet("AllProjects")]
        public IActionResult GetProjects(int pageSize = 10, int pageNum =1, [FromQuery(Name = "projectTypes")] List<string>? projectTypes = null)
        {
            var query = _waterContext.Projects.AsQueryable();

            if (projectTypes != null && projectTypes.Any())
            {
                query = query.Where(p => projectTypes.Contains(p.ProjectType));
            }

            var respData = query.Skip((pageNum-1) * pageSize).Take(pageSize).ToList();
            var totalNumProjects = query.Count();

            //ProjectListData response = new ProjectListData
            //{
            //    Projects = respData,
            //    TotalNumProjects = totalNumProjects
            //};

            var response = new
            {
                projects = respData,
                totalNumProjects = totalNumProjects
            };

            //return Ok(response);
            return Ok(response);
        }
        [HttpGet("GetProjectTypes")]
        public IActionResult GetProjectTypes()
        {
            var projectTypes = _waterContext.Projects.Select(p => p.ProjectType).Distinct().ToList();

            return Ok(projectTypes);
        }
    }
}
