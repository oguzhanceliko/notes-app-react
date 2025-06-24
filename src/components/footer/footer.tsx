import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800  dark:border-t dark:border-gray-700">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <p>&copy; 2025 {t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
