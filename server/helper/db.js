const mongoose = require('mongoose')
const connectToMongoDB = async () => {
    await mongoose.connect(`mongodb+srv://${process.env.user}:${process.env.password}@blogging.gxq08ji.mongodb.net/${process.env.database}?retryWrites=true&w=majority`).then(res => console.log("connected")).catch(err => console.log("err"))
}

module.exports = connectToMongoDB;