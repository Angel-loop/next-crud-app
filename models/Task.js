import { Schema, model, models } from "mongoose";


const taskSchema = new Schema({
    title: {
        type: "string",
        required: [true, 'Title is required'],
        unique: true,
        trim: true,
        maxlength: [40, 'Title must be less than 40 characters']
    },
    description: {
        type: "string",
        required: true,
        trim: true,
        maxlength: [240, 'Description must be less than 240 characters']
    }

}, {
    timestamps: true,
})

export default models.Task || model('Task', taskSchema)

