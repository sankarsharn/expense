import mongoose from "mongoose";

const formSchema = mongoose.Schema(
  {
    userId: {  
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    tracker: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Form = mongoose.model("Form", formSchema);
export default Form;