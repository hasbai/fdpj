function sleep(ms = 1500) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function getUrls() {
  const urls = []
  const dom = document.querySelector('#iframepage').contentDocument
  for (let tr of dom.querySelectorAll('tbody tr')) {
    const td = tr.querySelector('td') // get the first td of tr
    if (td.firstElementChild.innerText === '调查中') {
      urls.push(td.querySelector('a').href)
    }
  }
  if (urls.length === 0) {
    alert('所有问卷均已提交！')
  }
  return urls
}

async function perform() {
  const dom = document.getElementById('iframe').contentDocument

  let nodes = dom.querySelectorAll('#subject_box dl')
  while (nodes.length === 0) {
    // wait for the page to load
    await sleep(100)
    nodes = dom.querySelectorAll('#subject_box dl')
  }

  for (let node of nodes) {
    node.querySelector('dd a').click()
  }
  dom.getElementById('next_button').click()
  await sleep()
  dom.querySelector('button[data-id="ok"]').click()
  await sleep()
  const src = dom.querySelector('div[class="close_tip"] a').href
  document.getElementById('iframe').src = src
  return perform()
}

async function main() {
  const iframe = document.createElement('iframe')
  iframe.width = window.innerWidth
  iframe.height = window.innerHeight
  iframe.id = 'iframe'
  iframe.onload = perform
  document.body.insertBefore(iframe, document.body.firstChild)

  const urls = getUrls()
  if (urls.length === 0) {
    return
  }
  iframe.src = urls[0]
}

main()
