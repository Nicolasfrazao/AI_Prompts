import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required'],
    index: true // Add index to 'tag' field
  }
}, { timestamps: true });

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;
