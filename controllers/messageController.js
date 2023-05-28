const Message = require('../models/messageModel')



const createMesssage = async (req, res) => {
    try {
        const { pseudo, content, likes } = req.body
        console.log(pseudo, content)
        let message = new Message({ pseudo, content, likes })
        await message.save();
        res.status(200).json({ message })
    } catch (error) {
        res.status(500).json({ error })
    }
}

const updateMesssage = async (req, res) => {
    try {
        const { id } = req.params;
        const { pseudo, content, likes } = req.body
        const message = await Message.findById(id);
        message.content = content;
        message.pseudo = pseudo;
        message.likes = likes;
        await message.save();
        return res.status(200).json({ message })
    } catch (error) {
        return res.status(500).json({ error })
    }
}

const deleteMesssage = async (req, res) => {
    const { id } = req.params
    console.log(id)
    const message = await Message.findById(id);
    await message.deleteOne();
    return res.status(200).json({ message: 'deleted successfully' })
}

const getMesssage = async (req, res) => {
    const message = await Message.findById(req.params.id);
    return res.status(200).json({ message });
}


const getMesssages = async (req, res) => {
    const messages = await Message.find({});
    return res.status(200).json({ messages });
}

const likeMessage = async (req, res) => {
    const { id } = req.params;
    const m = await Message.findById(id);
    m.likes++;
    const message = await Message.findByIdAndUpdate(id, { pseudo: m.pseudo, content: m.content, likes: m.likes++ });

    return res.status(200).json({ message: { ...m._doc } })
}




module.exports = { getMesssage, getMesssages, createMesssage, updateMesssage, deleteMesssage, likeMessage };