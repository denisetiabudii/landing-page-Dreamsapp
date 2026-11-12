export function trackPointerPosition(event) {
  if (event.pointerType !== 'mouse') {
    return
  }

  const bounds = event.currentTarget.getBoundingClientRect()

  if (!bounds.width || !bounds.height) {
    return
  }

  const x = ((event.clientX - bounds.left) / bounds.width) * 100
  const y = ((event.clientY - bounds.top) / bounds.height) * 100

  event.currentTarget.style.setProperty('--pointer-x', `${x}%`)
  event.currentTarget.style.setProperty('--pointer-y', `${y}%`)
}

export function clearPointerPosition(event) {
  event.currentTarget.style.removeProperty('--pointer-x')
  event.currentTarget.style.removeProperty('--pointer-y')
}
