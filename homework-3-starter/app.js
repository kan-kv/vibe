// Готовая защитная механика. Не изменяйте эту функцию.
function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function selectAttempts(filter) {
  // TODO: верните все попытки, прошедшие или не прошедшие порог.
  const allAttempts = window.reportData.attempts

  if (filter === 'passed') {
    return allAttempts.filter (item => item.passed === true)
  }

  if (filter === 'failed') {
    return allAttempts.filter (item => item.passed === false)
  }

  return [...window.reportData.attempts]
}

function renderAttempts(attempts) {
  // TODO: соберите строки списка через forEach и строковый аккумулятор.
  const listElem = document.querySelector('#result-list')
  const countElem = document.querySelector('#result-count')
  const total = window.reportData.attempts.length
  
  let html = ''

  attempts.forEach(attempts => {
    const safeName = escapeHtml(attempts.name)

    html += `
    <li class="result-item">  
        <span-class="result-name">
        ${safeName}
        </span> 
      - ${attempts.score} из ${attempts.questionCount} 
      (${attempts.percentage}%) 
    </li>`
  });

  // Перед вставкой имени вызовите готовую escapeHtml().
  listElem.innerHTML = html

  
  countElem.textContent = `Показано: ${attempts.length} из ${total}`
}

function startFilter() {
  // TODO: найдите форму, select, счётчик и список через querySelector().
  const form = document.querySelector('#filter-form')
  const select = document.querySelector('#filter')
  
  // TODO: подпишитесь на submit через addEventListener().
  
  // В обработчике вызовите preventDefault(), прочитайте value,
  // выберите попытки и замените innerHTML счётчика и списка.
  form.addEventListener('submit', function(event){
    event.preventDefault()

    const filtVal = select.value
    const filtData = selectAttempts(filtVal)
    renderAttempts(filtData)
  })

  renderAttempts(selectAttempts('all'))
}

startFilter()
