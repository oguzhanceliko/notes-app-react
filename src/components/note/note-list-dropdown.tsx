import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

type Props = {
  sortOrder: "none" | "asc" | "desc";
  setSortOrder: (order: "none" | "asc" | "desc") => void;
};

const NoteListDropdown = ({ sortOrder, setSortOrder }: Props) => {
  const { t } = useTranslation();

  const getLabel = () => {
    if (sortOrder === "asc") return t("noteListDropdown.ascending");
    if (sortOrder === "desc") return t("noteListDropdown.descending");
    return t("noteListDropdown.none");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {t("noteListDropdown.label")}: {getLabel()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setSortOrder("asc")}>
          {t("noteListDropdown.ascending")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSortOrder("desc")}>
          {t("noteListDropdown.descending")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NoteListDropdown;
