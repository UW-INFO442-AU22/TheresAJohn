import mongoose from 'mongoose';

let models = {};

main().catch(err => console.log(err))

async function main() {
    await mongoose.connect()

    const postSchema = new mongoose.Schema({
        
    })

    models.Post = mongoose.model("Post", postSchema)
}

export default models