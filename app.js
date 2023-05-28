const http = require("http");
const path = require("path");
const express = require("express");
const Message = require("./models/messageModel")
const app = express();
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const messageRouter = require("./routes/messageRoute")
const server = http.createServer(app);
const uri = "mongodb://127.0.0.1:27017/myexam2023";
const io = require("socket.io")(server);

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB connected");
}).catch((err) => {
    console.log(err);
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/message', messageRouter);
app.set('view engine', 'twig');
app.set("views", path.join(__dirname, "views"));
app.get('/index', (req, res) => {
    res.render('index');
});
io.on("connection", function (socket) {
    console.log("User Connected..");
    let name;
    io.emit("notification", "A new user has connected");
    socket.on("msg", async (data) => {
        try {
            const message = new Message({
                pseudo: name,
                content: data,
                date: new Date(),
            });
            const savedMessage = await message.save();
            console.log(savedMessage);
            io.emit("msg", data);
            io.emit("notification", "New message");
        } catch (error) {
            console.log(error);
        }
    });

    socket.on("name", (data) => {
        io.emit("name", data);
        name = data;
    });

    socket.on("userIsTyping", (data) => {
        io.emit("userIsTyping", data);
        name = data;
    });
    socket.on("disconnect", () => {
        console.log("User Disconnected");
    });
});

server.listen(8080, () => { console.log("Server connected") });


