import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://abraham:nazvidanie123@crudmern.rskjgkq.mongodb.net/dash_back?retryWrites=true&w=majority&appName=CrudMern"
    );
    console.log(">>> DB is connected");
  } catch (error) {
    console.log(error);
  }
};
