const askBtn = document.getElementById('askBtn');
const userInput = document.getElementById('userInput');
const responseEl = document.getElementById('response');

askBtn.addEventListener('click', async () => {
  const content = userInput.value.trim();
  if (!content) return;

  responseEl.textContent = "⌛ Ответ генерируется...";

  try {
    const res = await fetch("https://llm.chutes.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "cpk_1e5bfe5afa4e4b519205b2c58517cf57.b4d53b160d0e5b26815f28904cce399f.30c155rlB9Wk4DDLtqKPBmwLSHlWQ6Xg",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "microsoft/MAI-DS-R1-FP8",
        messages: [
          {
            role: "user",
            content: `Только ответ, только на русском: ${content}`
          }
        ],
        stream: false,
        max_tokens: 512,
        temperature: 0.5
      })
    });

    const data = await res.json();
    responseEl.textContent = data.choices?.[0]?.message?.content || "❌ Нет ответа.";
  } catch (err) {
    console.error(err);
    responseEl.textContent = "❌ Ошибка при запросе.";
  }
});
