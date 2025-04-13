// server.js
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from "cors"
const app = express();
const PORT = 5000;
app.use(cors())
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/student', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log(' MongoDB connected'))
.catch(err => console.error(' MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = new User({ name, email, password });
        console.log(newUser);
        await newUser.save();
        res.status(201).send(' User registered successfully!');
    } catch (err) {
        res.status(500).send(' Error registering user');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
