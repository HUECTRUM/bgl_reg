const calendarAddress = "https://club.bgl.com.ua/calendar/"
const registerLink = 'https://club.bgl.com.ua/calendar/api.php?do=assignUnregUser'

function dateToRequestFormat(date) {
    //trim 'T' and the rest of the suffix
   return date.toISOString().replace(/T.+/, '')
}

function getRequestString(place, date) {
    return calendarAddress + place + "/" + dateToRequestFormat(date) + "/"
}


function appendParam(link, paramName, paramValue) {
    return link + '&' + paramName + '=' + paramValue
}

function getRegisterLink(eventId, registrationData) {
    var link = registerLink
    link = appendParam(link, "surname", registrationData.surname)
    link = appendParam(link, "name", registrationData.name)
    link = appendParam(link, "tel", registrationData.tel.replace(" ", "%20"))
    link = appendParam(link, "eventId", eventId)
    return link
}

module.exports = {
    getRequestString: getRequestString,
    getRegisterLink:  getRegisterLink,
}