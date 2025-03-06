const express = require("express");
const serverless = require("serverless-http");
const bcrypt = require("bcryptjs");
const supabase = require("../database"); // Import the Supabase client

const app = express();
app.use(express.json());

// ✅ Register User
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Missing fields" });

    const hash = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
        .from("users")
        .insert([{ username, password: hash }]);

    if (error) return res.status(400).json({ message: error.message });

    res.status(201).json({ message: "User registered", user: data });
});

// ✅ Login User
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Missing fields" });

    const { data: users, error } = await supabase
        .from("users")
        .select("*")
        .eq("username", username)
        .single();

    if (error || !users) return res.status(400).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, users.password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    res.json({ message: "Login successful", user: { id: users.id, username: users.username } });
});

module.exports.handler = serverless(app);
