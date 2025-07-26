document.getElementById("start").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getProblem" }, function (response) {
      if (chrome.runtime.lastError || !response?.problem) {
        document.getElementById("output").innerText = "Couldn't extract problem.";
        return;
      }

      const problem = response.problem;
      document.getElementById("output").innerText = "Sending problem to AI...";

      fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama3", // or any model you pulled with `ollama pull llama3`
          prompt: `Here is a LeetCode problem:\n\n${problem.title}\n\n${problem.description}\n\nWait for user input: Ask them whether they want to describe their approach or jump into code.`
        })
      })
        .then(res => res.json())
        .then(data => {
          document.getElementById("output").innerText = data.response;
        })
        .catch(err => {
          document.getElementById("output").innerText = "Error connecting to Ollama.";
        });
    });
  });
});
