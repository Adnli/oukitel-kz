import React, { useMemo, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Smartphone,
  Shield,
  BatteryCharging,
  Camera,
  Youtube,
  Instagram,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView, useAnimationControls } from "framer-motion";
import Autoplay from "embla-carousel-autoplay"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import ProductPage from "./pages/ProductPage.jsx";
import { productsSeed } from "@/data/products";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    console.error("Render error:", error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24, fontFamily: "monospace" }}>
          <h2>Ошибка рендера</h2>
          <pre>{String(this.state.error?.message || this.state.error)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const Section = ({ id, title, subtitle, children }) => (
  <section id={id} className="scroll-mt-24">
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="mb-6 md:mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
        {subtitle ? (
          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
            {subtitle}
          </p>
        ) : null}
      </div>
      {children}
    </div>
  </section>
);

const navItems = [
  { id: "home", label: "Главная" },
  { id: "products", label: "Продукты" },
  { id: "gallery", label: "Галерея" },
  { id: "reviews", label: "Видео-обзоры" },
  { id: "contacts", label: "Контакты" },
];

const heroSlides = [
  {
    title: "OUKITEL — мощные смартфоны для реальной жизни",
    desc: "Ударопрочные, автономные и готовые к любым условиям. Казахстанский официальный витринный сайт.",
    tag: "Надёжность",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Автономность на первом месте",
    desc: "Большие аккумуляторы, умные режимы энергосбережения и быстрая зарядка — чтобы не думать о розетке.",
    tag: "Батарея",
    image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Функции, которые помогают каждый день",
    desc: "Камеры, защита, производительность — сбалансировано и практично.",
    tag: "Практичность",
    image:
      "https://images.unsplash.com/photo-1510557880182-3ad9c55a7d0b?auto=format&fit=crop&w=1600&q=80",
  },
];

const gallerySeed = [
  {
    title: "Ударопрочность",
    image:
      "https://images.unsplash.com/photo-1526401485004-2aa7f3b5aeea?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Путешествия",
    image:
      "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Работа в полях",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Город",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Ночные кадры",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Батарея",
    image:
      "https://images.unsplash.com/photo-1520975958225-3fbb61c78a52?auto=format&fit=crop&w=1200&q=80",
  },
];

const youtubeReviewsSeed = [
  { title: "Обзор OUKITEL WP23 Pro — прочный и доступный", id: "dQw4w9WgXcQ" },
  { title: "OUKITEL WP19: 21000 мА·ч — сколько живёт?", id: "3GwjfUFyY6M" },
  { title: "OUKITEL C33 — бюджетный смартфон на каждый день", id: "M7lc1UVf-VE" },
  { title: "OUKITEL RT3 — защищённый планшет в деле", id: "ysz5S6PUM-U" },
];

function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

function useActiveSection(ids, headerOffset = 96) {
  const [active, setActive] = useState(ids[0] || "home");

  React.useEffect(() => {
    const getActive = () => {
      const y = window.scrollY + headerOffset + 8; // линия "под шапкой"

      // Если мы почти в самом низу страницы — это точно Contacts
      const bottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      if (bottom && ids.includes("contacts")) return "contacts";

      // Ищем последнюю секцию, верх которой уже прошёл линию y
      let current = ids[0] || "home";

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop; // позиция в документе
        if (top <= y) current = id;
      }

      return current;
    };

    const onScroll = () => setActive(getActive());

    // первичное вычисление
    setActive(getActive());

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, headerOffset]);

  return active;
}

const ProductCard = ({ p }) => {
  const Icon = p.icon;
  const navigate = useNavigate();

  const ref = useRef(null);
  const inView = useInView(ref, {
    amount: 0.3,
    margin: "-10% 0px -25% 0px",
    once: true,
  });
  const controls = useAnimationControls();

  React.useEffect(() => {
    if (!inView) return;
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });
  }, [inView, controls]);

  const cover = (p.images && p.images.length ? p.images[0] : p.image) || "";

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 10 }} animate={controls}>
      <Card className="overflow-hidden rounded-2xl shadow-sm">
        <div className="relative aspect-[16/10]">
          {cover ? (
            <img
              src={cover}
              alt={p.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full bg-muted/40 flex items-center justify-center text-sm text-muted-foreground">
              Нет изображения
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
            <div>
              <div className="text-white font-semibold leading-tight">{p.name}</div>
              <div className="text-white/80 text-xs mt-0.5">{p.price}</div>
            </div>
            <div className="h-9 w-9 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center text-white">
              <Icon className="h-5 w-5" />
            </div>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {p.chips?.map((c) => (
              <Badge key={c} variant="secondary" className="rounded-full">
                {c}
              </Badge>
            ))}
          </div>

          {/* корзину убрали */}
          <div className="mt-4">
            <Button
              className="rounded-xl"
              onClick={() => p.slug && navigate(`/product/${p.slug}`)}
            >
              Подробнее
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const GalleryGrid = ({ items }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
    {items.map((g, idx) => (
      <GalleryCard key={`${g.title}-${idx}`} g={g} />
    ))}
  </div>
);

const GalleryCard = ({ g }) => {
  const ref = useRef(null);
  const inView = useInView(ref, {
    amount: 0.2,
    margin: "-10% 0px -25% 0px",
    once: true,
  });
  const controls = useAnimationControls();

  React.useEffect(() => {
    if (!inView) return;
    controls.start({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    });
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={controls}
      className="group relative overflow-hidden rounded-2xl border bg-card"
    >
      <div className="aspect-[4/3]">
        <img
          src={g.image}
          alt={g.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent opacity-90" />

      <div className="absolute bottom-3 left-3 right-3">
        <div className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs text-white backdrop-blur">
          {g.title}
        </div>
      </div>
    </motion.div>
  );
};

const YoutubeList = ({ items }) => (
  <div className="grid md:grid-cols-2 gap-4">
    {items.map((v) => (
      <YoutubeCard key={v.id} v={v} />
    ))}
  </div>
);

const YoutubeCard = ({ v }) => {
  const ref = useRef(null);

  // когда карточка реально попала в зону видимости
  const inView = useInView(ref, {
    amount: 0.25,
    margin: "-10% 0px -25% 0px",
    once: true,
  });

  const controls = useAnimationControls();

  React.useEffect(() => {
    if (!inView) return;

    // сброс в "скрыто" и запуск заново
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    });
  }, [inView, controls]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 10 }} animate={controls}>
      <Card className="rounded-2xl overflow-hidden">
        <div className="aspect-video">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${v.id}`}
            title={v.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <div className="mt-0.5 text-muted-foreground">
              <Youtube className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium leading-snug">{v.title}</div>
              <a
                className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                href={`https://www.youtube.com/watch?v=${v.id}`}
                target="_blank"
                rel="noreferrer"
              >
                Открыть на YouTube <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};


const Features = () => {
  const feats = [
    {
      title: "Защита",
      desc: "Корпус и влагозащита для сложных условий.",
      icon: Shield,
    },
    {
      title: "Автономность",
      desc: "Ёмкие аккумуляторы и экономичные режимы.",
      icon: BatteryCharging,
    },
    {
      title: "Камера",
      desc: "Чёткие кадры днём и уверенно ночью.",
      icon: Camera,
    },
    {
      title: "Удобство",
      desc: "Современный экран, связь и навигация.",
      icon: Smartphone,
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {feats.map((f) => (
        <Card key={f.title} className="rounded-2xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl border flex items-center justify-center">
                <f.icon className="h-5 w-5" />
              </div>
              <CardTitle className="text-base">{f.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {f.desc}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const TopNav = ({ active, onNavigate }) => {
  const [open, setOpen] = useState(false);

const goTo = (id) => {
  onNavigate?.(id);
  setOpen(false);
};

  return (
    <div className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-2xl border flex items-center justify-center">
            <span className="text-sm font-semibold">OK</span>
          </div>
          <div className="leading-tight">
            <div className="font-semibold">OUKITEL Kazakhstan</div>
            <div className="text-xs text-muted-foreground">Сайт‑визитка бренда</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((n) => (
            <Button
              key={n.id}
              variant={active === n.id ? "secondary" : "ghost"}
              className={classNames(
                "rounded-xl",
                active === n.id ? "font-medium" : "text-muted-foreground"
              )}
              onClick={() => goTo(n.id)}
            >
              {n.label}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            className="rounded-xl hidden sm:inline-flex"
            onClick={() => goTo("contacts")}
          >
            Связаться
          </Button>
          <Button
            variant="outline"
            className="rounded-xl md:hidden"
            onClick={() => setOpen((s) => !s)}
            aria-expanded={open}
            aria-label="Открыть меню"
          >
            Меню
          </Button>
        </div>
      </div>

      {open ? (
        <div className="md:hidden border-t">
          <div className="mx-auto max-w-6xl px-4 py-3 grid gap-1">
            {navItems.map((n) => (
              <Button
                key={n.id}
                variant={active === n.id ? "secondary" : "ghost"}
                className="justify-start rounded-xl"
                onClick={() => goTo(n.id)}
              >
                {n.label}
              </Button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

const Hero = () => {
  const [api, setApi] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const autoplay = React.useRef(
    Autoplay({ delay: 4500, stopOnInteraction: true })
  )

  React.useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };

    handleSelect();
    api.on("select", handleSelect);
    api.on("reInit", handleSelect);

    return () => {
      api.off("select", handleSelect);
      api.off("reInit", handleSelect);
    };
  }, [api]);

  return (
    <section id="home" className="relative">
      <Carousel
        className="w-full"
        setApi={setApi}
        plugins={[autoplay.current]}
        opts={{ loop: true }}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        <CarouselContent>
          {heroSlides.map((s, idx) => (
            <CarouselItem key={idx}>
              {/* Высота как у баннера */}
              <div className="relative h-[420px] md:h-[560px] lg:h-[680px] w-full">
                {/* Фон-картинка */}
                <img
                  src={s.image}
                  alt={s.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading={idx === 0 ? "eager" : "lazy"}
                />

                {/* Затемнение/градиент как на официальном */}
                <div className="absolute inset-0 bg-black/35" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent" />

                {/* Контент по центру */}
                <div className="relative z-10 h-full">
                  <div className="mx-auto flex h-full max-w-6xl items-center justify-center px-4 text-center">
                    <div className="max-w-3xl">
                      <div className="text-white/85 text-xs md:text-sm tracking-wide mb-3">
                        {s.tag}
                      </div>

                      <h1 className="text-white font-semibold leading-tight text-3xl md:text-5xl">
                        {s.title}
                      </h1>

                      <p className="mt-3 text-white/85 text-sm md:text-base">
                        {s.desc}
                      </p>

                      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                        <Button className="rounded-full px-6">
                          Узнать больше
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-full px-6 bg-white/10 text-white border-white/30 hover:bg-white/15"
                        >
                          Купить сейчас
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Индикаторы снизу (линии/точки) */}
                <div className="absolute bottom-5 left-0 right-0 z-10 flex items-center justify-center gap-2">
                  {heroSlides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Перейти к слайду ${i + 1}`}
                      onClick={() => api?.scrollTo(i)}
                      className={classNames(
                        "h-[3px] w-10 rounded-full transition-colors",
                        i === currentSlide ? "bg-white" : "bg-white/35"
                      )}
                    />
                  ))}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Стрелки как у баннера (по бокам) */}
        <CarouselPrevious className="left-4 h-10 w-10 rounded-full bg-white/10 border-white/20 text-white hover:bg-white/15" />
        <CarouselNext className="right-4 h-10 w-10 rounded-full bg-white/10 border-white/20 text-white hover:bg-white/15" />
      </Carousel>
    </section>
  )
};

const Products = () => {
  const [query, setQuery] = useState("");
  const products = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return productsSeed;
    return productsSeed.filter((p) =>
      (p.name + " " + p.chips.join(" ")).toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <Section
      id="products"
      title="Популярные модели"
      subtitle="4–5 карточек для витрины. Можно расширить каталог и добавить реальные цены/наличие."
    >
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-6">
        <div className="text-sm text-muted-foreground">
          Подборка для главной страницы
        </div>
        <div className="max-w-sm w-full">
          <Input
            className="rounded-xl"
            placeholder="Поиск по моделям…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <ProductCard key={p.name} p={p} />
        ))}
      </div>
    </Section>
  );
};

const Gallery = () => (
  <Section
    id="gallery"
    title="Галерея"
    subtitle="Короткая подборка фото для ознакомления: сценарии использования, стиль, атмосфера."
  >
    <GalleryGrid items={gallerySeed} />
  </Section>
);

const Reviews = () => (
  <Section
    id="reviews"
    title="Видео-обзоры"
    subtitle="Список YouTube-видео: вставьте ID роликов или ссылки на обзоры от казахстанских/русскоязычных авторов."
  >
    <YoutubeList items={youtubeReviewsSeed} />
  </Section>
);

const Footer = () => (
  <footer id="contacts" className="border-t bg-muted/30 scroll-mt-24">
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <div className="font-semibold">OUKITEL Kazakhstan</div>
          <div className="mt-2 text-sm text-muted-foreground">
            Официальная витрина бренда (демо). Добавьте реальные реквизиты и ссылки
            магазинов.
          </div>
        </div>

        <div>
          <div className="font-semibold">Контакты</div>
          <div className="mt-3 grid gap-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <a className="hover:text-foreground" href="tel:+77000000000">
                +7 (700) 000‑00‑00
              </a>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <a className="hover:text-foreground" href="mailto:sales@oukitel.kz">
                sales@oukitel.kz
              </a>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Алматы / Астана, Казахстан</span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Button
              variant="outline"
              className="rounded-xl"
              asChild
              title="Instagram"
            >
              <a href="#" target="_blank" rel="noreferrer">
                <Instagram className="h-4 w-4 mr-2" /> Instagram
              </a>
            </Button>
            <Button variant="outline" className="rounded-xl" asChild title="YouTube">
              <a href="#" target="_blank" rel="noreferrer">
                <Youtube className="h-4 w-4 mr-2" /> YouTube
              </a>
            </Button>
          </div>
        </div>

        <div>
          <div className="font-semibold">Подписка на новости</div>
          <div className="mt-2 text-sm text-muted-foreground">
            Оставьте email — будем присылать релизы и акции.
          </div>
          <div className="mt-3 flex gap-2">
            <Input className="rounded-xl" placeholder="you@email.com" />
            <Button className="rounded-xl">Отправить</Button>
          </div>
          <div className="mt-3 text-xs text-muted-foreground">
            *В демо форма не отправляет данные.
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted-foreground">
        <div>© {new Date().getFullYear()} OUKITEL Kazakhstan. Все права защищены.</div>
        <div className="flex gap-3">
          <a className="hover:text-foreground" href="#">
            Политика конфиденциальности
          </a>
          <a className="hover:text-foreground" href="#">
            Договор оферты
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const nav = useNavigate();
  const loc = useLocation();
  const navigateTo = (id) => {
  if (loc.pathname !== "/") {
    nav("/");
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;

      const headerOffset = 96;
      const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: y, behavior: "smooth" });

    }, 50);
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;

  const headerOffset = 96;
  const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top: y, behavior: "smooth" });

};

  const activeOnHome = useActiveSection(navItems.map((n) => n.id), 96);
  const active = loc.pathname.startsWith("/product/") ? "products" : activeOnHome;


  return (
    <ErrorBoundary>
  <div className="min-h-screen">
    <TopNav active={active} onNavigate={navigateTo} />

    <Routes>
      <Route
        path="/"
        element={
          <>
            <Hero />
            <Products />
            <Gallery />
            <Reviews />
          </>
        }
      />

      <Route path="/product/:slug" element={<ProductPage />} />
    </Routes>

    <Footer />
  </div>
  </ErrorBoundary>
);
}
