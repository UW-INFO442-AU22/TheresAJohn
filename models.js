import mongoose from 'mongoose';

let models = {};

main().catch(err => console.log(err))

async function main() {
    await mongoose.connect('mongodb+srv://admin:TheresAJohnAdmin@theresajohn.lados5c.mongodb.net/test')

    const postSchema = new mongoose.Schema({
        username: String
    })

    models.Post = mongoose.model("Post", postSchema)
}

export default models