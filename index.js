const { connect } = require("./server.js");

async function main() {
  try {
    const serv = await connect(4040);
    console.log(`conectado al puerto 4040`)
  } catch (error) {
    console.log("error")
  }
}

main()