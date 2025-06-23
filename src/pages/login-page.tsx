import { useAuth } from '@/context/AuthContext';
import loginSchema from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

// import { useAuth } from '../auth/useAuth'; // kendi auth hook'un

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema), });
    const [authError, setAuthError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();



    const onSubmit = (data: any) => {
        setAuthError('');
        setLoading(true);
        const { username, password } = data;

        if (username === 'admin' && password === '12345') {
            const token= 'demo-token'
            login(token);
            navigate('/');
        } else {
            setAuthError('Geçersiz kullanıcı adı veya şifre');
        }

        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center py-20">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Giriş Yap
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Hesabınıza giriş yapın
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Kullanıcı Adı
                        </label>
                        <input
                            id="username"
                            {...register('username', { required: 'Kullanıcı adı gerekli' })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm
                   bg-white dark:bg-gray-800 text-black dark:text-white
                   focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Kullanıcı adınızı girin"
                        />
                        {errors.username && <p className="text-sm text-red-600 mt-1">{errors.username.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Şifre
                        </label>
                        <input
                            id="password"
                            type="password"
                            {...register('password', { required: 'Şifre gerekli' })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm
                   bg-white dark:bg-gray-800 text-black dark:text-white
                   focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Şifrenizi girin"
                        />
                        {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
                    </div>

                    {authError && (
                        <div className="mt-2 p-3 bg-red-100 dark:bg-red-950 border border-red-400 text-red-700 dark:text-red-400 rounded">
                            {authError}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm
                   text-sm font-medium text-white bg-blue-600 hover:bg-blue-700
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                   disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                        </button>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded">
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                            <strong>Demo Bilgileri:</strong><br />
                            Kullanıcı Adı: admin<br />
                            Şifre: 12345
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
