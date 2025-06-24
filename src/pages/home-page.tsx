import NoteList from "@/components/note/note-list";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation();
  const { roles } = useAuth();

  const isAdmin = roles?.includes("admin");

  return (
    <div className="pt-6">
      {isAdmin && (
        <div className="text-center text-red-500 font-semibold mb-4">
          Admin
        </div>
      )}
      <h1 className="text-center text-2xl font-bold mb-4">{t("myNotes")}</h1>
      <NoteList />
    </div>
  );
};

export default HomePage;
