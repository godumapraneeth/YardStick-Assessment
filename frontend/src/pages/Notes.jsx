import { useEffect,useState } from "react";
import api from "../api/axios";
import NoteCard from "../components/NoteCard";
import UpgradeBanner from "../components/UpgradeBanner";
import { useAuth } from "../context/AuthContext";

export default function Notes(){
    const [notes,setNotes]=useState([]);
    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");
    const {user}=useAuth();

    const fetchNotes=async () =>{
      try{
        const res=await api.get("/notes");
        setNotes(res.data);
      }catch(err){
        console.error(err);
      }
    };

    useEffect(()=>{
        fetchNotes();
    },[]);

    const addNote=async (e) =>{
        e.preventDefault();
        try{
            await api.post("/notes",{title,content});
            setTitle("");
            setContent("");
            fetchNotes();
        }catch(err){
            alert(err.response?.data?.message || "Error creating note");
        }
    };

    const deleteNote=async (id) =>{
        await api.delete(`/notes/${id}`);
        fetchNotes()
    };

    const editNote=async (note) =>{
        const newTitle=prompt("Edit title: ",note.title);
        const newContent=prompt("Edit content: ",note.content);
        if(newTitle && newContent){
            await api.put(`/notes/${note._id}`,{
                title:newTitle,
                content:newContent,
            });
            fetchNotes();
        }
    };

    return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-indigo-600">Your Notes</h2>

      {user?.tenant?.plan ==="free" && <UpgradeBanner tenant={user.tenant.slug} />}

      <form onSubmit={addNote} className="bg-white p-4 shadow rounded flex space-x-4">
        <input
          type="text"
          placeholder="Title"
          className="flex-1 p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Content"
          className="flex-1 p-2 border rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
          Add
        </button>
      </form>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            onDelete={deleteNote}
            onEdit={editNote}
          />
        ))}
      </div>
    </div>
  );
}