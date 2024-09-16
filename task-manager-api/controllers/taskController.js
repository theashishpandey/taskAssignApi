const Task = require('../models/taskModel');
const sendEmail = require('../notifications/sendEmail');

const taskController = (io) => {
     const createTask = async (req, res) => {
          const { title, description, dueDate, priority, assignedTo } = req.body;
          try {
               const task = new Task({
                    title, description, dueDate, priority, assignedTo, createdBy: req.userId
               });
               await task.save();

               // Emit task created event to all connected clients
               io.emit('taskCreated', task);


               if (assignedTo) {
                    const user = await User.findById(assignedTo);
                    if (user && user.email) {
                         const emailSubject = 'New Task Assigned';
                         const emailBody = `You have been assigned a new task: ${title}`;
                         sendEmail(user.email, emailSubject, emailBody);
                    }
               }

               res.status(201).json(task);
          } catch (err) {
               res.status(500).json({ error: err.message });
          }
     };

     return { createTask };
};

module.exports = taskController;
