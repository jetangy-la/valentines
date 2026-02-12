document.addEventListener("DOMContentLoaded", () => {
  const yesBtn = document.getElementById("yes");
  const noBtn = document.getElementById("no");
  const buttonArea = document.querySelector(".buttons");

  // Safety checks
  if (!yesBtn || !noBtn || !buttonArea) return;

  // Make sure NO can move within the .buttons area
  // (CSS should have: .buttons { position: relative; } and #no { position: absolute; })
  // Initialize NO somewhere sensible (center-ish), so it doesn't start at (0,0)
  const areaRect = buttonArea.getBoundingClientRect();
  noBtn.style.left = `${(areaRect.width - noBtn.offsetWidth) / 2}px`;
  noBtn.style.top = `0px`;

  // --- Helpers ---
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  function moveNoButtonAwayFromCursor(e) {
    const noRect = noBtn.getBoundingClientRect();
    const btnX = noRect.left + noRect.width / 2;
    const btnY = noRect.top + noRect.height / 2;

    const dx = e.clientX - btnX;
    const dy = e.clientY - btnY;
    const distance = Math.hypot(dx, dy);

    // Only run if cursor is close
    if (distance >= 120) return;

    const areaRectNow = buttonArea.getBoundingClientRect();

    // Compute new random position inside .buttons
    const padding = 8; // keep away from edges a bit
    const maxX = Math.max(padding, areaRectNow.width - noBtn.offsetWidth - padding);
    const maxY = Math.max(padding, areaRectNow.height - noBtn.offsetHeight - padding);

    let newLeft = Math.random() * maxX;
    let newTop = Math.random() * maxY;

    // Optional: bias the move away from the cursor (feels more "run away" than pure random)
    const cursorInAreaX = e.clientX - areaRectNow.left;
    const cursorInAreaY = e.clientY - areaRectNow.top;

    if (cursorInAreaX < areaRectNow.width / 2) newLeft = clamp(newLeft + areaRectNow.width / 4, padding, maxX);
    else newLeft = clamp(newLeft - areaRectNow.width / 4, padding, maxX);

    if (cursorInAreaY < areaRectNow.height / 2) newTop = clamp(newTop + areaRectNow.height / 4, padding, maxY);
    else newTop = clamp(newTop - areaRectNow.height / 4, padding, maxY);

    noBtn.style.left = `${newLeft}px`;
    noBtn.style.top = `${newTop}px`;
  }

  function growYesButtonNearCursor(e) {
    const rect = yesBtn.getBoundingClientRect();
    const btnX = rect.left + rect.width / 2;
    const btnY = rect.top + rect.height / 2;

    const dx = e.clientX - btnX;
    const dy = e.clientY - btnY;
    const distance = Math.hypot(dx, dy);

    // Same behavior you had, just using Math.hypot
    const scale = Math.max(1, 2 - distance / 200);
    yesBtn.style.transform = `scale(${scale})`;
  }

  // --- Single mousemove listener (avoid two separate listeners doing extra work) ---
  document.addEventListener("mousemove", (e) => {
    moveNoButtonAwayFromCursor(e);
    growYesButtonNearCursor(e);
  });

  // Optional: if the window resizes, keep the NO button inside bounds
  window.addEventListener("resize", () => {
    const areaRectNow = buttonArea.getBoundingClientRect();
    const maxX = Math.max(0, areaRectNow.width - noBtn.offsetWidth);
    const maxY = Math.max(0, areaRectNow.height - noBtn.offsetHeight);

    const currentLeft = parseFloat(noBtn.style.left || "0");
    const currentTop = parseFloat(noBtn.style.top || "0");

    noBtn.style.left = `${clamp(currentLeft, 0, maxX)}px`;
    noBtn.style.top = `${clamp(currentTop, 0, maxY)}px`;
  });
});
