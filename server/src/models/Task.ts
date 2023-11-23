import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	timestamp: {
		type: String,
		default: Date.now()
	}
});

const TaskModel = mongoose.model("Task", TaskSchema);

export default TaskModel