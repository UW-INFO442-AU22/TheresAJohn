import mongoose from 'mongoose';

let models = {};

main().catch(err => console.log(err))

async function main() {
    console.log("connecting to mongodb")
    // TODO: need to change to prod
    await mongoose.connect('mongodb+srv://admin:TheresAJohnAdmin@theresajohn.lados5c.mongodb.net/test')
    console.log("connected to mongodb")

    const userSchema = new mongoose.Schema({
        fullName: { type: String, default: null },
        email: { type: String, unique: true },
        password: { type: String },
        schoolName: { type: String, default: null }
    })

    models.User = mongoose.model('User', userSchema)

    const postSchema = new mongoose.Schema({
        contactEmail: { type: String },
        personOfContact: { type: String },
        schoolLink: { type: String },
        resource: { type: String, default: null },
        quantity: { type: Number, default: 1 },
        quantityDonated: { type: Number, default: 0 },
        description: { type: String, default: null },
        completed: { type: Boolean, default: false },
        datePosted: { type: Date }
    })

    models.Post = mongoose.model("Post", postSchema)
    console.log("finished mongodb schema");
}

export default models