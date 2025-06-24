import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center py-20">
      <div className="max-w-md w-full space-y-8 text-center">
        <h2 className="text-3xl font-bold dark:text-white">
          {t("login2.title")}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {t("login2.description")}
        </p>
        <button
          onClick={login}
          className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700"
        >
          {t("login2.button")}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
