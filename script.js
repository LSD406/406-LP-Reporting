const PASSWORD = "TedWilliams";
let apiKey = "YOUR_OPENAI_API_KEY_HERE"; // Replace this with your OpenAI API key

function handleLogin() {
  const input = document.getElementById("password").value;
  if (input === PASSWORD) {
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("chat-screen").classList.remove("hidden");
  } else {
    document.getElementById("login-error").innerText = "Incorrect password.";
  }
}

async function sendMessage() {
  const inputEl = document.getElementById("user-input");
  const userMessage = inputEl.value;
  if (!userMessage.trim()) return;

  appendMessage("You", userMessage);
  inputEl.value = "";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are Fund II GPT, a concise and professional investment assistant." },
        { role: "user", content: userMessage }
      ]
    })
  });

  const data = await response.json();
  const gptReply = data.choices?.[0]?.message?.content || "[No response]";
  appendMessage("GPT", gptReply);
}

function appendMessage(sender, message) {
  const chatBox = document.getElementById("chat-box");
  const msg = document.createElement("div");
  msg.className = "message";
  msg.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
