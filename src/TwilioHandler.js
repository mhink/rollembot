import { TwimlResponse } from 'twilio'
import { keys } from 'lodash'

export default function(req, res, next) {
  const wtCtx = req.webtaskContext
  const smsText = wtCtx.body.Body
  console.log("Running Twilio handler...")
  const twimlResponse = new TwimlResponse()

  twimlResponse.message("Hello from Twilio SMS 11: " + smsText)

  res.type('text/xml')
  res.send(twimlResponse.toString())
}
