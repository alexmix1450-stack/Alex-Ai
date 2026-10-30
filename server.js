
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

app.use(cors({
  origin: "https://alexmix1450-stack.github.io"
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Alex AI Backend is running!");
});

app.post("/api/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message required" });
    }

    const ai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const result = await ai.responses.create({
      model: process.env.OPENAI_MODEL,
      input: message
    });

    res.json({ reply: result.output_text });
  } catch (error) {
    console.error("AI error:", error.message);
    res.status(500).json({ error: "AI service unavailable" });
  }
});

app.listen(process.env.PORT || 10000, "0.0.0.0");
