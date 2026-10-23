const readline = require('node:readline/promises')

function printTicketResult(category, budget) {
    const price = ticketPrice(category)
    const qty = maxTickets(budget, price)
    console.log(`Категория билета: ${category}`)
    console.log(`Бюджет: ${budget}`)
    console.log(`Категория ${category}, билет ${price} руб., бюджет ${budget} руб.: можно купить ${qty} шт.`)
}

function maxTickets(budget, price) {
    let i = 0
        while (price * (i + 1) < budget) {
            i = i + 1
    }
    return i
}

function ticketPrice(category) {
  switch(category) {
        case 1:{
            const price = 300
            console.log(`Цена билета: ${price}`)
            return price
            break
        }
        case 2:{
            const price = 500
            console.log(`Цена билета: ${price}`)
            return price
            break
        }
        case 3:{
            const price = 900
            console.log(`Цена билета: ${price}`)
            return price
            break
        }
        default:
        const price = 900
        console.log(`Цена билета: ${price}`)
    }
}



function printDelivery(distance, total) {
    const price = deliveryPrice(distance, total)
    console.log(`Расстояние: ${distance}`)
    console.log(`Сумма заказа: ${total}`)
    console.log(`Расстояние ${distance} км, заказ ${total} руб.: доставка ${price} руб.`)
}   

function deliveryPrice(distance, total) {
    let price
    if (total >= 3000) {
                    price = 0 
                }
    else {
    if (distance > 10) {
        price = 200 + 25 * (distance - 10)             
    }
    else {
        if (distance >= 4) {
                price = 200
            }
        
        else {
            if (distance <= 3) {
                price = 0 
            }
        }
    }
}

    return price
}

function printSteps(height) {
    let k = 0
    for(let i = 1; i < height; i = i + 1) {
        if (i === 4) {
            continue
        }
        else {
            if (i > 10) {
                console.log(`Дальше лестница не построена`)
                break 
            }
        }
        console.log(`Ступень ${i}`)
        k = k + 1
    }
    console.log(`Всего построено: ${k}`)
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

  console.log('Выберите задачу:')
  console.log('1 — билетная касса')
  console.log('2 — доставка заказа')
  console.log('3 — лестница')

  const action = Number(await rl.question('Ваш выбор: '))

  switch (action) {
    case 1: {
      const category = Number(await rl.question('Введите категорию: '))
      const budget = Number(await rl.question('Введите бюджет: '))
      printTicketResult(category, budget)
      break
      }      
    case 2: {
      const distance = Number(await rl.question('Введите расстояние до клиента в километрах: '))
      const total = Number(await rl.question('Введите сумму заказа в рублях: '))
      printDelivery(distance, total)
      break
    }
    case 3: {
      const height = Number(await rl.question('Введите количество ступеней: '))
      printSteps(height)
      break
    }
    default:
      console.log('такой задачи нет')
  }

  rl.close()
}

main()