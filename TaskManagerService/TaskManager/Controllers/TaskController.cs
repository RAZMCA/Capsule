using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using TaskManager.Business;
using TaskManager.Data.Models;
using TaskManager.Data.Models.Custom;

namespace TaskManager.Controllers
{
    public class TaskController : ApiController
    {
        TaskBL _taskBL;

        [HttpGet]
        public List<TaskModel> GetAllTask()
        {
            _taskBL = new TaskBL();
            var result = _taskBL.GetAllTask();
            return result;
        }
        [HttpGet]
        public TaskModel GetTaskById(int taskId)
        {
            _taskBL = new TaskBL();
            var result = _taskBL.GetTaskById(taskId);
            return result;
        }
        [HttpPost]
        public List<TaskModel> SearchTask(object taskModel)
        {
            _taskBL = new TaskBL();
            var result = _taskBL.SearchTask(taskModel);
            return result;
        }
        [HttpPost]
        public bool AddTask(object taskModel)
        {
            _taskBL = new TaskBL();
            _taskBL.AddTask(taskModel);
            return true;
        }
        [HttpPost]
        public bool UpdateTask(object taskModel)
        {
            _taskBL = new TaskBL();
            _taskBL.UpdateTask(taskModel);
            return true;
        }
        [HttpPost]
        public bool DeleteTask(int taskId)
        {
            _taskBL = new TaskBL();
            _taskBL.DeleteTask(taskId);
            return true;
        }

       
    }
}
