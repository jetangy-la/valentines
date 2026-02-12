document.addEventListener("DOMContentLoaded", () => {
  const yesBtn = document.getElementById("yes");
  const noBtn = document.getElementById("no");

  // ---- NO BUTTON: RUN AWAY ----
let posX = 0;
let posY = 0;

document.addEventListener("mousemove", (e) => {
  const rect = noBtn.getBoundingClientRect();
  const btnX = rect.left + rect.width / 2;
  const btnY = rect.top + rect.height / 2;

  const dx = e.clientX - btnX;
  const dy = e.clientY - btnY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 150) {
    const angle = Math.atan2(dy, dx);

    posX -= Math.cos(angle) * 30;
    posY -= Math.sin(angle) * 30;

    noBtn.style.transform = `translate(${posX}px, ${posY}px)`;
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
