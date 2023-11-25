import mongoose from "mongoose";
const Schema = mongoose.Schema;


/**
 * @openapi
 * components:
 *  schemas:
 *    TaskInput:
 *      type: object
 *      required:
 *        - title
 *      properties:
 *        title:
 *          type: string
 *          default: task name
 *    TaskResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        title:
 *          type: string
 *        timestamp:
 *          type: string
 */

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