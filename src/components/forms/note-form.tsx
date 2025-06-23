import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { noteSchema } from "@/schemas/note.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import type { z } from "zod";
import FileUpload from "../ui/file-upload";
type NoteFormData = z.infer<typeof noteSchema>;

type Props = {
  noteData?: NoteFormData | null;
  setNoteData?: (data: NoteFormData | null) => void;
}
const NoteForm = ({ noteData, setNoteData }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
  });
  useEffect(() => {
    if (noteData) {
      reset({
        noteText: noteData.noteText,
        priority: noteData.priority,
      });
    }
  }, [noteData, reset]);


  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });

  const onSubmit = async (data: NoteFormData) => {
    let imageBase64 = "";

    if (data.image && data.image.length > 0) {
      const file = data.image[0];
      imageBase64 = await toBase64(file);
    } else if (noteData?.image && (!data.image || data.image.length === 0)) {
      imageBase64 = noteData.image;
    }

    const id = noteData?.id || Math.random().toString(36).substring(2, 10);

    const noteToSave = {
      id: id,
      noteText: data.noteText,
      priority: data.priority,
      image: imageBase64,
    };

    try {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    const existingIndex = notes.findIndex((n: any) => n.id === id);

    if (existingIndex > -1) {
      notes[existingIndex] = noteToSave;
    } else {
      notes.push(noteToSave);
    }
    localStorage.setItem("notes", JSON.stringify(notes));

    toast.success(existingIndex > -1 ? "Not güncellenmiştir." : "Not eklenmiştir.");
    reset();
    setNoteData?.(noteToSave);
  } catch (error) {
    if (
      error instanceof DOMException &&
      (error.name === "QuotaExceededError")
    ) {
      toast.error("LocalStorage dolu, not kaydedilemedi!");
    } else {
      toast.error("Bir hata oluştu, not kaydedilemedi.");
    }
  }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md m-auto bg-white p-6 rounded-md shadow-md space-y-6 dark:bg-gray-800 dark:text-white dark:border dark:border-gray-700">
      <div>
        <Label htmlFor="noteText">
          Not Bilgisi <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="noteText"
          rows={4}
          placeholder="Notunuzu girin"
          {...register("noteText")}
          className="resize-none"
        />
        {errors.noteText && <p className="text-sm text-red-600 mt-1">{errors.noteText.message}</p>}
      </div>
      <div>
        <Label htmlFor="priority">Öncelik Derecesi (0-5)</Label>
        <Input
          id="priority"
          type="text"
          placeholder="0-5 arasında bir sayı"
          {...register("priority")}
          onChange={(e) => {
            const value = e.target.value
            if (!/^[0-5]?$/.test(value)) {
              e.target.value = value.slice(0, -1);
            }
          }}
        />
        {errors.priority && <p className="text-sm text-red-600 mt-1">{errors.priority.message}</p>}
      </div>
      <div>
        <FileUpload
          value={watch("image")}
          onChange={(files) => {
            setValue("image", files);
          }}
          existingImage={noteData?.image}
        />
        {typeof errors.image?.message === "string" && (
          <p className="text-sm text-red-600 mt-1">{errors.image?.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full">
        Kaydet
      </Button>
    </form>
  )
}

export default NoteForm
