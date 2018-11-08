var request = require('request');
var cheerio = require('cheerio');

const gameName = 'Magic The Gathering'

const gameElementDesc = 'div.panelka'
const panelElementDesc = 'div.panel-body'
const freeButtonDesc = 'button.btn'
const eventIdPanelDesc = 'div.panel-heading'

function getResponse(URL) {
    return new Promise((resolve, reject) => {
        request(URL, (err, res, body) => {
            if (err) reject(err)
            if(res.statusCode !== 200) reject(body, res.statusCode)
            resolve(body)
        });
    });
}

async function parse(requestString) {
    var body = await getResponse(requestString)
    return cheerio.load(body)
}

async function getEventId(requestString) {
    mtgEventId = ""

    var $ = await parse(requestString)
    $(gameElementDesc).each((_, elem) => {
        //Filter out other games
        if ($(elem).text().indexOf(gameName) != -1) {
            //Filter out placeholder tables (the ones containing no registration buttons)
            var btn = $(elem).children(panelElementDesc).children('div').children(freeButtonDesc)
            if (btn.length != 0) {  
                var eventId = $(elem).children(eventIdPanelDesc).attr('id')
                mtgEventId = eventId.substr(6)
            } 
        }
    })
    return mtgEventId
}

module.exports = {
    getEventId:  getEventId,
    getResponse: getResponse,
}