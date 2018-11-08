const enums = require("./enums.js")
const requestUtils = require("./requestUtils.js")
const htmlParsing = require("./htmlParsing.js")

async function register(requestLink, regData) {
    const eventId = await htmlParsing.getEventId(requestLink)
    const response = await htmlParsing.getResponse(requestUtils.getRegisterLink(eventId, regData))
    return response
}


const requestString = requestUtils.getRequestString(enums.Club.preobr, new Date('2018-11-10'))
const registrationData = {
    surname: "meow",
    name: "kitty",
    tel: "(066) 660-66-06"
}

register(requestString, registrationData).then(x => {console.log(x)})