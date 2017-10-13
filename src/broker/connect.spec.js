const { createConnection, connectionOpts, saslConnectionOpts } = require('../../testHelpers')
const { requests, lookup } = require('../protocol/requests')
const Broker = require('./index')

describe('Broker > connect', () => {
  let broker

  beforeEach(() => {
    broker = new Broker(createConnection(connectionOpts()))
  })

  afterEach(async () => {
    broker && (await broker.disconnect())
  })

  test('establish the connection', async () => {
    await expect(broker.connect()).resolves.toEqual(true)
    expect(broker.connection.connected).toEqual(true)
  })

  test('load api versions if not provided', async () => {
    expect(broker.versions).toEqual(null)
    await broker.connect()
    expect(broker.versions).toBeTruthy()
  })

  test('authenticate with SASL if configured', async () => {
    broker = new Broker(createConnection(saslConnectionOpts()))
    expect(broker.authenticated).toEqual(false)
    await broker.connect()
    expect(broker.authenticated).toEqual(true)
  })
})