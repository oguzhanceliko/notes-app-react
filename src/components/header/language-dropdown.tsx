import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";


const LanguageDropdown = () => {
    const { t, i18n } = useTranslation();

  const changeLang = (lang: "tr" | "en") => {
    i18n.changeLanguage(lang);
  };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="outline">{i18n.language === "tr" ? t('TR') : t('EN')}</Button></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => changeLang("tr")}>TR</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLang("en")}>EN</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default LanguageDropdown
