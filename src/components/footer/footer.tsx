import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-800 text-white dark:border-t dark:border-gray-700">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <p>&copy; 2025 {t("footer.copyright")}</p>
          <p className="text-sm text-gray-400 mt-2">
            {t("footer.builtWith")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
