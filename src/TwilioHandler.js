import { TwimlResponse } from 'twilio'
import { keys, map } from 'lodash'
import RedditClient from 'RedditClient'
import TableParser from 'TableParser'

const BLANK_REGEXP = /^\s*$/

function respondToTwilio(res, message) {
  console.log("Responding to Twilio:")
  console.log("\"" + message + "\"")
  const twimlResponse = new TwimlResponse()

  if(BLANK_REGEXP.test(message)) {
    twimlResponse.message("Hmm. Something went wrong at the last moment. Try again later.")
  } else {
    twimlResponse.message(message)
  }
  res.type('text/xml')
  res.send(twimlResponse.toString())
}

export default function(req, res, next) {
  console.log("Starting TwilioHandler")
  const ctx = req.webtaskContext
  const smsText = ctx.body.Body

  const client = new RedditClient(ctx.secrets)

  client.searchSubreddit('BehindTheTables', smsText)
    .then(searchResults => {
      console.log(`Found ${searchResults.length} results...`)
      console.log("Using searchResult: " + searchResults[0].data.id)
      const parser = new TableParser(smsText, searchResults[0].data)
      return parser.parse()
    })
    .then(tables => map(tables, table => {
      if(table.values.length > 0) {
        const res = table.rollForValue()
        return res
      } else {
        return ""
      }
    }))
    .then(rolls => rolls.join("\n"))
    .then(message => respondToTwilio(res, message))
    .catch(errMessage => respondToTwilio(res, errMessage))
}
