import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    slug: {
      type: String,
      require: true,
    },
    categorie: {
      type: String,
      require: true,
    },
    title_h1: {
      type: String,
      require: true,
    },
    description_p_1: {
      type: String,
      require: true,
    },
    description_p_2: {
      type: String,
      require: true,
    },
    description_p_3: {
      type: String,
      require: true,
    },
    url_web: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    images: [
      {
        url: String,
        public_id: String,
      },
    ],
    //user: {
    //  type: mongoose.Schema.Types.ObjectId,
    //  ref: "User",
    //  required: true,
    //},
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("task", taskSchema);
