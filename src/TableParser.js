import { map, forEach } from 'lodash'
import RollTable from 'RollTable'

const TABLE_HEADER_REGEXP = /^\W*\*\*d\d+\s*(.*)\*\*$/
const TABLE_ENTRY_REGEXP  = /^\d+\.\s*(.*)$/

const isTableHeader = (line) => TABLE_HEADER_REGEXP.test(line)
const isTableEntry  = (line) => TABLE_ENTRY_REGEXP.test(line)

export default class TableParser {
  constructor(selftext) {
    this.lines        = selftext.split("\n")
    this.currentTable = null
    this.tables       = []

    console.log(`TableParser with ${this.lines.length} lines`)
  }

  parse() {
    return new Promise((resolve, reject) => {
      try {
        for(let line of this.lines) {
          this.parseLine(line)
        }
        resolve(this.tables)
      } catch(err) {
        reject(err)
      }
    })
  }

  parseLine(line) {
    if(isTableHeader(line)) {
      this.emitTable(line)
    } else if(isTableEntry(line)) {
      this.emitTableEntry(line)
    }
  }

  emitTable(line) {
    if(this.currentTable) {
      this.tables.push(this.currentTable)
    }

    this.currentTable = new RollTable(line)
  }

  emitTableEntry(line) {
    if(this.currentTable) {
      this.currentTable.pushEntry(line)
    }
  }
}

