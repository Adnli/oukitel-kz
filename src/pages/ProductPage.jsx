import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { productsSeed } from "@/data/products";
import { Shield, Truck, RotateCcw, BadgeCheck } from "lucide-react";

function Stars({ value }) {
  const full = Math.round(value || 0);
  return (
    <span aria-label={`Рейтинг ${value}`} className="select-none">
      {"★".repeat(full)}
      <span className="text-muted-foreground">
        {"★".repeat(Math.max(0, 5 - full))}
      </span>
    </span>
  );
}

function SpecsTable({ rows }) {
  if (!rows?.length) {
    return (
      <div className="text-sm text-muted-foreground">
        Характеристики скоро будут добавлены.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border">
      <table className="w-full text-sm">
        <tbody>
          {rows.map(([k, v], idx) => (
            <tr key={k + idx} className={idx % 2 ? "bg-muted/30" : ""}>
              <td className="w-1/2 px-4 py-3 text-muted-foreground">{k}</td>
              <td className="px-4 py-3 font-medium">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProductGallery({ images, image, title }) {
  const pics = images?.length ? images : image ? [image] : [];
  const [active, setActive] = React.useState(0);

  React.useEffect(() => setActive(0), [title]);

  const main = pics[active] || pics[0];

  return (
    <div>
      <div className="rounded-2xl border overflow-hidden bg-white">
        {main ? (
          <img src={main} alt={title} className="w-full object-contain p-6" />
        ) : (
          <div className="p-14 text-center text-muted-foreground">
            Нет изображения
          </div>
        )}
      </div>

      {pics.length > 1 ? (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {pics.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setActive(i)}
              className={[
                "h-16 w-16 shrink-0 rounded-xl border bg-white p-2",
                i === active
                  ? "ring-2 ring-ring"
                  : "opacity-80 hover:opacity-100",
              ].join(" ")}
              aria-label={`Фото ${i + 1}`}
            >
              <img
                src={src}
                alt={`${title} фото ${i + 1}`}
                className="h-full w-full object-contain"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function DiscountBadge({ price, oldPrice }) {
  // Пробуем посчитать скидку если цены похожи на "129 990 ₸"
  const parse = (s) =>
    Number(String(s || "").replace(/[^\d]/g, "")) || 0;

  const p = parse(price);
  const o = parse(oldPrice);
  if (!p || !o || o <= p) return null;

  const pct = Math.round(((o - p) / o) * 100);
  if (!pct) return null;

  return (
    <span className="inline-flex items-center rounded-xl bg-red-500/10 text-red-600 px-3 py-1 text-xs font-medium">
      Сохранить {pct}%
    </span>
  );
}

export default function ProductPage() {
  const nav = useNavigate();
  const { slug } = useParams();

  const product = productsSeed.find((p) => p.slug === slug);

  React.useEffect(() => window.scrollTo({ top: 0, behavior: "auto" }), [slug]);

  React.useEffect(() => {
    document.title = product
      ? `${product.name} — OUKITEL Kazakhstan`
      : "Товар — OUKITEL Kazakhstan";
  }, [product]);

  const [tab, setTab] = React.useState("desc"); // desc | specs | box

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-2xl border p-6">
          <div className="text-lg font-semibold">Товар не найден</div>
          <div className="mt-2 text-sm text-muted-foreground">
            Проверь ссылку или вернись на главную.
          </div>
          <div className="mt-4">
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={() => nav("/")}
            >
              ← На главную
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const price = product.price || "";
  const oldPrice = product.oldPrice || "";

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:py-10">
      {/* “верхняя полоса” как на примере */}
      <div className="mb-5 rounded-2xl border bg-muted/20 px-4 py-3 text-xs md:text-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <BadgeCheck className="h-4 w-4" /> 100% безопасные покупки
            </span>
            <span className="inline-flex items-center gap-2">
              <Shield className="h-4 w-4" /> Гарантия 1+2 года (по подписке)
            </span>
            <span className="inline-flex items-center gap-2">
              <Truck className="h-4 w-4" /> Бесплатная доставка
            </span>
            <span className="inline-flex items-center gap-2">
              <RotateCcw className="h-4 w-4" /> 30-дневный возврат
            </span>
          </div>

          <Button
            variant="outline"
            className="rounded-xl"
            onClick={() => nav(-1)}
          >
            ← Назад
          </Button>
        </div>
      </div>

      {/* хлебные крошки */}
      <div className="text-sm text-muted-foreground">
        <button className="hover:text-foreground" onClick={() => nav("/")}>
          Главная
        </button>{" "}
        <span className="mx-2">/</span>
        <button className="hover:text-foreground" onClick={() => nav("/")}>
          Продукты
        </button>{" "}
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="mt-6 grid lg:grid-cols-2 gap-10">
        {/* слева: фото */}
        <ProductGallery
          images={product.images}
          image={product.image}
          title={product.name}
        />

        {/* справа: инфо */}
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-2">
            <Stars value={product.rating} />
            <span className="text-sm text-muted-foreground">
              {product.rating?.toFixed?.(1) ?? product.rating} ·{" "}
              {product.reviewsCount ?? 0} отзывов
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-end gap-3">
            <div className="text-3xl font-semibold">{price}</div>
            {oldPrice ? (
              <div className="text-base line-through text-muted-foreground">
                {oldPrice}
              </div>
            ) : null}
            <DiscountBadge price={price} oldPrice={oldPrice} />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {product.chips?.map((c) => (
              <Badge key={c} variant="secondary" className="rounded-full">
                {c}
              </Badge>
            ))}
          </div>

          {/* “payment box” как Klarna-блок */}
          <div className="mt-5 rounded-2xl border bg-background p-4">
            <div className="text-sm font-medium">
              Рассрочка / оплата частями (демо)
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              Можно добавить реальную интеграцию позже. Сейчас это UI-блок как на
              примере.
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Button className="rounded-xl" size="lg">
                Купить
              </Button>
              <Button
                variant="outline"
                className="rounded-xl"
                size="lg"
                onClick={() => alert("Демо: отправить запрос менеджеру")}
              >
                Узнать больше
              </Button>
            </div>
          </div>

          {/* преимущества как в примере */}
          <div className="mt-5 grid gap-3 text-sm">
            <div className="flex items-start gap-2">
              <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <div className="font-medium">Экспресс-обмен / поддержка</div>
                <div className="text-muted-foreground">
                  Демо-текст: можно заменить на реальные условия.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Truck className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <div className="font-medium">Доставка по Казахстану</div>
                <div className="text-muted-foreground">
                  Сроки и города — позже подключим реальные.
                </div>
              </div>
            </div>
          </div>

          {/* короткое описание + highlights */}
          <div className="mt-6">
            <div className="text-sm text-muted-foreground">
              {product.short || "Описание модели скоро будет добавлено."}
            </div>

            {product.highlights?.length ? (
              <div className="mt-4 space-y-2">
                {product.highlights.map((h) => (
                  <Card key={h} className="rounded-2xl">
                    <CardContent className="p-4 text-sm">{h}</CardContent>
                  </Card>
                ))}
              </div>
            ) : null}
          </div>

          {/* Tabs */}
          <div className="mt-8">
            <div className="inline-flex rounded-2xl border p-1 bg-muted/20">
              <button
                onClick={() => setTab("desc")}
                className={[
                  "px-4 py-2 text-sm rounded-2xl",
                  tab === "desc"
                    ? "bg-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                Описание
              </button>
              <button
                onClick={() => setTab("specs")}
                className={[
                  "px-4 py-2 text-sm rounded-2xl",
                  tab === "specs"
                    ? "bg-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                Характеристики
              </button>
              <button
                onClick={() => setTab("box")}
                className={[
                  "px-4 py-2 text-sm rounded-2xl",
                  tab === "box"
                    ? "bg-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                Комплектация
              </button>
            </div>

            <div className="mt-4">
              {tab === "desc" ? (
                <div className="text-sm leading-relaxed text-muted-foreground">
                  {product.description || "Описание скоро будет добавлено."}
                </div>
              ) : null}

              {tab === "specs" ? <SpecsTable rows={product.specs} /> : null}

              {tab === "box" ? (
                (product.box?.length ? (
                  <ul className="list-disc pl-5 text-sm text-muted-foreground">
                    {product.box.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    Комплектация скоро будет добавлена.
                  </div>
                ))
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
