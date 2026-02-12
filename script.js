document.addEventListener("DOMContentLoaded", () => {
  const yesBtn = document.getElementById("yes");
  const noBtn = document.getElementById("no");
  const buttonArea = document.querySelector(".buttons");

  if (!yesBtn || !noBtn || !buttonArea) return;

  function setStartingPositions() {
    const areaWidth = buttonArea.clientWidth;
    const areaHeight = buttonArea.clientHeight;

    // YES stays in the flex flow, just nudge it left a bit
    yesBtn.style.marginRight = "80px";

    // NO is absolute; place it on the right, vertically centered

    
   function moveNoButton(e) {
  const noRect = noBtn.getBoundingClientRect();
  const noCenterX = noRect.left + noRect.width / 2;
  const noCenterY = noRect.top + noRect.height / 2;

  const distance = Math.hypot(e.clientX - noCenterX, e.clientY - noCenterY);
  if (distance >= 120) return;

  const areaRect = buttonArea.getBoundingClientRect();
  const yesRect = yesBtn.getBoundingClientRect();

  // Convert YES rect to coordinates relative to the buttonArea
  const yes = {
    left: yesRect.left - areaRect.left,
    top: yesRect.top - areaRect.top,
    right: yesRect.right - areaRect.left,
    bottom: yesRect.bottom - areaRect.top,
  };

  const padding = 8;
  const buffer = 12; // extra space around YES so they don't feel too close
  const maxX = buttonArea.clientWidth - noBtn.offsetWidth - padding;
  const maxY = buttonArea.clientHeight - noBtn.offsetHeight - padding;

  function overlaps(a, b) {
    return !(
      a.right <= b.left ||
      a.left >= b.right ||
      a.bottom <= b.top ||
      a.top >= b.bottom
    );
  }

  // Try a bunch of random positions until we find one that doesn't overlap YES
  const maxAttempts = 40;
  for (let i = 0; i < maxAttempts; i++) {
    const left = padding + Math.random() * Math.max(0, maxX);
    const top = padding + Math.random() * Math.max(0, maxY);

    const no = {
      left,
      top,
      right: left + noBtn.offsetWidth,
      bottom: top + noBtn.offsetHeight,
    };

    const yesWithBuffer = {
      left: yes.left - buffer,
      top: yes.top - buffer,
      right: yes.right + buffer,
      bottom: yes.bottom + buffer,
    };

    if (!overlaps(no, yesWithBuffer)) {
      noBtn.style.left = `${left}px`;
      noBtn.style.top = `${top}px`;
      return;
    }
  }

  // Fallback: if we failed to find a spot, shove it to a corner away from YES
  const placeLeft = yes.left < buttonArea.clientWidth / 2 ? maxX : padding;
  const placeTop = yes.top < buttonArea.clientHeight / 2 ? maxY : padding;
  noBtn.style.left = `${placeLeft}px`;
  noBtn.style.top = `${placeTop}px`;
}

  // initial placement (after layout)
  requestAnimationFrame(() => {
    setStartingPositions();
  });

  // keep positions sane on resize
  window.addEventListener("resize", setStartingPositions);

  // one mousemove handler
  document.addEventListener("mousemove", (e) => {
    moveNoButton(e);
    growYesButton(e);
  });
});
