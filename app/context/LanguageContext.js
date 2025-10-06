import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("English");

  const translations = {
    English: {
      // General
      back: "← Home",
      settings: "⚙️ Settings",
      profile: "👤 Profile",
      theme: "🎨 Dark Theme",
      notifications: "🔔 Notifications",
      language: "🌐 Language",
      help: "❓ Help & Support",
      logout: "🚪 Logout",

      // Home / Weather
      enterCity: "Please enter a city name",
      cityNotFound: "City not found",
      search: "Search",
      temperature: "Temperature",
      feelsLike: "Feels Like",
      humidity: "Humidity",
      conditions: "Conditions",

      // Login
      welcomeBack: "Welcome Back",
      loginSubtitle: "Log in to check your weather",
      login: "Log In",
      password: "Password",
      fillFields: "Please fill in all fields",
      loginSuccess: "Login Successful!",
      noAccount: "Don’t have an account?",
      signUp: "Sign Up",

      // Signup
      createAccount: "Create Account",
      alreadyAccount: "Already have an account?",
      signIn: "Sign In",
      confirmPassword: "Confirm Password",
      signupError: "Please fill all fields",
      confirmPass: "Passwords do not match",
      agreeTerms: "You must agree to the terms",
      signupSuccess: "Account created successfully!",

      // Profile
      fullName: "Full Name",
      email: "Email",
      bio: "Bio",
      phone: "Phone",
      birthday: "Birthday",
      gender: "Gender",
      saveChanges: "Save Changes",
      newPassword: "New Password",
      changePassword: "Change Password",
      deleteAccount: "Delete Account",

      // Terms
      termsTitle: "📜 Terms and Conditions",
      termsContent: "By using this app, you agree to our terms...",
      disagree: "Disagree",
      agree: "Agree",
    },

    Filipino: {
      // General
      back: "← Bahay",
      settings: "⚙️ Mga Setting",
      profile: "👤 Profile",
      theme: "🎨 Madilim na Tema",
      notifications: "🔔 Abiso",
      language: "🌐 Wika",
      help: "❓ Tulong at Suporta",
      logout: "🚪 Mag-logout",

      // Home / Weather
      enterCity: "Pakilagay ang pangalan ng lungsod",
      cityNotFound: "Hindi makita ang lungsod",
      search: "Hanapin",
      temperature: "Temperatura",
      feelsLike: "Parang",
      humidity: "Halumigmig",
      conditions: "Kondisyon",

      // Login
      welcomeBack: "Maligayang Pagbabalik",
      loginSubtitle: "Mag-login upang tingnan ang panahon",
      login: "Mag-login",
      password: "Password",
      fillFields: "Pakilagay ang lahat ng fields",
      loginSuccess: "Matagumpay na pag-login!",
      noAccount: "Wala ka pang account?",
      signUp: "Mag-sign up",

      // Signup
      createAccount: "Gumawa ng Account",
      alreadyAccount: "May account ka na?",
      signIn: "Mag-login",
      confirmPassword: "Kumpirmahin ang Password",
      signupError: "Pakilagay ang lahat ng fields",
      confirmPass: "Hindi tugma ang mga password",
      agreeTerms: "Kailangan mong sumang-ayon sa terms",
      signupSuccess: "Matagumpay na nagawa ang account!",

      // Profile
      fullName: "Buong Pangalan",
      email: "Email",
      bio: "Bio",
      phone: "Telepono",
      birthday: "Kaarawan",
      gender: "Kasarian",
      saveChanges: "I-save",
      newPassword: "Bagong Password",
      changePassword: "Palitan ang Password",
      deleteAccount: "Burahin ang Account",

      // Terms
      termsTitle: "📜 Mga Tuntunin at Kondisyon",
      termsContent: "Sa paggamit ng app na ito, sumasang-ayon ka...",
      disagree: "Hindi Sang-ayon",
      agree: "Sang-ayon",
    },

    Spanish: {
      // General
      back: "← Inicio",
      settings: "⚙️ Configuración",
      profile: "👤 Perfil",
      theme: "🎨 Tema Oscuro",
      notifications: "🔔 Notificaciones",
      language: "🌐 Idioma",
      help: "❓ Ayuda y Soporte",
      logout: "🚪 Cerrar sesión",

      // Home / Weather
      enterCity: "Por favor ingresa una ciudad",
      cityNotFound: "Ciudad no encontrada",
      search: "Buscar",
      temperature: "Temperatura",
      feelsLike: "Sensación",
      humidity: "Humedad",
      conditions: "Condiciones",

      // Login
      welcomeBack: "Bienvenido de nuevo",
      loginSubtitle: "Inicia sesión para ver el clima",
      login: "Iniciar sesión",
      password: "Contraseña",
      fillFields: "Por favor completa todos los campos",
      loginSuccess: "¡Inicio de sesión exitoso!",
      noAccount: "¿No tienes una cuenta?",
      signUp: "Regístrate",

      // Signup
      createAccount: "Crear Cuenta",
      alreadyAccount: "¿Ya tienes una cuenta?",
      signIn: "Inicia sesión",
      confirmPassword: "Confirmar Contraseña",
      signupError: "Por favor completa todos los campos",
      confirmPass: "Las contraseñas no coinciden",
      agreeTerms: "Debes aceptar los términos",
      signupSuccess: "¡Cuenta creada con éxito!",

      // Profile
      fullName: "Nombre Completo",
      email: "Correo",
      bio: "Biografía",
      phone: "Teléfono",
      birthday: "Cumpleaños",
      gender: "Género",
      saveChanges: "Guardar Cambios",
      newPassword: "Nueva Contraseña",
      changePassword: "Cambiar Contraseña",
      deleteAccount: "Eliminar Cuenta",

      // Terms
      termsTitle: "📜 Términos y Condiciones",
      termsContent: "Al usar esta aplicación, aceptas nuestros términos...",
      disagree: "Rechazar",
      agree: "Aceptar",
    },

    Japanese: {
      // General
      back: "← ホーム",
      settings: "⚙️ 設定",
      profile: "👤 プロフィール",
      theme: "🎨 ダークテーマ",
      notifications: "🔔 通知",
      language: "🌐 言語",
      help: "❓ ヘルプとサポート",
      logout: "🚪 ログアウト",

      // Home / Weather
      enterCity: "都市名を入力してください",
      cityNotFound: "都市が見つかりません",
      search: "検索",
      temperature: "気温",
      feelsLike: "体感",
      humidity: "湿度",
      conditions: "天気",

      // Login
      welcomeBack: "お帰りなさい",
      loginSubtitle: "天気を見るにはログインしてください",
      login: "ログイン",
      password: "パスワード",
      fillFields: "すべての項目を入力してください",
      loginSuccess: "ログイン成功！",
      noAccount: "アカウントをお持ちでないですか？",
      signUp: "新規登録",

      // Signup
      createAccount: "アカウントを作成",
      alreadyAccount: "すでにアカウントをお持ちですか？",
      signIn: "ログイン",
      confirmPassword: "パスワード確認",
      signupError: "すべての項目を入力してください",
      confirmPass: "パスワードが一致しません",
      agreeTerms: "利用規約に同意してください",
      signupSuccess: "アカウント作成成功！",

      // Profile
      fullName: "氏名",
      email: "メール",
      bio: "自己紹介",
      phone: "電話番号",
      birthday: "誕生日",
      gender: "性別",
      saveChanges: "変更を保存",
      newPassword: "新しいパスワード",
      changePassword: "パスワードを変更",
      deleteAccount: "アカウント削除",

      // Terms
      termsTitle: "📜 利用規約",
      termsContent: "このアプリを使用すると、利用規約に同意したことになります。",
      disagree: "同意しない",
      agree: "同意する",
    },
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
