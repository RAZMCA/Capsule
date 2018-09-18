using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Script.Serialization;
using TaskManager.Data.Models;
using TaskManager.Data.Models.Custom;
using TaskManager.Data.Repository;

namespace TaskManager.Business
{
    public class TaskBL
    {
        public List<TaskModel> GetParentTask()
        {
            TaskRepository obj = new TaskRepository();
            var result = obj.GetParentTask();
            return result;
        }
        public List<TaskModel> GetAllTask()
        {
            TaskRepository obj = new TaskRepository();
            var result = obj.GetAllTask();
            return result;
        }
        public List<TaskModel> SearchTask(object taskModel)
        {
            TaskRepository obj = new TaskRepository();
            var result = obj.SearchTask(ModelConverter(taskModel));
            return result;
        }
        public TaskModel GetTaskById(int taskId)
        {
            TaskRepository obj = new TaskRepository();
            var result = obj.GetTaskById(taskId);
            return result;
        }
        public bool AddTask(object taskModel)
        {
            TaskRepository obj = new TaskRepository();
            obj.AddTask(ModelConverter(taskModel));
            return true;
        }
        public bool UpdateTask(object taskModel)
        {
            TaskRepository obj = new TaskRepository();
            obj.UpdateTask(ModelConverter(taskModel));
            return true;
        }
        public bool DeleteTask(int taskId)
        {
            TaskRepository obj = new TaskRepository();
            obj.DeleteTask(taskId);
            return true;
        }

        private TaskModel ModelConverter(object task)
        {
            TaskModel taskModel = new TaskModel();
            try
            {
                taskModel = (TaskModel)task;
                if (taskModel.StartDate != null)
                    taskModel.StartDateString = taskModel.StartDate.ToString();
                if (taskModel.EndDate != null)
                    taskModel.EndDateString = taskModel.EndDate.ToString();
                return taskModel;
            }
            catch
            {
                string details = task.ToString();
                JavaScriptSerializer objJavascript = new JavaScriptSerializer();
                var testModels = objJavascript.DeserializeObject(details);

                if (testModels != null)
                {
                    //Dictionary<string, object> dic = (Dictionary<string, object>)testModels;
                    //foreach (var citem in dic)
                    //{
                    //    if (citem.Value != null && string.IsNullOrEmpty(citem.Value.ToString()))
                    //    {
                    Dictionary<string, object> dic1 = (Dictionary<string, object>)testModels;
                    object value;
                    if (dic1.TryGetValue("Task", out value))
                        taskModel.Task = value.ToString();
                    if (dic1.TryGetValue("ParentTask", out value))
                        taskModel.ParentTask = value.ToString();
                    if (dic1.TryGetValue("Priority", out value))
                        taskModel.Priority = string.IsNullOrWhiteSpace(value.ToString()) ? 0 : Convert.ToInt16(value);
                    if (dic1.TryGetValue("Start_Date", out value))
                        taskModel.StartDateString = value.ToString();
                    if (dic1.TryGetValue("End_Date", out value))
                        taskModel.EndDateString = value.ToString();
                    if (dic1.TryGetValue("TaskId", out value))
                        taskModel.TaskId = string.IsNullOrWhiteSpace(value.ToString()) ? 0 : Convert.ToInt16(value);
                    if (dic1.TryGetValue("PriorityFrom", out value))
                        taskModel.PriorityFrom = string.IsNullOrWhiteSpace(value.ToString()) ? 0 : Convert.ToInt16(value);
                    if (dic1.TryGetValue("PriorityTo", out value))
                        taskModel.PriorityTo = string.IsNullOrWhiteSpace(value.ToString()) ? 0 : Convert.ToInt16(value);

                    return taskModel;
                    //    }
                    //}
                }
            }

            return taskModel;
        }
    }
}
