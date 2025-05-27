import mongoose from "mongoose";
 const userschema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    phoneVerified: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false },
    about: { type: String },
    tags: { type: [String] },
    joinedon: { type: Date, default: Date.now },
    avatar: {
        type: String,
        default: 'https://www.gravatar.com/avatar/?d=identicon'
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    phoneNumber: { type: String },
    language: { type: String, default: 'en' },
    lastPostDate: { type: Date },
    postCount: { type: Number, default: 0 }
})

 export default mongoose.model("User",userschema)