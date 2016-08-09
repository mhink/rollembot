import Express from 'express'
import Webtask from 'webtask-tools'
import TwilioHandler from 'TwilioHandler'

const App = new Express()

App.get("/", (req, res) => {
  res.send("Attempt 7")
})

App.post('/twilio', TwilioHandler)

export default Webtask.fromExpress(App)
