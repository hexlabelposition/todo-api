import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		status: {
			type: String,
			enum: [
				'to-do',
				'in-progress',
				'in-review',
				'completed',
				'blocked',
				'canceled',
				'on-hold',
				'backlog',
			],
			default: 'to-do',
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true },
);

const Task = mongoose.model('Task', taskSchema, 'tasks');

export default Task;
