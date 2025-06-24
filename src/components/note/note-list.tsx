import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import DeleteModal from "../ui/delete-modal";
import NoteCard from "./note-card";
import NoteListDropdown from "./note-list-dropdown";

type Note = {
  id: string;
  noteText: string;
  priority: string;
  image?: string;
};

const PAGE_SIZE = 10;

const NoteList = () => {
  const { t } = useTranslation();
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [visibleNotes, setVisibleNotes] = useState<Note[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  const navigate = useNavigate();
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("notes");
    const parsed: Note[] = stored ? JSON.parse(stored).reverse() : [];
    setAllNotes(parsed);
  }, []);

  useEffect(() => {
    const filtered = allNotes.filter((n) =>
      n.noteText.toLowerCase().includes(search.toLowerCase())
    );

    let sorted;
    if (sortOrder === "none") {
      sorted = filtered;
    } else {
      sorted = filtered.sort((a, b) => {
        const aPriority = parseInt(a.priority);
        const bPriority = parseInt(b.priority);
        return sortOrder === "asc" ? aPriority - bPriority : bPriority - aPriority;
      });
    }

    setFilteredNotes(sorted);
    setVisibleNotes(sorted.slice(0, PAGE_SIZE));
    setPage(1);
  }, [allNotes, search, sortOrder]);

  const loadMore = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const nextSlice = filteredNotes.slice(0, nextPage * PAGE_SIZE);
      setVisibleNotes(nextSlice);
      setPage(nextPage);
      setLoading(false);
    }, 500);
  }, [filteredNotes, page, loading]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && visibleNotes.length < filteredNotes.length) {
        loadMore();
      }
    });

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [visibleNotes, filteredNotes, loadMore]);

  const handleDeleteClick = (id: string) => {
    setSelectedNoteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!selectedNoteId) return;

    const updatedNotes = allNotes.filter((note) => note.id !== selectedNoteId);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setAllNotes(updatedNotes);
    setShowDeleteModal(false);
    setSelectedNoteId(null);
  };

  const isNoteDataEmpty = allNotes.length === 0;
  const isSearchEmpty = !isNoteDataEmpty && filteredNotes.length === 0;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Input
          placeholder={t("noteList.searchPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
        <NoteListDropdown setSortOrder={setSortOrder} sortOrder={sortOrder} />
      </div>

      {isNoteDataEmpty && (
        <p className="text-center text-gray-500">
          {t("noteList.empty")}
        </p>
      )}
      {isSearchEmpty && (
        <p className="text-center text-gray-500">
          {t("noteList.noSearchResult")}
        </p>
      )}

      {!isNoteDataEmpty &&
        !isSearchEmpty &&
        visibleNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onEdit={(id) => navigate(`/not/${id}/guncelle`)}
            onDelete={handleDeleteClick}
          />
        ))}

      {loading && (
        <div className="flex justify-center py-4">
          <Loader2 className="animate-spin text-gray-500" size={24} />
        </div>
      )}

      <div ref={observerRef}></div>

      <DeleteModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title={t("noteList.confirmDelete")}
      />
    </div>
  );
};

export default NoteList;
