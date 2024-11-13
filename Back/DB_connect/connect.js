import mongoose from "mongoose";
// pass -> Notes 
const url  = "mongodb+srv://NoteApp:Notes@noteappdb.reic3.mongodb.net/?retryWrites=true&w=majority&appName=NoteAppDB";
async function MakeConnection(){
    try {
        await mongoose.connect(url);
        console.log("connect to Database");
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export default MakeConnection;