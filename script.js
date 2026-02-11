document.addEventListener("DOMContentLoaded", () => {
  const yesBtn = document.getElementById("yes");
  const noBtn = document.getElementById("no");

  // ---- NO BUTTON: RUN AWAY ----
  document.addEventListener("mousemove", (e) => {
    const rect = noBtn.getBoundingClientRect();
    const btnX = rect.left + rect.width / 2;
    const btnY = rect.top + rect.height / 2;

    const dx = e.clientX - btnX;
    const dy = e.clientY - btnY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 120) {
      const moveX = -dx * 0.6;
      const moveY = -dy * 0.6;
      noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
  });

  // ---- YES BUTTON: GROW ----
  document.addEventListener("mousemove", (e) => {
    const rect = yesBtn.getBoundingClientRect();
    const btnX = rect.left + rect.width / 2;
    const btnY = rect.top + rect.height / 2;

    const dx = e.clientX - btnX;
    const dy = e.clientY - btnY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const scale = Math.max(1, 2 - distance / 200);
    yesBtn.style.transform = `scale(${scale})`;
  });
});
