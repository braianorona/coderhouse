const express = require('express')

const Container = require('./container')

const container = new Container('./productos.txt')
const server = express()

server.get('/productos', (req, res) => {
  try {
    container.getAll().then(response => {
      res.json(response)
    }).catch(error => {
      throw new Error(error)
    })
  } catch (error) {
    res.end(error)
  }
})


server.get('/productoRandom', (req, res) => {
  try {
    container.getRandom().then(response => {
      res.json(response)
    }).catch(error => {
      throw new Error(error)
    })
  } catch (error) {
    res.end(error)
  }
})

function connect(port = 0) {
  return new Promise((resolve, reject) => {
    const connectedServer = server.listen(port, err => {
      if(err) reject(err)
      else resolve(connectedServer)
    })
  })
}

module.exports = { connect }