const noBtn = document.getElementById("no");

noBtn.addEventListener("mouseenter", () => {
  const maxX = 300;
  const maxY = 100;

  const x = Math.random() * maxX - maxX / 2;
  const y = Math.random() * maxY - maxY / 2;

  noBtn.style.transform = `translate(${x}px, ${y}px)`;
});
const yesBtn = document.getElementById("yes");

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
