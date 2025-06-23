import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { noteSchema } from "@/schemas/note.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import type { z } from "zod";
type NoteFormData = z.infer<typeof noteSchema>;

const NoteForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    resetField
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
  });
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
    }

    const noteToSave = {
      noteText: data.noteText,
      priority: data.priority,
      image: imageBase64,
    };

    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    notes.push(noteToSave);
    localStorage.setItem("notes", JSON.stringify(notes));

    toast.success("Not eklenmiştir.");
    reset();
  };

  console.log('watch("image")',watch("image"))
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md m-auto p-6 bg-white rounded-md shadow-md space-y-6">
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
        <Label htmlFor="image">Not Görseli (Opsiyonel)</Label>
        <div className="flex items-center space-x-2">
        <Input id="image" type="file" accept="image/*" {...register("image")} />
        {watch("image")?.length > 0 ? <X
          className="cursor-pointer text-gray-600 hover:text-gray-900"
          size={25}
          onClick={() => resetField("image")}
        /> : null}
        </div>
      </div>
      <Button type="submit" className="w-full">
        Kaydet
      </Button>
    </form>
  )
}

export default NoteForm
