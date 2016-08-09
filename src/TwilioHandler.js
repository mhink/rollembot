import { TwimlResponse } from 'twilio'
import { keys, map } from 'lodash'
import RedditClient from 'RedditClient'
import TableParser from 'TableParser'

export default function(req, res, next) {
  const ctx = req.webtaskContext
  const smsText = ctx.body.Body

  const client = new RedditClient(ctx.secrets)

  client.searchSubreddit('BehindTheTables', smsText)
    .then(searchResults => {
      const text = searchResults[0].data.selftext
      const parser = new TableParser(text)
      return parser.parse()
    })
    .then(tables => map(tables, table => table.rollForValue()))
    .then(rolls => rolls.join("\n"))
    .then(message => {
      const twimlResponse = new TwimlResponse()
      twimlResponse.message(message)
      res.type('text/xml')
      res.send(twimlResponse.toString())
    })
}
