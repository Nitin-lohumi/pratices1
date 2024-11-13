import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import MakeConnection from '../DB_connect/connect.js';
import { Note } from '../Model/TextModel.js';
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
MakeConnection();
app.get('/',(req,res)=>{
    res.redirect('/NoteApp/read');
});
app.post('/NoteApp',async(req,res)=>{
    const {Title,Text} = req.body;
    try {
        const NoteModel = new Note({Title,Text});
        await NoteModel.save(); 
        res.status(200).json({ message: "suceess ", sucess: true });
    } catch (error) {
        res.status(400).json({ message: "Error is occurs ", sucess: false});
    }
})
app.get('/NoteApp/read',async (req,res)=>{
    try {
        const note = await Note.find();
        res.send(note);
    } catch (error) {
        console.log(error);
    }
})
app.post("/NoteApp/delete/:title",async (req,res)=>{
    try {
         const DeleteUser = await Note.findOneAndDelete({Title:req.params.title});
         if (!DeleteUser) return res.status(404).json({ error: 'User not found' });
         res.json({ message: 'User deleted' });
    } catch (error){
        res.status(500).json({ error: error.message });
    }
})
app.post("/NoteApp/update/:title",async (req,res)=>{
    try {
       const {Text} = req.body;
       const update=  await Note.findOneAndUpdate({Title:req.params.title},{Text:Text},{new:true});
       res.json(update);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

app.listen(3000,()=>{
    console.log("this is running at port number 3000");
})