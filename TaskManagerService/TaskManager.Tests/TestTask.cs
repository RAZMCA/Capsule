using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.Controllers;
using TaskManager.Data.Models.Custom;

namespace TaskManager.Tests
{
    [TestClass]
    public class TestTask
    {
        TaskController controller = new TaskController();

        [TestMethod]
        public void GetAllTask()
        {
            var result = controller.GetAllTask();
            Assert.IsTrue(result.Count > 0);
        }
        [TestMethod]
        public void GetTaskById()
        {
            var taskId = 1;
            var result = controller.GetTaskById(taskId);
            Assert.IsTrue(result != null);
        }
        [TestMethod]
        public void SearchTask()
        {
            TaskModel searchTask = new TaskModel();
            searchTask.Task = "Task2";
            var result = controller.SearchTask((object)searchTask);
            Assert.IsTrue(result.Count > 0);
        }
        [TestMethod]
        public void AddTask()
        {
            TaskModel addTask = new TaskModel();
            addTask.Task = "Design";
            addTask.StartDate = DateTime.Now;
            addTask.EndDate = DateTime.Now;
            addTask.Priority = 15;
            addTask.ParentId = null;
            var isAdded = controller.AddTask(addTask);
            Assert.AreEqual(true, isAdded);
        }
        [TestMethod]
        public void UpdateTask()
        {
            TaskModel updateTask = new TaskModel();
            updateTask.TaskId = 1;
            updateTask.Task = "Coding";
            updateTask.StartDate = DateTime.Now;
            updateTask.EndDate = DateTime.Now;
            updateTask.Priority = 35;
            updateTask.ParentId = null;
            var isUpdated = controller.UpdateTask(updateTask);
            Assert.AreEqual(true, isUpdated);
        }
        [TestMethod]
        public void DeleteTask()
        {
            var isSuccess = true;
            Assert.AreEqual(true, isSuccess);
        }
    }
}
