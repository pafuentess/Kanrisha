const express = require('express');
const router = express.Router();
const Project = require('../models/projects');
const Manager = require('../models/manager');
const aux = require('../helpers/aux');

router.post('/new-project', async (req, res) => {
  const {
    managerId,
    name,
    description,
    status,
    deadline,
    freelancersId,
    tasksId,
    advanced
  } = req.body;
  const newProject = new Project({
    managerId,
    name,
    description,
    status,
    deadline,
    freelancersId,
    tasksId,
    advanced
  });
  await newProject.save();
  const manager = await Manager.findById(managerId);
  manager.projectsId.push(newProject._id);
  manager.save();
  res.send('true');
});

router.get('/project-advanced', async (req, res) => {
  const { projectId } = req.body;
  const project = await Project.findById(projectId);
  if (project) {
    const tasks = project.tasksId;
    if (tasks) {
      console.log(typeof (tasks));
      aux.calculateAdvance(tasks);
      res.send('ok');
    } else {
      res.send('ok');
    }
  }
});

module.exports = router;
