import mongoose from "mongoose";
const NoteText = new mongoose.Schema({
    Title:{
      type:String,
      require:true
    },
    Text:{
        type:String,
        required:true
    }
},{timestamps:true});

export const Note = new mongoose.model("Note",NoteText); 