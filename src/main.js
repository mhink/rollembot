import Express from 'express'
import Webtask from 'webtask-tools'
import TwilioHandler from 'TwilioHandler'
import { json as jsonBodyParser } from 'body-parser'

const App = new Express()

// App.use(jsonBodyParser())

App.get("/", (req, res) => {
  res.send("Attempt 7")
})

App.post('/twilio', TwilioHandler)

export default Webtask.fromExpress(App)
