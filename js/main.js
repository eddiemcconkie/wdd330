const links = [
  {
    label: 'Week 01 Notes',
    url: 'week01',
  },
]

const ol = document.querySelector('ol')
ol.innerHTML = links.map((link) => `<li><a href="${link.url}">${link.label}</a></li>`)
