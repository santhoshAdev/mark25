const express = require("express");
const serverless = require("serverless-http");
const bcrypt = require("bcryptjs");
const db = require("../database");

const app = express();
app.use(express.json());

// Register User
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Missing fields" });

    const hash = await bcrypt.hash(password, 10);
    try {
        db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").run(username, hash);
        res.status(201).json({ message: "User registered" });
    } catch (error) {
        res.status(400).json({ message: "Username already exists" });
    }
});

// Login User
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Missing fields" });

    const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
    if (!user) return res.status(400).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    res.json({ message: "Login successful", user: { id: user.id, username: user.username } });
});

module.exports.handler = serverless(app);
