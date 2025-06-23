import NoteList from "@/components/note/note-list";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <div className="pt-6">
      <h1 className="text-center text-2xl font-bold mb-4">{t('myNotes')}</h1>
      <NoteList />
    </div>
  )
}

export default HomePage
