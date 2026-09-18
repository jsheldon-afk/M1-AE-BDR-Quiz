// score.js
// Shared helper for submitting quiz/widget results, roster entries, and reading them back.
const SCORE_ENDPOINT = "https://script.google.com/macros/s/AKfycbxFJJKa4QhN1sirX2UAEd7oI9m98R2bjX6k09BOwgAd9THjHz1B5R3j6gvtSC2zFXwG/exec";

// moduleName: e.g. "Ramping Quota, Commission & Expectations"
// componentName: e.g. "Quiz", "Full Module"
// repEmail is optional for backward compatibility, but every module now collects it.
function submitScore(moduleName, componentName, repName, correct, total, repEmail) {
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
      email: repEmail || "",
      correct: correct,
      total: total,
      timestamp: new Date().toISOString()
    })
  }).then(() => ({ recorded: true })).catch(() => ({ recorded: false }));
}

// Adds a rep to the Roster tab (used by add-rep.html)
function submitRoster(email, name, startDate) {
  if (!SCORE_ENDPOINT) {
    return Promise.resolve({ recorded: false });
  }
  return fetch(SCORE_ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ type: "roster", email: email, name: name, startDate: startDate })
  }).then(() => ({ recorded: true })).catch(() => ({ recorded: false }));
}

// Removes a rep from the Roster tab by email (used by schedule.html).
// Their historical scores are untouched -- this only stops future tracking/alerts.
function removeRosterEntry(email) {
  if (!SCORE_ENDPOINT) {
    return Promise.resolve({ recorded: false });
  }
  return fetch(SCORE_ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ type: "remove_roster", email: email })
  }).then(() => ({ recorded: true })).catch(() => ({ recorded: false }));
}

// Sets a manual recert due-date override for one rep + module (used by schedule.html).
function setRecertOverride(email, moduleName, dueDate) {
  if (!SCORE_ENDPOINT) {
    return Promise.resolve({ recorded: false });
  }
  return fetch(SCORE_ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ type: "recert_override", email: email, module: moduleName, dueDate: dueDate })
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

// Validates both name and email inputs together. Returns {name, email} or null.
function requireNameAndEmail(nameInputEl, emailInputEl, errorEl) {
  const name = nameInputEl.value.trim();
  const email = emailInputEl.value.trim();
  if (!name || !email || email.indexOf("@") === -1) {
    errorEl.textContent = "Enter your name and a valid email first.";
    errorEl.style.display = "block";
    (!name ? nameInputEl : emailInputEl).focus();
    return null;
  }
  errorEl.style.display = "none";
  return { name: name, email: email };
}
