const Note=require('../models/Note')
const CreateNote = async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // Create new note instance
        const note = new Note({
            UserId: req.userId,  // Assuming you have userId set by auth middleware
            title,
            description,
            tag
        });

        // Save note to database
        await note.save();

        res.status(201).json(note);  // 201 is standard for successful resource creation
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
 
const DeleteNote=async(req,res)=>{
   try{
    const {noteId}=req.params 
    const isNotePresent= await Note.findById(noteId);
    if(!isNotePresent){
        return res.status(404).json({message:"Note not found"})
    }
    let notes=await Note.findByIdAndDelete(noteId)
    
     
     res.status(200).json({notes,message:"Deleted Successfully"})
   }
   catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
const UpdateNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        
        const isNotePresent = await Note.findById(noteId);
        if (!isNotePresent) {
            return res.status(404).json({ message: "Note not found" });
        }

        const { title, description, tag } = req.body;

        let newNote = {};
        if (title) newNote.title = title;
        if (description) newNote.description = description;
        if (tag) newNote.tag = tag;

        const updatedNotes = await Note.findByIdAndUpdate(noteId, newNote, { new: true });

        res.status(200).json({
            message: "Note Successfully Updated",
            updatedNotes
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const GetNotes=async(req,res)=>{
    try{
     
        let notes=await Note.find({UserId:req.userId}) //find notes using userId
        res.status(200).json(notes) 
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}

module.exports={CreateNote,UpdateNote,GetNotes,DeleteNote}