import { Shield, BatteryCharging, Smartphone, Camera } from "lucide-react";

export const productsSeed = [
  {
    name: "OUKITEL WP23 Pro",
    slug: "oukitel-wp23-pro",
    price: "99 990 ₸",
    oldPrice: "119 990 ₸",
    rating: 4.7,
    reviewsCount: 106,
    chips: ["IP68/IP69K", "Большая батарея", "Защита"],
    icon: Shield,
    images: [
      "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1510557880182-3ad9c55a7d0b?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1512499617640-c2f999fe3a24?auto=format&fit=crop&w=1600&q=80",
    ],
    short: "Защищённый смартфон для работы и активной жизни.",
    description:
      "WP23 Pro — защищённая линейка OUKITEL: прочный корпус, уверенная автономность и практичные функции для повседневных задач.",
    highlights: [
      "Защита от воды/пыли и ударов (для сложных условий)",
      "Ёмкий аккумулятор и экономичные режимы",
      "Уверенная навигация и связь",
    ],
    box: ["Смартфон", "Кабель USB-C", "Адаптер питания", "Скрепка", "Инструкция"],
    specs: [
      ["Дисплей", "6.5” IPS, HD+"],
      ["Процессор", "8-ядерный"],
      ["Память", "8GB RAM / 128GB ROM"],
      ["Батарея", "10600 мА·ч"],
      ["Защита", "IP68/IP69K"],
      ["Связь", "4G, Wi-Fi, Bluetooth"],
      ["Навигация", "GPS/GLONASS/Galileo"],
    ],
  },

  {
    name: "OUKITEL WP19",
    slug: "oukitel-wp19",
    price: "129 990 ₸",
    oldPrice: "149 990 ₸",
    rating: 4.6,
    reviewsCount: 84,
    chips: ["21000 мА·ч", "GPS", "Выносливость"],
    icon: BatteryCharging,
    images: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1600&q=80",
    ],
    short: "Максимальная автономность — один из самых ёмких аккумуляторов.",
    description:
      "WP19 создан для тех, кому важна автономность: путешествия, работа в полях, дальние поездки.",
    highlights: ["Экстремальная батарея", "Надёжная связь и GPS", "Прочный корпус"],
    box: ["Смартфон", "Кабель", "Адаптер", "Инструкция"],
    specs: [
      ["Дисплей", "6.7”"],
      ["Батарея", "21000 мА·ч"],
      ["Навигация", "GPS/GLONASS"],
    ],
  },

  {
    name: "OUKITEL C33",
    slug: "oukitel-c33",
    price: "69 990 ₸",
    oldPrice: "79 990 ₸",
    rating: 4.5,
    reviewsCount: 51,
    chips: ["Большой экран", "Бюджет", "Повседневный"],
    icon: Smartphone,
    images: [
      "https://images.unsplash.com/photo-1512499617640-c2f999fe3a24?auto=format&fit=crop&w=1600&q=80",
    ],
    short: "Доступная модель для повседневных задач.",
    description:
      "C33 — сбалансированный смартфон на каждый день: большой экран, базовая камера и удобный интерфейс.",
    highlights: ["Большой экран", "Хорошее соотношение цена/качество"],
    box: ["Смартфон", "Кабель", "Инструкция"],
    specs: [["Дисплей", "6.8”"], ["Память", "4GB / 64GB"]],
  },

  {
    name: "OUKITEL WP21",
    slug: "oukitel-wp21",
    price: "139 990 ₸",
    oldPrice: "159 990 ₸",
    rating: 4.6,
    reviewsCount: 72,
    chips: ["Ночная съёмка", "Производительность", "Прочность"],
    icon: Camera,
    images: [
      "https://images.unsplash.com/photo-1510557880182-3ad9c55a7d0b?auto=format&fit=crop&w=1600&q=80",
    ],
    short: "Производительность и камера для сложных сценариев.",
    description:
      "WP21 — защищённый смартфон с упором на производительность и фото/видео.",
    highlights: ["Камера", "Прочность", "Производительность"],
    box: ["Смартфон", "Кабель", "Адаптер", "Инструкция"],
    specs: [["Камера", "Мульти-камера"], ["Защита", "IP68/IP69K"]],
  },

  {
    name: "OUKITEL RT3 (планшет)",
    slug: "oukitel-rt3",
    price: "119 990 ₸",
    oldPrice: "139 990 ₸",
    rating: 4.4,
    reviewsCount: 39,
    chips: ["Ударопрочный", "Компактный", "Для работы"],
    icon: Shield,
    images: [
      "https://images.unsplash.com/photo-1585789576203-03a066b0d10b?auto=format&fit=crop&w=1600&q=80",
    ],
    short: "Компактный защищённый планшет для работы.",
    description: "RT3 — формат планшета + защита, удобно для задач на выезде.",
    highlights: ["Компактный", "Защищённый", "Рабочие сценарии"],
    box: ["Планшет", "Кабель", "Инструкция"],
    specs: [["Форм-фактор", "Планшет"], ["Защита", "Повышенная"]],
  },
];
