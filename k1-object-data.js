const museum = {
  title: 'Музей космонавтики',
  address: { city: 'Москва', floor: 2 },
  open: true,
};

console.log(`Этаж: ${museum.address.floor}`);

const field = 'title';
console.log(`По названию: ${museum[field]}`);

const names = Object.keys(museum);
names.forEach((name) => {
  console.log(`Свойство: ${name}`);
});

const firstName = names[0];
console.log(`Значение ${firstName}: ${museum[firstName]}`);