const express=require('express')
const router=express.Router();
const {CreateNote,UpdateNote,GetNotes,DeleteNote}=require('../controller/noteController');
const Authentication = require('../middleware/Authentication');

router.get('/getnotes',Authentication,GetNotes);
router.post('/createnote',Authentication,CreateNote);
router.put('/updatenote/:noteId',Authentication,UpdateNote)
router.delete('/deletenote/:noteId',Authentication,DeleteNote);

module.exports=router