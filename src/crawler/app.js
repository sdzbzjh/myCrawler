const cheerio = require('cheerio')
const superagent = require('superagent')
const conn = require('./conn')

const analy = (result) => {
  const $ = cheerio.load(result.text)
  // console.log($.html())
  const builds = []
  $('#houselist-mod-new .list-item').each((idx, ele) => {
    let build = {}
    build.title = $(ele).find('.house-title>a').text().trim()
    build.unit = $($(ele).find('.details-item').eq(0).find('span')[0]).text()
    build.area = parseFloat($($(ele).find('.details-item').eq(0).find('span')[1]).text())
    build.level = $($(ele).find('.details-item').eq(0).find('span')[2]).text()
    build.year = parseInt($($(ele).find('.details-item').eq(0).find('span')[3]).text())
    build.address = $(ele).find('.details-item').eq(1).find('span.comm-address').text().trim().replace('\n', '||').replace(/\s+/g, '')
    build.price = $(ele).find('.price-det').text().trim()
    build.average = parseFloat($(ele).find('.unit-price').text().trim())
    builds.push(build)
  })
  conn.table('build').addAll(builds).then(data => {
    console.log(data)
  }).catch(e => {
    console.log(e)
  })
}

const baseUrl = 'https://zibo.anjuke.com/sale/p',
  urls = []
for (let i = 1; i <= 1; i++) {
  urls.push(baseUrl + i)
}

const crawler = () => {
  urls.forEach((url => {
    superagent.get(url).end((err, res) => {
      if (err) {
        return
      }
      analy(res)
    })
  }))
}
crawler()