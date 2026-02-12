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
    const centerY = (areaHeight - noBtn.offsetHeight) / 2;
    noBtn.style.left = `${areaWidth - noBtn.offsetWidth - 20}px`;
    noBtn.style.top = `${centerY}px`;
  }

  function growYesButton(e) {
    const rect = yesBtn.getBoundingClientRect();
    const btnX = rect.left + rect.width / 2;
    const btnY = rect.top + rect.height / 2;

    const distance = Math.hypot(e.clientX - btnX, e.clientY - btnY);
    const scale = Math.max(1, 2 - distance / 200);

    yesBtn.style.transform = `scale(${scale})`;
  }

  function moveNoButton(e) {
    const noRect = noBtn.getBoundingClientRect();
    const noCenterX = noRect.left + noRect.width / 2;
    const noCenterY = noRect.top + noRect.height / 2;

    const distance = Math.hypot(e.clientX - noCenterX, e.clientY - noCenterY);
    if (distance >= 120) return;

    const areaRect = buttonArea.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();

    // YES rect relative to the buttonArea
    const yes = {
      left: yesRect.left - areaRect.left,
      top: yesRect.top - areaRect.top,
      right: yesRect.right - areaRect.left,
      bottom: yesRect.bottom - areaRect.top,
    };

    const padding = 8;
    const buffer = 12;
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

    // Fallback: a corner away from YES
    const placeLeft = yes.left < buttonArea.clientWidth / 2 ? maxX : padding;
    const placeTop = yes.top < buttonArea.clientHeight / 2 ? maxY : padding;
    noBtn.style.left = `${placeLeft}px`;
    noBtn.style.top = `${placeTop}px`;
  }

  // initial placement (after layout)
  requestAnimationFrame(setStartingPositions);

  // keep positions sane on resize
  window.addEventListener("resize", setStartingPositions);

  // one mousemove handler
  document.addEventListener("mousemove", (e) => {
    moveNoButton(e);
    growYesButton(e);
  });
});

