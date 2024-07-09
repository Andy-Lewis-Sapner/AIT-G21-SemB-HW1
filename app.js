const header = document.querySelector('h1')
const app = document.getElementById('app')
const ddMenu = document.querySelector('#ddMenu')
const sandwitch = document.querySelectorAll('svg')
const html = document.documentElement

const toggle = () => html.classList.toggle('dark')

const setView = (v) => {
    header.innerText = v
    toggleMenu(true)
    if (v === 'Trading') {
        renderTrading()
    } else if (v === 'Competitions') {
        renderCompetitions()
    } else if (v === 'Tutorial') {
        renderTutorial()
    }
}
window.setView = setView

const toggleMenu = (hide) => {
    if (!hide) {
        ddMenu.classList.toggle('hidden')
        document.querySelectorAll('svg').forEach((el) => {
            el.classList.toggle('hidden')
        })
    } else {
        ddMenu.classList.add('hidden')
        document.querySelectorAll('svg')[0].classList.remove('hidden')
        document.querySelectorAll('svg')[1].classList.add('hidden')
    }
}
window.toggleMenu = toggleMenu

const renderTrading = () => {
    const tradingHTML = `<div
                        class="w-full h-15 p-1 mb-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex justify-between"
                    >
                        <div class="flex justify-start gap-2 w-full">
                            <img class="w-10 h-10 rounded-full" src="/resurce/profile-picture-5.jpg" alt="" />
                            <div class="font-medium dark:text-white">
                                <div><span>Jese Leos</span><span class="ml-16">Regular</span></div>
                                <div class="text-sm text-gray-500 dark:text-gray-400">Amount: 500$</div>
                            </div>
                        </div>
                        <div class="flex justify-start">
                        <span class="mt-2 mr-2">Mode: </span> 
                        <label
   for="toggleFive"
   class="flex items-center cursor-pointer select-none text-dark dark:text-white"
   >
   <div class="relative">
      <input
         id="toggleFive"
         type="checkbox"
         class="peer sr-only"
         />
      <div
         class="h-5 rounded-full shadow-inner w-14 bg-gray-300 dark:bg-dark-200"
         ></div>
      <div
         class="absolute left-0 flex items-center justify-center transition bg-blue-300 rounded-full dot shadow-switch-1 -top-1 h-7 w-7 dark:bg-dark-5 peer-checked:dark:bg-dark-3 peer-checked:translate-x-full"
         >
         <span
            class="w-4 h-4 rounded-full active bg-gray-300 dark:bg-dark-200"
            ></span>
      </div>
   </div>
</label>
</div>
                    </div>
                    
                    <div class="flex justify-start gap-2">
                        <canvas id="myChart" class="max-w-[700px] w-full"></canvas>
                        <div id="table-container" class="relative overflow-x-auto sm:rounded-lg"></div>
                    </div>`
    app.innerHTML = tradingHTML
    CreateChart()
    CreateTable()
    competitionsRendered = false
}
window.renderTrading = renderTrading

let competitionsRendered = false
const renderCompetitions = () => {
    const competitionsHTML = `<div class="flex flex-col items-center text-black">
                        <div class="text-3xl font-bold pb-3">Time left until next competition:</div>
                        <div id="timer" class="text-4xl pb-4"></div>
                        <img src="./resurce/tradingcomp.jpeg" alt="Trading Competition Image" class="h-[250px] mb-8 rounded border-solid border-blue-300 border-4" />
                        <button class="bg-blue-300 hover:bg-blue-400 p-2 rounded-2xl mb-4">
                            Register to competition
                        </button>
                    </div>`
    app.innerHTML = competitionsHTML
    competitionsRendered = true
}

const renderTutorial = () => {
    const tutorials = [
        {
            img: 'https://img.youtube.com/vi/i5OZQQWj5-I/0.jpg',
            title: 'Tutorial 1',
            summary: 'This video covers the basics of trading.',
            link: 'https://www.youtube.com/watch?v=i5OZQQWj5-I&pp=ygURYmFzaWNzIG9mIHRyYWRpbmc%3D',
        },
        {
            img: 'https://img.youtube.com/vi/2h5ryPi6ZYo/0.jpg',
            title: 'Tutorial 2',
            summary: 'This video goes over advanced trading strategies.',
            link: 'https://www.youtube.com/watch?v=2h5ryPi6ZYo&pp=ygUrdmlkZW8gZ29lcyBvdmVyIGFkdmFuY2VkIHRyYWRpbmcgc3RyYXRlZ2llcw%3D%3D',
        },
        {
            img: 'https://img.youtube.com/vi/s8wC6U7QJmQ/0.jpg',
            title: 'Tutorial 3',
            summary: 'This video explains risk management in trading.',
            link: 'https://www.youtube.com/watch?v=s8wC6U7QJmQ&pp=ygUpdmlkZW8gZXhwbGFpbnMgcmlzayBtYW5hZ2VtZW50IGluIHRyYWRpbmc%3D',
        },
    ]

    app.innerHTML = `
        <div class="p-4 h-auto flex flex-col items-center">
            <h2 class="text-2xl mb-4 text-black">Tutorial Videos</h2>
            <div class="space-y-4">
                ${tutorials
                    .map(
                        (tutorial) => `
                    <div class="flex items-center bg-white p-4 rounded-lg shadow dark:bg-gray-800 dark:text-white">
                        <img src="${tutorial.img}" alt="${tutorial.title}" class="w-32 h-20 rounded-lg mr-4">
                        <div>
                            <h3 class="text-lg font-semibold"><a href="${tutorial.link}" target="_blank">${tutorial.title}</a></h3>
                            <p class="text-sm">${tutorial.summary}</p>
                        </div>
                    </div>
                `,
                    )
                    .join('')}
            </div>
        </div>
    `
    competitionsRendered = false
}

const renderMenu = () => {
    const menu = document.querySelector('.allmenubuttons')
    const names = ['Trading', 'Competitions', 'Tutorial']
    menu.innerHTML = names.map((t) => `<button onclick="setView('${t}')">${t}</button>`).join('')
    ddMenu.innerHTML = names
        .map((t) => `<button class="block py-1 px-2" onclick="setView('${t}')"> ${t}</button>`)
        .join('')
}

const xValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
const CreateChart = () => {
    const chart = new Chart('myChart', {
        type: 'line',
        data: {
            labels: xValues,
            datasets: [
                {
                    data: [860, 1140, 1060, 1060, 1070, 1110, 1330, 2210, 7830, 2478],
                    borderColor: 'red',
                    fill: false,
                },
                {
                    data: [1600, 1700, 1700, 1900, 2000, 2700, 4000, 5000, 6000, 7000],
                    borderColor: 'green',
                    fill: false,
                },
                {
                    data: [300, 700, 2000, 5000, 6000, 4000, 2000, 1000, 200, 100],
                    borderColor: 'blue',
                    fill: false,
                },
            ],
        },
        options: {
            legend: { display: false },
        },
    })
}

function createElementWithClasses(tag, classes, content) {
    const element = document.createElement(tag)
    element.className = classes
    if (content) {
        element.innerHTML = content
    }
    return element
}

// Table data
const tableData = [
    { UserName: 'Andy', Number: '1', Currency: 'BTC', Amount: '$2999' },
    { UserName: 'Leonid', Number: '2', Currency: 'BTC', Amount: '$1999' },
    { UserName: 'Osher', Number: '3', Currency: 'BTC', Amount: '$99' },
]

const CreateTable = () => {
    // Get the container
    const container = document.getElementById('table-container')

    // Create the table
    const table = createElementWithClasses(
        'table',
        'w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400',
    )

    // Create the table head
    const thead = createElementWithClasses(
        'thead',
        'text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400',
    )
    const trHead = document.createElement('tr')
    const headers = ['UserName', 'Amount', 'Currency', 'Number']
    headers.forEach((headerText) => {
        const th = createElementWithClasses('th', 'px-6 py-3', headerText)
        th.setAttribute('scope', 'col')
        trHead.appendChild(th)
    })
    thead.appendChild(trHead)
    table.appendChild(thead)

    // Create the table body
    const tbody = document.createElement('tbody')
    tableData.forEach((item) => {
        const tr = createElementWithClasses('tr', 'bg-white border-b dark:bg-gray-800 dark:border-gray-700')
        tr.innerHTML = `
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${item.UserName}</th>
                <td class="px-6 py-4">${item.Amount}</td>
                <td class="px-6 py-4">${item.Currency}</td>
                <td class="px-6 py-4">${item.Number}</td>
            `
        tbody.appendChild(tr)
    })

    table.appendChild(tbody)
    container.appendChild(table)
}

setInterval(() => {
    if (competitionsRendered) {
        let timer = document.getElementById('timer')
        const competitionDate = new Date('2024-08-30 12:30:00')
        const currentDate = new Date()
        const timeDifference = competitionDate - currentDate
        const seconds = Math.floor((timeDifference / 1000) % 60)
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60)
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24)
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
        timer.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`
    }
}, 1)

renderMenu()
renderTrading()
