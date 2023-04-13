// Store the OpenAI API key in a variable
const apiKey = "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";

// Create a function to send a request to the OpenAI API
function sendRequest(input) {
  return fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt: `Is ${input} bio-degradable?`,
      max_tokens: 1,
      temperature: 0.5,
      n: 1,
      stop: "\n"
    })
  })
  .then(response => response.json())
  .then(data => data.choices[0].text.trim())
  .catch(error => console.log(error));
}

// Get the chat window and input elements
const chatWindow = document.getElementById("chat-window");
const userInput = document.getElementById("user-input");

// Add an event listener to the send button
document.getElementById("send-button").addEventListener("click", () => {
  // Get the user input
  const input = userInput.value.trim();

  // Append the user input to the chat window
  const userMessage = document.createElement("div");
  userMessage.classList.add("message", "user-message");
  userMessage.textContent = "User: " + input;
  chatWindow.appendChild(userMessage);

  // Clear the user input
  userInput.value = "";

  // Send a request to the OpenAI API
  sendRequest(input)
    .then(response => {
      // Append the API response to the chat window
      const botMessage = document.createElement("div");
      botMessage.classList.add("message", "bot-message");
      botMessage.textContent = "Chatbot: " + response;
      chatWindow.appendChild(botMessage);
    });
});

// Add an event listener to the user input field to handle Enter key press
userInput.addEventListener("keyup", event => {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("send-button").click();
  }
});
