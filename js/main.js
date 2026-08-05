const iconElements = document.querySelectorAll('.weather-icons [icon]');

if (iconElements.length > 0) {
  const randomIndex = Math.floor(Math.random() * iconElements.length);
  iconElements.forEach((icon, index) => {
    icon.classList.toggle('active', index === randomIndex);
  });
}
