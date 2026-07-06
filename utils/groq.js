const GROQ_API_URL = "https://api.groq.com/openai/v1";
const GROQ_CHAT_MODEL = "llama-3.3-70b-versatile";
const GROQ_TRANSCRIPTION_MODEL = "whisper-large-v3-turbo";

const getGroqApiKey = () => {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GROQ_API_KEY environment variable");
  }

  return apiKey;
};

export const callGroqChat = async (messages, options = {}) => {
  const response = await fetch(`${GROQ_API_URL}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getGroqApiKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: options.model || GROQ_CHAT_MODEL,
      messages,
      temperature: options.temperature ?? 0.4,
      max_tokens: options.maxTokens ?? 2048,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq chat request failed: ${errorText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
};

export const transcribeWithGroq = async (audioFile) => {
  const formData = new FormData();
  formData.append("file", audioFile, audioFile.name || "answer.webm");
  formData.append("model", GROQ_TRANSCRIPTION_MODEL);
  formData.append("response_format", "json");
  formData.append("language", "en");
  formData.append("temperature", "0");

  const response = await fetch(`${GROQ_API_URL}/audio/transcriptions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getGroqApiKey()}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq transcription request failed: ${errorText}`);
  }

  const data = await response.json();
  return data.text || "";
};

export const parseJsonFromAiText = (text) => {
  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const match = cleaned.match(/(\[[\s\S]*\]|\{[\s\S]*\})/);

    if (!match) {
      throw new Error(`AI response did not contain JSON: ${cleaned}`);
    }

    return JSON.parse(match[1]);
  }
};
