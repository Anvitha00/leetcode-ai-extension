function getProblemDetails() {
  const titleElement = document.querySelector("h1");
  const descriptionElement = document.querySelector('[data-key="description-content"]');

  if (!titleElement || !descriptionElement) return null;

  return {
    title: titleElement.innerText,
    description: descriptionElement.innerText
  };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getProblem") {
    const problem = getProblemDetails();
    sendResponse({ problem });
  }
});

chrome.runtime.sendMessage({
  type: "generate",
  prompt: leetcodeProblemText
}, (response) => {
  console.log("LLM Response:", response);
});
