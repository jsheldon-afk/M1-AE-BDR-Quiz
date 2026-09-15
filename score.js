// score.js
// Shared helper for submitting quiz/widget results to the score collector.
const SCORE_ENDPOINT = "https://script.google.com/macros/s/AKfycbxFJJKa4QhN1sirX2UAEd7oI9m98R2bjX6k09BOwgAd9THjHz1B5R3j6gvtSC2zFXwG/exec";

// moduleName: e.g. "Ramping Quota, Commission & Expectations"
// componentName: e.g. "Quiz", "Daily KPI Table", "Checkpoints"
function submitScore(moduleName, componentName, repName, correct, total) {
  if (!SCORE_ENDPOINT) {
    console.warn("SCORE_ENDPOINT not set — score not recorded.", moduleName, componentName, repName, correct + "/" + total);
    return Promise.resolve({ recorded: false });
  }
  return fetch(SCORE_ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      module: moduleName,
      component: componentName,
      rep: repName,
      correct: correct,
      total: total,
      timestamp: new Date().toISOString()
    })
  }).then(() => ({ recorded: true })).catch(() => ({ recorded: false }));
}

function requireName(inputEl, errorEl) {
  const val = inputEl.value.trim();
  if (!val) {
    errorEl.textContent = "Enter your name first.";
    errorEl.style.display = "block";
    inputEl.focus();
    return null;
  }
  errorEl.style.display = "none";
  return val;
}
