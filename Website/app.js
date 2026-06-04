const cursorGlow = document.querySelector('.cursor-glow')

window.addEventListener('pointermove', (event) => {
  if (!cursorGlow) return
  cursorGlow.style.setProperty('--x', `${event.clientX}px`)
  cursorGlow.style.setProperty('--y', `${event.clientY}px`)
})

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.16 }
)

document.querySelectorAll('.reveal-up, .reveal-card, .tilt-card, .feature-copy, .steps div').forEach((el) => {
  observer.observe(el)
})

document.querySelectorAll('.magnetic').forEach((button) => {
  button.addEventListener('pointermove', (event) => {
    const rect = button.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2
    button.style.transform = `translate(${x * 0.13}px, ${y * 0.22}px)`
  })

  button.addEventListener('pointerleave', () => {
    button.style.transform = ''
  })
})

document.querySelectorAll('.tilt-card').forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    card.style.setProperty('--rx', `${-y * 6}deg`)
    card.style.setProperty('--ry', `${x * 8}deg`)
  })

  card.addEventListener('pointerleave', () => {
    card.style.setProperty('--rx', '0deg')
    card.style.setProperty('--ry', '0deg')
  })
})
