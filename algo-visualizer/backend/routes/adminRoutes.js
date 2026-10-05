const express = require("express");
const router = express.Router();
const { Pool } = require("pg");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// 1. Create new algorithm (Used by your Admin Dashboard)
router.post("/algorithms", async (req, res) => {
  try {
    const {
      name,
      category_id,
      description,
      best_case,
      worst_case,
      space_complexity,
    } = req.body;
    const result = await pool.query(
      `INSERT INTO algorithms (name, category_id, description, best_case, worst_case, space_complexity) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, category_id, description, best_case, worst_case, space_complexity]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Get all algorithms (Used by the Visualizer)
router.get("/algorithms", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM algorithms ORDER BY algo_id ASC"
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Save Code (Admin)
router.post("/code", async (req, res) => {
  try {
    const { algo_id, language_code, code_text } = req.body;
    await pool.query(
      "INSERT INTO code_snippets (algo_id, language_code, code_text) VALUES ($1, $2, $3)",
      [algo_id, language_code, code_text]
    );
    res.status(201).send("Code saved");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Save Scripts (Admin)
router.post("/scripts", async (req, res) => {
  try {
    const { algo_id, step_index, written_text, tts_narration_text } = req.body;
    await pool.query(
      "INSERT INTO explanation_scripts (algo_id, step_index, written_text, tts_narration_text) VALUES ($1, $2, $3, $4)",
      [algo_id, step_index, written_text, tts_narration_text]
    );
    res.status(201).send("Script saved");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Delete Algorithm (Admin)
router.delete("/algorithms/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Because of CASCADE, this one line deletes the metadata, code, AND scripts!
    await pool.query("DELETE FROM algorithms WHERE algo_id = $1", [id]);
    res.status(200).send("Algorithm deleted successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
