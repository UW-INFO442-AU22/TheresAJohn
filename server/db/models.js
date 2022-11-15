import mongoose from 'mongoose';

let models = {};

main().catch(err => console.log(err))

async function main() {
    console.log("connecting to mongodb")
    await mongoose.connect('mongodb+srv://admin:TheresAJohnAdmin@theresajohn.lados5c.mongodb.net/test')
    console.log("connected to mongodb")

    const userSchema = new mongoose.Schema({
        schoolName: String, 
        userName: String, 
        UserEmail: String, 
        schoolAddress: String
    })

    models.User = mongoose.model('User', userSchema)

    const postSchema = new mongoose.Schema({
        userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        resource: String,
        quantity: Number,
        deadline: Date, 
        description: String, 
        datePosted: Date
    })

    models.Post = mongoose.model("Post", postSchema)
    console.log("finished mongodb schema");
}

export default models