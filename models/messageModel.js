const mongoose = require('mongoose');
const { Schema } = mongoose;
const yup = require("yup")
const MessageSchema = new Schema({
    pseudo: {
        required: true,
        type: String,
        unique: true,
    },
    content: {
        required: true,
        type: String,
    },
    likes: {
        type: Number,
        default: 0,
    },
});
MessageSchema.pre('save', async function (next) {
    try {
        const schema = yup.object().shape({
            pseudo: yup.string().max(8).required(),
            content: yup.string().required(),
        });

        await schema.validate(this.toObject(), { abortEarly: false });

        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Message', MessageSchema);
