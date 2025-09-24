// Efecto scroll en features
document.addEventListener('scroll', () => {
  const features = document.querySelectorAll('.feature-card');
  features.forEach(card => {
    const pos = card.getBoundingClientRect().top;
    if (pos < window.innerHeight - 100) {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }
  });
});
