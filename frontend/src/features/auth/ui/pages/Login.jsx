import { useState } from "react";
import { AuthHook } from "../../hook/AuthHook";

const Login = () => {
    const { handleGoogleLogin, loading }=AuthHook()

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-5">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-4xl shadow-2xl p-8">
                    <div className="flex justify-center">
                        <div className="h-20 w-20 rounded-3xl bg-green-100 flex items-center justify-center text-4xl">
                            💬
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold text-center mt-6 text-gray-900">
                        Chat Freely
                    </h1>

                    <p className="text-center text-gray-500 mt-3 leading-relaxed">
                        Connect with friends, share moments and continue your
                        conversations with a single click.
                    </p>

                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className={`
                            mt-8 w-full h-14 rounded-2xl border
                            flex items-center justify-center gap-3
                            font-semibold transition-all duration-200
                            cursor-pointer active:scale-95
                            ${loading
                                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                                : "bg-white hover:bg-gray-50 border-gray-300"
                            }
                        `}
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                                Connecting...
                            </>
                        ) : (
                            <>
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 48 48"
                                >
                                    <path
                                        fill="#FFC107"
                                        d="M43.611 20.083H42V20H24v8h11.303C33.655 32.657 29.195 36 24 36c-6.627 0-12-5.373-12-12S17.373 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                                    />
                                    <path
                                        fill="#FF3D00"
                                        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4c-7.682 0-14.318 4.337-17.694 10.691z"
                                    />
                                    <path
                                        fill="#4CAF50"
                                        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.141 35.091 26.715 36 24 36c-5.175 0-9.628-3.329-11.283-7.946l-6.522 5.025C9.535 39.556 16.227 44 24 44z"
                                    />
                                    <path
                                        fill="#1976D2"
                                        d="M43.611 20.083H42V20H24v8h11.303a12.02 12.02 0 0 1-4.084 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                                    />
                                </svg>

                                Continue with Google
                            </>
                        )}
                    </button>

                    <p className="text-center text-xs text-gray-400 mt-6">
                        Secure authentication powered by Google
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;