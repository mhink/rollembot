import {
  TABLE_HEADER_REGEXP,
  TABLE_ENTRY_REGEXP  
} from './constants.js'

export default class RollTable {
  constructor(header) {
    const matches = TABLE_HEADER_REGEXP.exec(header)
    this.header = matches[1]
    this.values = []
  }

  pushEntry(value) {
    const matches = TABLE_ENTRY_REGEXP.exec(value)
    this.values.push(matches[1])
  }

  rollForValue() {
    if(this.values.length > 0) {
      const min = Math.ceil(1)
      const max = Math.floor(this.values.length)
      const ix = Math.floor(Math.random() * (max - min)) + min
      return (this.header + " " + this.values[ix])
    } else {
      return ""
    }
  }

  log() {
    console.log("\"" + this.header + "\"")
    for(let value of this.values) {
      console.log("    \"" + value + "\"")
    }
  }
}
