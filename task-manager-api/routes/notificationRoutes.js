const express = require('express');
const router = express.Router();


router.post('/preferences', (req, res) => {
     const { userId, emailNotifications } = req.body;
     // Save user's notification preferences in the database
     res.status(200).json({ message: 'Notification preferences updated' });
});

module.exports = router;
