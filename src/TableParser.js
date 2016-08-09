import { map, forEach } from 'lodash'
import RollTable from 'RollTable'

import {
  TABLE_HEADER_REGEXP,
  TABLE_ENTRY_REGEXP  
} from './constants.js'

const isTableHeader = (line) => TABLE_HEADER_REGEXP.test(line)
const isTableEntry  = (line) => TABLE_ENTRY_REGEXP.test(line)

export default class TableParser {
  constructor(term, tablePostData) {
    this.data         = tablePostData
    this.searchTerm   = term
    this.lines        = this.data.selftext.split("\n")
    this.currentTable = null
    this.tables       = []
  }

  parse() {
    console.log(`Parsing ${this.lines.length} lines for "${this.searchTerm}"...`)
    return new Promise((resolve, reject) => {
      try {
        for(let line of this.lines) {
          this.parseLine(line)
        }
        console.log(`Finished parsing ${this.tables.length} tables.`)

        if(this.tables.length > 0) {
          resolve(this.tables)
        }
        else {
          reject(this.errorMessage())
        }
      } catch(err) {
        console.error(err)
        console.error(err.stack)
        reject(this.errorMessage())
      }
    })
  }

  errorMessage() {
    return `Aw, man! We found a table for ${this.searchTerm}, but we had `
    + `trouble reading it. :( Try rolling it yourself at ${this.data.url}.`;
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

