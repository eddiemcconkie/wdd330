const links = [
  {
    label: 'Week 01',
    url: './week01/',
  },
  {
    label: 'Week 02',
    url: './week02/',
  },
  {
    label: 'Week 03',
    url: './week03/',
  },
  {
    label: 'Week 04',
    url: './week04/',
  },
  {
    label: 'Week 05',
    url: './week05/',
  },
  {
    label: 'Challenge 01',
    url: './challenge01/',
  },
  {
    label: 'Week 07',
    url: './week07/',
  },
  {
    label: 'Week 08',
    url: './week08/',
  },
  {
    label: 'Week 09',
    url: './week09/',
  },
  {
    label: 'Challenge 02',
    url: './challenge02/',
  },
  {
    label: 'Week 10',
    url: './week10/',
  },
]

const ol = document.querySelector('ol')
ol.innerHTML = links.map((link) => `<li><a href="${link.url}">${link.label}</a></li>`).join('')
