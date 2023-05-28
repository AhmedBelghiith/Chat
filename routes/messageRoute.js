const express = require('express');
const router = express.Router();

const { createMesssage, updateMesssage, deleteMesssage, getMesssage, getMesssages, likeMessage } = require('../controllers/messageController');

router.get('/', getMesssages)
router.get('/getMesssage/:id', getMesssage)
router.post('/createMesssage', createMesssage)
router.put('/updateMesssage/:id', updateMesssage)
router.put('/like/:id', likeMessage)
router.delete('/deleteMesssage/:id', deleteMesssage)

module.exports = router;