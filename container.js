const fs = require('fs')

module.exports = class Container {
  #array
  #file

  constructor(path) {
    this.#array = []
    this.#file = path
  }

  async save(id, title, price, thumbnail) {
    const product = {
      id: id,
      title: title,
      price: price,
      thumbnail: thumbnail
    }

      fs.promises.readFile(this.#file, 'utf-8').then(response => {
        this.#array = JSON.parse(response)
        this.#array.push(product)
        fs.promises.writeFile(this.#file, JSON.stringify(this.#array, null, '\t')).then(res => {
          return "producto guardado"
        }).catch( err => {
          return err
        })
      }).catch(err => console.log(err));
  }

  async getById(id) {
    return fs.promises.readFile(this.#file, 'utf-8').then(response => {
      this.#array = JSON.parse(response)
      const product = this.#array.find(e => e.id === id)
      return product
    }).catch(err => {
      throw new Error(err)
    })
  }

  async getRandom() {
    return fs.promises.readFile(this.#file, 'utf-8').then(response => {
      this.#array = JSON.parse(response)
      const newArray = []
      newArray.push(this.#array[Math.floor(Math.random() * this.#array.length)])
      return newArray
    }).catch(err => {
      throw new Error(err)
    })
  }

  async getAll() {
    return fs.promises.readFile(this.#file, 'utf-8').then(response => {
      return this.#array = JSON.parse(response)
    }).catch(err => {
      throw new Error(err)
    })
  }

  async deleteById(id) {
    return fs.promises.readFile(this.#file, 'utf-8').then(response => {
      this.#array = JSON.parse(response)
      const product = this.#array.find(e => e.id === id)
      const index = product.id
      if (index) {
        this.#array.splice(index - 1, 1)
        fs.promises.writeFile(this.#file, JSON.stringify(this.#array, null, '\t')).then(res => {
          return "producto eliminado"
        }).catch( err => {
          return err
        })
      } else {
        console.log('no se encontro el producto')
      }
      return 'producto eliminado'
    }).catch(err => {
      throw new Error(err)
    })
  }

  async deleteAll() {
    const newArray = []
    return fs.promises.writeFile(this.#file, JSON.stringify(newArray)).then(response => {
      console.log('todos los productos eliminados')
    }).catch(err => {
      throw new Error(err)
    })
  }
}