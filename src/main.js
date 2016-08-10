import Express from 'express'
import Webtask from 'webtask-tools'
import TwilioHandler from 'TwilioHandler'

const App = new Express()

App.get("/", (req, res) => {
  res.send("Tuesday Attempt 4")
})

App.post('/twilio', TwilioHandler)

export default Webtask.fromExpress(App)
