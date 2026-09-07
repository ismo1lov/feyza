import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "uz" | "ru";

interface Translations {
  [key: string]: { uz: string; ru: string };
}

const translations: Translations = {
  // Navbar
  "nav.home": { uz: "Bosh sahifa", ru: "Главная" },
  "nav.services": { uz: "Xizmatlar", ru: "Услуги" },
  "nav.gallery": { uz: "Galereya", ru: "Галерея" },
  "nav.faq": { uz: "FAQ", ru: "FAQ" },
  "nav.contact": { uz: "Aloqa", ru: "Контакты" },

  // Hero
  "hero.subtitle": { uz: "Feyza Aura Studio", ru: "Feyza Aura Студия" },
  "hero.title1": { uz: "Tabiiy", ru: "Раскройте Вашу" },
  "hero.title2": { uz: "Go'zalligingizni Kashf Eting", ru: "Естественную Красоту" },
  "hero.desc": {
    uz: "O'zingizga g'amxo'rlik va ishonch uyg'unlashgan makon. Qulaylik va nafislik muhitida premium go'zallik xizmatlarini his eting.",
    ru: "Пространство, где забота о себе встречается с уверенностью. Испытайте премиальные бьюти-процедуры в атмосфере комфорта и элегантности.",
  },
  "hero.cta": { uz: "Jonatish", ru: "Отправить" },

  // Services
  "services.label": { uz: "Biz nima taklif qilamiz", ru: "Что мы предлагаем" },
  "services.title": { uz: "Bizning Xizmatlar", ru: "Наши Услуги" },
  "services.manicure": { uz: "Smart Manikur & Pedikur", ru: "Смарт Маникюр & Педикюр" },
  "services.manicure.desc": {
    uz: "Premium mahsulotlar bilan mukammal, uzoq muddatli natijalar uchun tirnoq parvarishi.",
    ru: "Уход за ногтями премиум-класса для безупречного и долговечного результата.",
  },
  "services.massage": { uz: "Massaj & Hijoma", ru: "Массаж & Хиджама" },
  "services.massage.desc": {
    uz: "Muvozanatni tiklash, taranglikni yo'qotish va sog'liqni tiklash muolajalari.",
    ru: "Терапевтические процедуры для восстановления баланса и снятия напряжения.",
  },
  "services.laminatsiya": { uz: "Laminatsiya", ru: "Ламинация" },
  "services.laminatsiya.desc": {
    uz: "Kiprik va qosh laminatsiyasi — tabiiy ko'tarilgan, to'liq ko'rinish.",
    ru: "Ламинация ресниц и бровей для естественно приподнятого, пышного взгляда.",
  },
  "services.depilation": { uz: "Depilatsiya", ru: "Депиляция" },
  "services.depilation.desc": {
    uz: "Minimal noqulaylik bilan yumshoq, samarali soch olib tashlash.",
    ru: "Нежная и эффективная эпиляция для шелковистой гладкой кожи.",
  },

  // About
  "about.label": { uz: "Bizning tarix", ru: "Наша история" },
  "about.title": { uz: "Feyza Aura haqida", ru: "О Feyza Aura" },
  "about.desc": {
    uz: "Feyza Aura'da biz har bir ayol o'zini ishonchli va go'zal his qilishiga ishonamiz. Bizning studiyamiz zamonaviy texnikalarni iliq muhit bilan birlashtiradi.",
    ru: "В Feyza Aura мы верим, что каждая женщина заслуживает чувствовать себя уверенной и красивой. Наша студия сочетает современные техники с тёплой атмосферой.",
  },
  "about.hygiene": { uz: "Gigiyena birinchi", ru: "Гигиена прежде всего" },
  "about.hygiene.desc": {
    uz: "Har bir muolaja uchun steril asboblar va premium bir martalik materiallar.",
    ru: "Стерильные инструменты и одноразовые материалы премиум-класса.",
  },
  "about.professional": { uz: "Professional parvarish", ru: "Профессиональный уход" },
  "about.professional.desc": {
    uz: "Ko'p yillik tajribaga ega sertifikatlangan mutaxassislar.",
    ru: "Сертифицированные специалисты с многолетним опытом.",
  },
  "about.comfort": { uz: "Sizning qulayligingiz", ru: "Ваш комфорт" },
  "about.comfort.desc": {
    uz: "Sizni qulay his qiladigan shinam, mehmondo'st makon.",
    ru: "Уютное, гостеприимное пространство для вашего комфорта.",
  },

  // Gallery
  "gallery.label": { uz: "Bizning ishlarimiz", ru: "Наши работы" },
  "gallery.title": { uz: "Galereya", ru: "Галерея" },
  "gallery.loadMore": { uz: "Ko'proq ko'rish", ru: "Показать больше" },
  "gallery.showLess": { uz: "Kamroq ko'rish", ru: "Показать меньше" },

  // Booking
  "booking.label": { uz: "So'rov yuborish", ru: "Отправить заявку" },
  "booking.title": { uz: "So'rov yuborish", ru: "Отправить заявку" },
  "booking.name": { uz: "Ismingiz", ru: "Ваше имя" },
  "booking.phone": { uz: "+998 XX XXX XX XX", ru: "+998 XX XXX XX XX" },
  "booking.message": { uz: "Sizning xabaringiz", ru: "Ваше сообщение" },
  "booking.submit": { uz: "Jonatish", ru: "Отправить" },
  "booking.sent": { uz: "✓ So'rov yuborildi!", ru: "✓ Заявка отправлена!" },

  // Contact
  "contact.label": { uz: "Biz bilan bog'laning", ru: "Свяжитесь с нами" },
  "contact.title": { uz: "Aloqa", ru: "Контакты" },
  "contact.phone": { uz: "Telefon", ru: "Телефон" },
  "contact.location": { uz: "Manzil", ru: "Адрес" },
  "contact.locationValue": { uz: "Toshkent, O'zbekiston", ru: "Ташкент, Узбекистан" },
  "contact.inProgress": { uz: "Jarayonda...", ru: "В процессе..." },

  // FAQ
  "faq.label": { uz: "Savollaringiz bormi?", ru: "Есть вопросы?" },
  "faq.title": { uz: "FAQ", ru: "Часто задаваемые вопросы" },
  "faq.q1": { uz: "Ish vaqtingiz qachon?", ru: "Какой у вас график работы?" },
  "faq.a1": { uz: "Biz har kuni 09:00 dan 20:00 gacha ishlaymiz.", ru: "Мы работаем ежедневно с 09:00 до 20:00." },
  "faq.q2": { uz: "Oldindan yozilish shartmi?", ru: "Обязательна ли предварительная запись?" },
  "faq.a2": { uz: "Ha, xizmat ko'rsatish sifatini ta'minlash uchun oldindan yozilishni tavsiya qilamiz.", ru: "Да, мы рекомендуем записываться заранее, чтобы гарантировать наличие свободного времени." },
  "faq.q3": { uz: "To'lov usullari qanday?", ru: "Какие есть способы оплаты?" },
  "faq.a3": { uz: "Biz naqd pul va karta orqali to'lovlarni qabul qilamiz.", ru: "Мы принимаем оплату наличными и через карты." },

  // Reviews
  "reviews.label": { uz: "Mijozlarimizdan so'rang", ru: "Спросите наших клиентов" },
  "reviews.title": { uz: "Mijozlar fikrlari", ru: "Отзывы клиентов" },
  "reviews.r1.name": { uz: "Madina", ru: "Мадина" },
  "reviews.r1.text": { uz: "Juda ajoyib xizmat! Manikur sifatli va chiroyli chiqdi.", ru: "Очень отличный сервис! Маникюр получился качественным и красивым." },
  "reviews.r2.name": { uz: "Elena", ru: "Елена" },
  "reviews.r2.text": { uz: "Massajdan keyin o'zimni juda yaxshi his qilyapman. Rahmat!", ru: "После массажа чувствую себя очень хорошо. Спасибо!" },
  "reviews.r3.name": { uz: "Nilufar", ru: "Нилуфар" },
  "reviews.r3.text": { uz: "Professional mutaxassislar va shinam muhit.", ru: "Профессиональные специалисты и уютная атмосфера." },

  // Certificates
  "certificates.label": { uz: "Bizning yutuqlar", ru: "Наши достижения" },
  "certificates.title": { uz: "Sertifikatlar", ru: "Сертификаты" },

  // Footer
  "footer.rights": { uz: "Barcha huquqlar himoyalangan.", ru: "Все права защищены." },
};

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("feyza-lang");
    return (saved === "uz" || saved === "ru") ? saved : "uz";
  });

  const changeLang = (newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem("feyza-lang", newLang);
  };

  const t = (key: string): string => {
    return translations[key]?.[lang] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
