// script.js

// ----- Elements -----
const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");

// ----- No button: run away -----
const noBtn = document.getElementById("no");

document.addEventListener("mousemove", (e) => {
  const rect = noBtn.getBoundingClientRect();

  const btnX = rect.left + rect.width / 2;
  const btnY = rect.top + rect.height / 2;

  const dx = e.clientX - btnX;
  const dy = e.clientY - btnY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Trigger BEFORE the cursor reaches the button
  if (distance < 120) {
    const moveX = -dx * 0.6;
    const moveY = -dy * 0.6;

    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
  }
});

// ----- Yes button: grow when close -----
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
