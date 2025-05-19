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
        "Authorization": "Bearer ВСТАВЬ_СЮДА_СВОЙ_CHUTES_API_TOKEN",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "microsoft/MAI-DS-R1-FP8",
        messages: [
          {
            role: "user",
            content: content
          }
        ],
        stream: false,
        max_tokens: 1024,
        temperature: 0.7
      })
    });

    const data = await res.json();
    responseEl.textContent = data.choices?.[0]?.message?.content || "❌ Нет ответа.";
  } catch (err) {
    console.error(err);
    responseEl.textContent = "❌ Ошибка при запросе.";
  }
});
