const { nanoid } = require("nanoid");
let notes = require("../store");

module.exports.getNotes = async(req,res)=>{
    res.status(200).json({
        data:notes
    });
}

module.exports.addNotes = async(req,res)=>{
    const {text} = req.body;
    if(!text || text.trim()===""){      //if text is empty string
        return res.status(400).json({message:"Text can not be empty."});
    }
    const note={
        id:nanoid(),
        text:text.trim()
    }
    notes.push(note);
    res.status(201).json({message:"Note added successfully"});
}

module.exports.deleteNote = async(req,res)=>{
    const {id} = req.params;
    if(!id){
        return res.status(204).json({message:"No note selected"});
    }
    notes = notes.filter(note=>note.id!=id);
    res.status(200).json({data:notes});
}

module.exports.deleteAllNotes= async(req,res)=>{
    notes.length=0;
    res.status(200).json({data:notes});
}
