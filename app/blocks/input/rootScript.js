const Process = require('../../lib/process')
const Template = require('../../lib/template')

const cuid = require('cuid')

class RootScript {
  constructor (data) {
    this.id = data.id || cuid()
    this.script = data.script
    this.respondsTo = data.respondsTo
    this.connections = data.connections
    this.cwd = data.cwd
  }

  call (query, env = {}) {
    const script = Template.compile(this.script, {
      query,
    })

    return Process.execute(script, {
      cwd: this.cwd,
      env: Object.assign({}, process.env, env),
    }).then((results) => {
      return JSON.parse(results)
    })
  }
}

module.exports = RootScript
