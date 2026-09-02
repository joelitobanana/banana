
(function () {
  const fieldNotes = [
    "Proximity reads as relationship before anyone reads a word.",
    "An empty element with no accessible content serves no one.",
    "Color should never be the only signal that something changed.",
    "A skip link is the first courtesy a keyboard user is owed.",
    "Contrast is a promise about who gets to read the page.",
    "Structure should encode something true, not just decorate."
  ];

  const noteButton = document.getElementById("note-button");
  const noteText = document.getElementById("note-text");
  let lastIndex = -1;

  noteButton.addEventListener("click", function () {
    let nextIndex = Math.floor(Math.random() * fieldNotes.length);
    // avoid showing the same note twice in a row when there's a choice
    if (fieldNotes.length > 1) {
      while (nextIndex === lastIndex) {
        nextIndex = Math.floor(Math.random() * fieldNotes.length);
      }
    }
    lastIndex = nextIndex;
    noteText.textContent = fieldNotes[nextIndex];
  });
})();

(function () {
  const inkInput = document.getElementById("ink-input");
  const inkSample = document.getElementById("ink-sample");

  inkInput.addEventListener("input", function () {
    const value = inkInput.value;

    if (value.trim() === "") {
      inkSample.textContent = "Your line will appear here.";
      inkSample.style.color = "";
      inkSample.style.fontWeight = "400";
      return;
    }

    inkSample.textContent = value;

    const weightStep = Math.min(Math.floor(value.length / 4), 5);
    const fontWeight = 400 + weightStep * 100; // 400 -> 900
    inkSample.style.fontWeight = String(fontWeight);

    const darkness = Math.min(value.length * 3, 100); // 0-100
    inkSample.style.color = `color-mix(in srgb, var(--ink) ${darkness}%, var(--ink-soft))`;
  });
})();

(function () {
  const punchForm = document.getElementById("punch-form");
  const punchInput = document.getElementById("punch-input");
  const punchList = document.getElementById("punch-items");
  const punchEmpty = document.getElementById("punch-empty");

  function updateEmptyState() {
    const hasItems = punchList.children.length > 0;
    punchEmpty.classList.toggle("is-hidden", hasItems);
  }

  function createPunchItem(text) {
    const item = document.createElement("li");
    item.className = "punch-item";

    const label = document.createElement("span");
    label.textContent = text;

    const doneButton = document.createElement("button");
    doneButton.type = "button";
    doneButton.className = "done-button";
    doneButton.textContent = "Done";
    doneButton.addEventListener("click", function () {
      const isDone = item.classList.toggle("is-done");
      doneButton.textContent = isDone ? "Undo" : "Done";
    });

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "remove-button";
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
      item.remove();
      updateEmptyState();
    });

    item.appendChild(label);
    item.appendChild(doneButton);
    item.appendChild(removeButton);

    return item;
  }

  punchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const text = punchInput.value.trim();
    if (text === "") {
      punchInput.focus();
      return;
    }

    const newItem = createPunchItem(text);
    punchList.appendChild(newItem);
    updateEmptyState();

    punchInput.value = "";
    punchInput.focus();
  });

  updateEmptyState();
})();
