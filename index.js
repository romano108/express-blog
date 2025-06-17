import dotenv from "dotenv";
import express from "express";
import { supabasePublic, supabaseAdmin } from "./supabaseClient.js";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = 3000;

app.get("/users", async (req, res) => {
  const { data, error } = await supabasePublic.from("users").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post("/admin/users", async (req, res) => {
  const { name, email } = req.body;
  const { data, error } = await supabaseAdmin
    .from("users")
    .insert([{ name, email }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

app.listen(PORT, () => {
  console.log(`The app is running in port ${PORT}`);
});
