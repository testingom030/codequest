import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: '/default-avatar.svg'
  },
  phoneNumber: {
    type: String,
    unique: true,
    sparse: true,
  },
  preferredLanguage: {
    type: String,
    enum: ['en', 'es', 'hi', 'pt', 'zh', 'fr'],
    default: 'en'
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  lastPostDate: {
    type: Date
  },
  postsToday: {
    type: Number,
    default: 0
  },
  reputation: {
    type: Number,
    default: 0,
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  phoneVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to check if user can post today
userSchema.methods.canPost = function() {
  const friendCount = this.friends.length;
  
  // No friends = no posting
  if (friendCount === 0) return false;
  
  // Reset posts count if it's a new day
  const now = new Date();
  if (!this.lastPostDate || now.getDate() !== this.lastPostDate.getDate()) {
    this.postsToday = 0;
    return true;
  }
  
  // Determine max posts based on friend count
  let maxPosts = 1; // Default - 1 post per day
  if (friendCount >= 2 && friendCount < 10) {
    maxPosts = 2;
  } else if (friendCount >= 10) {
    maxPosts = Infinity;
  }
  
  return this.postsToday < maxPosts;
};

// Helper method to increment posts count
userSchema.methods.incrementPostCount = async function() {
  this.postsToday = (this.postsToday || 0) + 1;
  this.lastPostDate = new Date();
  await this.save();
};

export default mongoose.model('User', userSchema);
