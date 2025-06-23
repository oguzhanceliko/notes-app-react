import NoteForm from "@/components/forms/note-form";
import type { noteSchema } from "@/schemas/note.schema";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { z } from "zod";
type NoteFormData = z.infer<typeof noteSchema>;

const EditNotePage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [noteData, setNoteData] = useState<NoteFormData | null>(null);

     useEffect(() => {
    if (id) {
      const notes = JSON.parse(localStorage.getItem("notes") || "[]");
      const note = notes.find((n: any) => n.id === id);
      if (note) {
        setNoteData(note);
      } else {
        navigate('/');
      }
    }
  }, [id]);

  return (
    <div className="py-14"><NoteForm noteData={noteData} setNoteData={setNoteData} /></div>
  )
}

export default EditNotePage
