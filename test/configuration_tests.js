/* eslint-env mocha */
const assert = require('assert')
const path = require('path')
const SHACLValidator = require('../index')
const { loadDataset } = require('./utils')

describe('configuration', () => {
  it('stops after `maxErrors` is reached', async () => {
    const dataFile = path.join(__dirname, '/data/data-shapes/core/property/class-001.ttl')
    const data = await loadDataset(dataFile)
    const shapes = data

    const validator1 = new SHACLValidator(shapes)
    const report1 = validator1.validate(data)
    assert.strictEqual(report1.conforms, false)
    assert.strictEqual(report1.results.length, 2)

    const validator2 = new SHACLValidator(shapes, { maxErrors: 1 })
    const report2 = validator2.validate(data)
    assert.strictEqual(report2.conforms, false)
    assert.strictEqual(report2.results.length, 1)
  })

  it('allows named nodes in lists', async () => {
    const dataFile = path.join(__dirname, '/data/data-shapes/custom/namedNodeInPaths.ttl')
    const data = await loadDataset(dataFile)
    const shapes = data

    const validator1 = new SHACLValidator(shapes, { allowNamedNodeInList: true })
    const report1 = validator1.validate(data)
    assert.strictEqual(report1.conforms, true)
    const validator2 = new SHACLValidator(shapes, { allowNamedNodeInList: false })
    const report2 = validator2.validate(data)
    assert.strictEqual(report2.conforms, false)
    const validator3 = new SHACLValidator(shapes)
    const report3 = validator3.validate(data)
    assert.strictEqual(report3.conforms, false)
  })
})
