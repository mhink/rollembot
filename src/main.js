import Express from 'express'
import Webtask from 'webtask-tools'

const App = new Express()

App.get("*", (req, res) => {
  res.send("<h1>Webtask + Babel + Express = <3</h1>")
})

export default Webtask.fromExpress(App)
