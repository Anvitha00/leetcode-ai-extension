chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "generate") {
    fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3", // or whatever model you're using
        prompt: message.prompt,
        stream: false
      })
    })
      .then(res => res.json())
      .then(data => {
        sendResponse(data);
      })
      .catch(err => {
        console.error("Error from Ollama:", err);
        sendResponse({ error: "Failed to call Ollama" });
      });

    // Important: return true to indicate you’ll send response async
    return true;
  }
});
