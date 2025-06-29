;(() => {
  document.addEventListener('scroll', function () {
    let headernav = document.getElementById('header-nav')
    if (headernav) {
      headernav.classList.toggle('headernav-scroll', window.scrollY > headernav.dataset.usrScroll)
    }
  })

  // ==================================relocateElements==================================
  const DEBOUNCE_DELAY = 100
  const MIN_BREAKPOINT = -Infinity

  window.addEventListener('resize', debounceRelocation)

  let resizeTimeout
  function debounceRelocation() {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(relocateElements, DEBOUNCE_DELAY)
  }

  function relocateElements() {
    const targetContainersMap = {}
    document.querySelectorAll('[data-site-action="relocation"]').forEach(container => {
      const targetId = container.dataset.siteTarget
      const target = targetId ? document.getElementById(targetId) : null
      if (!target) return

      const breakpoint = parseInt(container.dataset.siteBreakpoint) || 0

      if (!targetContainersMap[targetId]) targetContainersMap[targetId] = []

      targetContainersMap[targetId].push({ container, breakpoint })
    })

    Object.entries(targetContainersMap).forEach(([targetId, containers]) => {
      const target = document.getElementById(targetId)
      if (!target || !Array.isArray(containers) || !containers.length) return

      const currentWidth = window.innerWidth

      const targetContainer = containers.reduce((best, current) => {
        if (current.breakpoint > currentWidth) return best
        if (current.breakpoint > (best?.breakpoint || MIN_BREAKPOINT)) return current
        return best
      }, null)

      if (!targetContainer || targetContainer.container === target.parentElement) return

      targetContainer.container.appendChild(target)
    })
  }

  relocateElements()
  // ==================================relocateElements==================================

  $(document).ready(function () {
    $('.owl-carousel-full').owlCarousel({
      margin: 20,
      responsive: {
        0: {
          items: 1
        },
        576: {
          items: 2
        },
        768: {
          items: 3
        },
        992: {
          items: 4
        }
      }
    })
  })
})()
