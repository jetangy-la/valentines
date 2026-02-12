document.addEventListener("DOMContentLoaded", () => {
  const yesBtn = document.getElementById("yes");
  const noBtn = document.getElementById("no");
  const buttonArea = document.querySelector(".buttons");

  if (!yesBtn || !noBtn || !buttonArea) return;

  function setStartingPositions() {
    const areaWidth = buttonArea.clientWidth;
    const areaHeight = buttonArea.clientHeight;

    // YES stays in the flex flow, just nudge it left a bit
    yesBtn.style.marginRight = "60px";

    // NO is absolute; place it on the right, vertically centered
    const centerY = (areaHeight - noBtn.offsetHeight) / 2;
    noBtn.style.left = `${areaWidth - noBtn.offsetWidth - 20}px`;
    noBtn.style.top = `${centerY}px`;
  }

  function moveNoButton(e) {
    const rect = noBtn.getBoundingClientRect();
    const btnX = rect.left + rect.width / 2;
    const btnY = rect.top + rect.height / 2;

    const dx = e.clientX - btnX;
    const dy = e.clientY - btnY;
    const distance = Math.hypot(dx, dy);

    if (distance >= 120) return;

    const padding = 8;
    const maxX = buttonArea.clientWidth - noBtn.offsetWidth - padding;
    const maxY = buttonArea.clientHeight - noBtn.offsetHeight - padding;

    const newLeft = padding + Math.random() * Math.max(0, maxX);
    const newTop = padding + Math.random() * Math.max(0, maxY);

    noBtn.style.left = `${newLeft}px`;
    noBtn.style.top = `${newTop}px`;
  }

  function growYesButton(e) {
    const rect = yesBtn.getBoundingClientRect();
    const btnX = rect.left + rect.width / 2;
    const btnY = rect.top + rect.height / 2;

    const distance = Math.hypot(e.clientX - btnX, e.clientY - btnY);
    const scale = Math.max(1, 2 - distance / 200);

    yesBtn.style.transform = `scale(${scale})`;
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
