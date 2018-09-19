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
        public void GetParentTask()
        {
            var result = controller.GetParentTask();
            Assert.IsTrue(result != null);
        }

        [TestMethod]
        public void InsertTask()
        {
            TaskModel addTask = new TaskModel();
            addTask.Task = "Task New";
            addTask.StartDate = DateTime.Now;
            addTask.EndDate = DateTime.Now;
            addTask.Priority = 15;
            addTask.ParentId = 3;
            var isAdded = controller.InsertTaskDetails(addTask);
            Assert.AreEqual("ADD", isAdded);
        }

        [TestMethod]
        public void UpdateTask()
        {
            TaskModel updateTask = new TaskModel();
            updateTask.TaskId = 2005;
            updateTask.Task = "Task from Test";
            updateTask.StartDate = DateTime.Now;
            updateTask.EndDate = DateTime.Now;
            updateTask.Priority = 30;
            updateTask.ParentId = 2;
            var isUpdated = controller.InsertTaskDetails(updateTask);
            Assert.AreEqual("UPDATE", isUpdated);
        }

        [TestMethod]
        public void EndTask()
        {
            TaskModel endTask = new TaskModel();
            endTask.TaskId = 2005;
            endTask.Task = "Task from Test";
            endTask.StartDate = DateTime.Now;
            endTask.EndDate = DateTime.Now;
            endTask.Priority = 30;
            endTask.ParentId = 2;
            var isSuccess = controller.UpdateEndTask(endTask);
            Assert.AreEqual(true, isSuccess);
        }
    }
}
