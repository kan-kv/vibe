const sourceJson = `{
  "event": {
    "title": "Ночь в музее",
    "date": "15 ноября, 18:30",
    "place": "Музей космонавтики, проспект Мира, 111",
    "description": "Вечерняя программа с выставкой и экскурсиями",
    "meeting": "Сбор: 18:30. Начало: 19:00."
  },
  "services": [
    { "id": "guide", "title": "  Экскурсия с гидом  ", "price": 500 },
    { "id": "audio", "title": "Аудиогид", "price": 350 },
    { "id": "catalog", "title": "Каталог выставки", "price": 250 }
  ]
}`;


const dataError = document.querySelector('#data-error');
const form = document.querySelector('#service-form');
const choiceError = document.querySelector('#choice-error');
const result = document.querySelector('#result');
const reportJson = document.querySelector('#report-json');
const showProgramButton = document.querySelector('#show-program');
const program = document.querySelector('#program');

let data;
try {
  data = JSON.parse(sourceJson);
} catch (error) {
  console.log('Ошибка parse:', error.message);
  dataError.hidden = false;
  form.hidden = true;
}

function buildReport(services, guideChecked, audioChecked, catalogChecked) {
  const selectedServices = services.filter((service) => {
    if (service.id === 'guide') return guideChecked;
    if (service.id === 'audio') return audioChecked;
    if (service.id === 'catalog') return catalogChecked;
    return false;
  });

  const items = selectedServices.map(({ title, price }) => ({
    title: title.trim(),
    price,
  }));

  const total = items.reduce((sum, { price }) => sum + price, 0);

  return { count: items.length, total, items };
}

function onSubmit(event) {
  event.preventDefault();

  const guideChecked = document.querySelector('#guide').checked;
  const audioChecked = document.querySelector('#audio').checked;
  const catalogChecked = document.querySelector('#catalog').checked;

  const report = buildReport(data.services, guideChecked, audioChecked, catalogChecked);

  if (report.count === 0) {
    choiceError.hidden = false;
    result.hidden = true;
    reportJson.hidden = true;
    return;
  }

  choiceError.hidden = true;

  let html = `Выбрано услуг: ${report.count}<br>Итого: ${report.total} руб.`;
  for (const { title } of report.items) {
    html += `<br>${title}`;
  }
  result.innerHTML = html;
  result.hidden = false;

  const json = JSON.stringify(report);
  JSON.parse(json); // проверка: если строка сломана, здесь упадёт ошибка
  reportJson.textContent = json;
  reportJson.hidden = false;
}

function onShowProgram() {
  program.innerHTML = data.event.meeting;
  program.hidden = false;
}

form.addEventListener('submit', onSubmit);
showProgramButton.addEventListener('click', onShowProgram);
