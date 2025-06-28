;(() => {
  document.addEventListener('scroll', function () {
    let headernav = document.getElementById('header-nav')
    if (headernav) {
      headernav.classList.toggle('headernav-scroll', window.scrollY > headernav.dataset.usrScroll)
    }
  })
})()
