const TABLE_HEADER_REGEXP = /^\W*\*\*d\d+\s*(.*)\*\*$/
const TABLE_ENTRY_REGEXP  = /^\d+\.\s*(.*)$/

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
    const min = Math.ceil(1)
    const max = Math.floor(this.values.length)
    const ix = Math.floor(Math.random() * (max - min)) + min
    return (this.header + " " + this.values[ix])
  }

  log() {
    console.log("\"" + this.header + "\"")
    for(let value of this.values) {
      console.log("    \"" + value + "\"")
    }
  }
}
