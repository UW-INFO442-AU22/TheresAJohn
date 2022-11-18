import mongoose from 'mongoose';

let models = {};

main().catch(err => console.log(err))

async function main() {
    console.log("connecting to mongodb")
    await mongoose.connect('mongodb+srv://admin:TheresAJohnAdmin@theresajohn.lados5c.mongodb.net/test')
    console.log("connected to mongodb")

    const userSchema = new mongoose.Schema({
        firstName: { type: String, default: null },
        lastName: { type: String, default: null }, 
        email: { type: String, unique: true }, 
        password: { type: String },
        schoolName: { type: String, default: null }, 
        schoolAddress: { type: String, default: null }
    })

    models.User = mongoose.model('User', userSchema)

    const postSchema = new mongoose.Schema({
        userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        resource: { type: String, default: null },
        quantity: { type: Number, default: 1 },
        deadline: { type: Date, default: new Date(9999, 12, 31)}, 
        description: { type: String, default: null }, 
        datePosted: { type: Date }
    })

    models.Post = mongoose.model("Post", postSchema)
    console.log("finished mongodb schema");
}

export default models