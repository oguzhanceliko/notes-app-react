import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

type Props={
    sortOrder: "none" | "asc" | "desc";
    setSortOrder: (order: "none" | "asc" | "desc") => void;
}
const NoteListDropdown = ({ sortOrder, setSortOrder }: Props) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="outline">Öncelik:{sortOrder === "asc" ? "Artan" : "Azalan"}</Button></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortOrder("asc")}>Artan</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder("desc")}>Azalan</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default NoteListDropdown
