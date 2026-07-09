export function sparkle(el: HTMLElement) {
  const colors = ['#F05D5E', '#45B7D1', '#22c55e', '#ffcb6b', '#c3e88d']
  const rect = el.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2

  for (let i = 0; i < 10; i++) {
    const dot = document.createElement('div')
    const size = 4 + Math.random() * 4
    dot.style.cssText = `
      position: fixed;
      left: ${cx}px;
      top: ${cy}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${colors[i % colors.length]};
      pointer-events: none;
      z-index: 9999;
    `
    document.body.appendChild(dot)

    const angle = (Math.PI * 2 * i) / 10 + (Math.random() - 0.5) * 0.8
    const dist = 30 + Math.random() * 40
    const dx = Math.cos(angle) * dist
    const dy = Math.sin(angle) * dist - 20

    dot.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px) scale(0)`, opacity: 0 },
    ], {
      duration: 500 + Math.random() * 300,
      easing: 'cubic-bezier(0, 0.7, 0.3, 1)',
    }).onfinish = () => dot.remove()
  }
}
