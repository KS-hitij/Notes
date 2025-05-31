import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import NoteCard from "@/components/NoteCard"
import axios from "axios";
import { useEffect, useState } from "react";
export default function Home() {
    const bgColors = ["#93C5FD", "#ff9a72", "#e5ef8e"];
    const [notes, setNotes] = useState([]);
    useEffect(()=>{
        async function getData() {
            const response = await axios.get("http://localhost:3000/notes");
            setNotes(response.data.data);
        }
        getData();
    },[])
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData(e.target);
            const text = data.get("text").trim();
            if (text === "") {
                alert("Note can not be empty");
                return;
            }
            console.log("sending req");
            const result = await axios.post("http://localhost:3000/notes", { text });
            if (result.status == 201) {
                const response = await axios.get("http://localhost:3000/notes");
                setNotes(response.data.data);
            } else {
                alert("Note could not be deleted");
            }
        } catch (err) {
            alert("Something went wrong");
            console.log(err);
        }
    }
    const handleDeleteAll =async()=>{
        try{
            const response = await axios.delete("http://localhost:3000/notes/delete");
            if(response.status==200)
                setNotes([]);
            else{
                alert("Notes could not be deleted");
            }
        }catch(err){
            alert("Something went wrong");
            console.log(err);
        }
    }
    const handleDelete= async(id)=>{
        try{
            const response = await axios.delete(`http://localhost:3000/notes/delete/${id}`);
            if(response.status==200)
                setNotes(response.data.data);
            else{
                alert("Notes could not be added");
            }
        }catch(err){
            alert("Something went wrong");
            console.log(err);
        }
    }
    return (
        <div className="h-[100vh] w-[100vw] bg-[#f5f5f5] flex flex-col pl-20 pt-4 overflow-x-hidden" >
            <h1 className="text-6xl font-semibold tracking-tight ">My Notes</h1>
            <div className="mt-4">
                <form className="h-full w-full gap-x-3.5 flex" onSubmit={handleSubmit}>
                    <Input name="text" type="text" className={"w-[25%]"} />
                    <Button variant="outline" className="hover:cursor-pointer" >Add Note</Button>
                    <Button onClick={handleDeleteAll} >Delete All Notes</Button>
                </form>
            </div>
            <div className="flex flex-wrap gap-10 mt-12 mb-8">
                {notes.length > 0 ? (
                    notes.map((note, index) => (
                        <div key={note.id} className="flex flex-col items-center">
                            <NoteCard bgColor={bgColors[index % bgColors.length]} text={note.text}/>
                            <Button className="mt-2 w-[25%]" onClick={()=>handleDelete(note.id)}>Delete Note</Button>
                        </div> ))
                    ) : 
                ( <p className="text-3xl font-bold">No notes yet</p> )}
            </div>
        </div>
    )
}