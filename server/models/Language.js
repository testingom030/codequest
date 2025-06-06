import mongoose from 'mongoose';

const languageSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    currentLanguage: {
        type: String,
        enum: ['en', 'es', 'hi', 'pt', 'zh', 'fr'],
        default: 'en'
    },
    verifiedLanguages: [{
        type: String,
        enum: ['en', 'es', 'hi', 'pt', 'zh', 'fr']
    }],
    emailVerified: {
        type: Boolean,
        default: false
    },
    phoneVerified: {
        type: Boolean,
        default: false
    },
    lastVerificationDate: {
        type: Date
    }
});

export default mongoose.model('Language', languageSchema);
