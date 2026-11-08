const form = document.querySelector('#route-form')
const list = document.querySelector('#route-list')
const message = document.querySelector('#message')
const starterItems = document.querySelectorAll('.route-item')

starterItems.forEach((item) => {
  item.classList.add('ready')
})

function addPlace(event) {
  event.preventDefault()

  const formData = new FormData(form)
  const place = formData.get('place')
  const withGuide = formData.checked('withGuide')
  const item = document.createElement('li')

  item.classList.add('route-item', 'ready')
  item.textContent = withGuide ? `${place} · с гидом` : `${place} · без гида`
  list.append(item)

  const allItems = document.querySelectorAll('.route-item')
  message.innerHTML = `В маршруте остановок: ${allItems.length}`
  form.reset()
}

form.addEventListener('submit', addPlace)

const clearButton = document.querySelector('#clear-button')

function toggleVisited(event) {
  if (!event.target.classList.contains('route-item')) {
    return
  }

  event.target.classList.toggle('visited')
}

function clearRoute() {
  list.innerHTML = ''
  message.innerHTML = 'Маршрут пуст.'
}

list.addEventListener('click', toggleVisited)
clearButton.addEventListener('click', clearRoute)