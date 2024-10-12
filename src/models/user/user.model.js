import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user',
		},
	},
	{ timestamps: true },
);

userSchema.pre('save', function (next) {
	if (!this.userId) {
		this.userId = this._id; // Клонируем _id в userId
	}
	next();
});

// Before saving, hash the password
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

userSchema.methods.comparePassword = async function (password) {
	try {
		return await bcrypt.compare(password, this.password);
	} catch (error) {
		throw new Error("Password comparison failed");
	}
};

userSchema.statics.isValidObjectId = (userId) => {
	return mongoose.Types.ObjectId.isValid(userId);
};

const User = mongoose.model('User', userSchema, 'users');

export default User;
