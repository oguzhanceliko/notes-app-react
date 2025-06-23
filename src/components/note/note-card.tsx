import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

type Note = {
    id: string;
    noteText: string;
    priority: string;
    image?: string;
};

type NoteCardProps = {
    note: Note;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
};

const NoteCard = ({ note, onEdit, onDelete }: NoteCardProps) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div className="relative flex items-start gap-4 p-4 rounded border dark:border bg-white dark:bg-gray-900 shadow hover:shadow-lg transition group">
            {note.image ? (
                <div className="w-[30px] h-[30px] flex-shrink-0 rounded overflow-hidden">
                    {!imageLoaded && <Skeleton className="w-full h-full rounded" />}
                    <img
                        src={note.image}
                        alt="Not Görseli"
                        loading="lazy"
                        className={`w-full h-full object-cover rounded ${imageLoaded ? "opacity-100" : "opacity-0"
                            } transition-opacity duration-300`}
                        onLoad={() => setImageLoaded(true)}
                    />
                </div>
            ) : (
                <img src="/sticky-note.svg"
                    alt="sticky"
                    className="w-[30px] h-[30px] object-cover rounded"
                />
            )}
            <div className="flex-1">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Öncelik: {note.priority}
                </p>
                <p className="text-base font-medium text-gray-900 dark:text-white">
                    {note.noteText}
                </p>
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition space-x-2">
                <Button size="sm" onClick={() => onEdit(note.id)}>
                    Düzenle
                </Button>
                <Button size="sm" variant="destructive" onClick={() => onDelete(note.id)}>
                    Sil
                </Button>
            </div>
        </div>
    );
};

export default NoteCard;
