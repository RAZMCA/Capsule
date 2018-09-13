using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
//using System.Threading.Tasks;
using TaskManager.Data.Models;
using TaskManager.Data.Models.Custom;

namespace TaskManager.Data.Repository
{
    public class TaskRepository
    {
        /// <summary>
        /// GetAllTask
        /// </summary>
        /// <returns></returns>
        public List<TaskModel> GetAllTask()
        {
            TaskManagerEntities entity = new TaskManagerEntities();
            var taskE = (from task in entity.Tasks.Include("ParentTask")
                         select new TaskModel()
                         {
                             TaskId = task.Task_Id,
                             Task = task.Task1,
                             ParentTask = task.ParentTask.Parent_Task,
                             Priority = task.Priority,
                             StartDate = task.Start_Date,
                             EndDate = task.End_Date,
                             ParentId = task.ParentTask.Parent_Id,
                         }).ToList();

            if (taskE != null)
            {
                foreach (var item in taskE)
                {
                    if (item.StartDate != null)
                        item.StartDateString = item.StartDate.ToString();
                    if (item.EndDate != null)
                        item.EndDateString = item.EndDate.ToString();
                }
            }
            return taskE;
        }
        public List<TaskModel> SearchTask(TaskModel taskModel)
        {
            TaskManagerEntities entity = new TaskManagerEntities();
            DateTime startDate = DateTime.Now;
            DateTime endDate = DateTime.Now;
            if (!string.IsNullOrEmpty(taskModel.StartDateString))
                startDate = Convert.ToDateTime(taskModel.StartDateString);
            if (!string.IsNullOrEmpty(taskModel.EndDateString))
                endDate = Convert.ToDateTime(taskModel.EndDateString);

            var taskE = (from task in entity.Tasks.Include("ParentTask")                            
                         select new TaskModel()
                         {
                             TaskId = task.Task_Id,
                             Task = task.Task1,
                             ParentTask = task.ParentTask.Parent_Task,
                             Priority = task.Priority,
                             StartDate = task.Start_Date,
                             EndDate = task.End_Date,
                             ParentId = task.ParentTask.Parent_Id,
                         }).ToList();

            List<TaskModel> allTask = taskE;
            if (!string.IsNullOrEmpty(taskModel.Task))
                allTask = allTask.Where(x => x.Task.ToUpper() == taskModel.Task.ToUpper()).ToList();
            if (!string.IsNullOrEmpty(taskModel.ParentTask))
                allTask = allTask.Where(x => x.ParentTask.ToUpper() == taskModel.ParentTask.ToUpper()).ToList();

            int? startPriority = taskModel.PriorityFrom;
            int? endPriority = taskModel.PriorityTo;
            if (taskModel.PriorityFrom != null && taskModel.PriorityTo != null)
                allTask = allTask.Where(x => x.Priority <= endPriority && x.Priority >= startPriority).ToList();
            if (taskModel.PriorityFrom != null && taskModel.PriorityTo == null)
                allTask = allTask.Where(x => x.Priority == startPriority).ToList();
            if (taskModel.PriorityFrom == null && taskModel.PriorityTo != null)
                allTask = allTask.Where(x => x.Priority == endPriority).ToList();

            if (!string.IsNullOrEmpty(taskModel.StartDateString) && !string.IsNullOrEmpty(taskModel.EndDateString))
                allTask = allTask.Where(x => x.StartDate <= endDate && x.EndDate >= startDate).ToList();
            if (!string.IsNullOrEmpty(taskModel.StartDateString) && string.IsNullOrEmpty(taskModel.EndDateString))
                allTask = allTask.Where(x => x.StartDate == startDate).ToList();
            if (string.IsNullOrEmpty(taskModel.StartDateString) && !string.IsNullOrEmpty(taskModel.EndDateString))
                allTask = allTask.Where(x => x.EndDate == endDate).ToList();


            if (allTask != null)
            {
                foreach (var item in allTask)
                {
                    if (item.StartDate != null)
                        item.StartDateString = item.StartDate.ToString();
                    if (item.EndDate != null)
                        item.EndDateString = item.EndDate.ToString();
                }
            }
            return allTask;
        }
        /// <summary>
        /// GetTaskById
        /// </summary>
        /// <param name="taskId"></param>
        /// <returns></returns>

        public TaskModel GetTaskById(int taskId)
        {
            TaskManagerEntities entity = new TaskManagerEntities();
            var taskE = (from task in entity.Tasks.Include("ParentTask")
                         where task.Task_Id == taskId
                         select new TaskModel()
                         {
                             TaskId = task.Task_Id,
                             Task = task.Task1,
                             ParentTask = task.ParentTask.Parent_Task,
                             Priority = task.Priority,
                             StartDate = task.Start_Date,
                             EndDate = task.End_Date,
                             ParentId = task.ParentTask.Parent_Id,
                         }).FirstOrDefault();
            if (taskE != null)
            {
                if (taskE.StartDate != null)
                    taskE.StartDateString = taskE.StartDate.ToString();
                if (taskE.EndDate != null)
                    taskE.EndDateString = taskE.EndDate.ToString();
            }
            return taskE;
        }
        /// <summary>
        /// AddTask
        /// </summary>
        /// <param name="taskModel"></param>
        /// <returns></returns>
        public bool AddTask(TaskModel taskModel)
        {
            TaskManagerEntities entity = new TaskManagerEntities();
            Task addTask = new Task();
            addTask.Task1 = taskModel.Task;
            if (taskModel.StartDateString != null)
                addTask.Start_Date = Convert.ToDateTime(taskModel.StartDateString);
            if (taskModel.EndDateString != null)
                addTask.End_Date = Convert.ToDateTime(taskModel.EndDateString);
            addTask.Priority = taskModel.Priority;
            addTask.Parent_Id = taskModel.ParentId;
            if (!string.IsNullOrEmpty(taskModel.ParentTask))
            {
                ParentTask pTask = new ParentTask();
                pTask.Parent_Task = taskModel.ParentTask;
                addTask.ParentTask = pTask;
            }
            entity.Tasks.Add(addTask);
            entity.SaveChanges();
            return true;
        }
        /// <summary>
        /// UpdateTask
        /// </summary>
        /// <param name="taskModel"></param>
        /// <returns></returns>
        public bool UpdateTask(TaskModel taskModel)
        {
            TaskManagerEntities entity = new TaskManagerEntities();
            var taskE = entity.Tasks.Where(x => x.Task_Id == taskModel.TaskId).FirstOrDefault();
            if (taskE != null)
            {
                taskE.Task1 = taskModel.Task;
                if (taskModel.StartDateString != null)
                    taskE.Start_Date = Convert.ToDateTime(taskModel.StartDateString);
                if (taskModel.EndDateString != null)
                    taskE.End_Date = Convert.ToDateTime(taskModel.EndDateString);
                taskE.Priority = taskModel.Priority;
                taskE.Parent_Id = taskModel.ParentId;
                entity.SaveChanges();
            }
            return true;        
            
        }
        /// <summary>
        /// DeleteTask
        /// </summary>
        /// <param name="taskId"></param>
        /// <returns></returns>
        public bool DeleteTask(int taskId)
        {
            TaskManagerEntities entity = new TaskManagerEntities();
            var taskE = entity.Tasks.Where(x => x.Task_Id == taskId).FirstOrDefault();
            if (taskE != null)
            {
                entity.Tasks.Remove(taskE);
                entity.SaveChanges();
            }
            return true;
        }
    }
}
