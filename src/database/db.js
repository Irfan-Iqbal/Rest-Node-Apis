const mongoose = require("mongoose")

const initializeDatabase = () => {
  const dbUrl =
  // "mongodb+srv://sulemanjoseph16:stonecore@cluster0.xrgwqoa.mongodb.net/retryWrites=true&w=majority"
    "mongodb+srv://admin:obxHIrvo9DfU7Yix@cluster0.6el2dvk.mongodb.net/stone_core?retryWrites=true&w=majority"
    // "mongodb+srv://sulemanjoseph16:stonecore@cluster0.xrgwqoa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    // "mongodb+srv://sulemanjoseph16:stonecore@cluster0.xrgwqoa.mongodb.net/"

  mongoose.connect(dbUrl, {})

  const db = mongoose.connection

  db.on("error", () => {
    console.error.bind(console, "MongoDB connection error:")
    process.exit(1)
  })
  db.once("open", () => {
    console.log("Connected to the database")
  })
}

module.exports = { initializeDatabase }
