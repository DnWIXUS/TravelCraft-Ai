import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Star, Clock, Heart, Share2, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface PackageCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  duration: string;
  price: number;
  rating: number;
  included: string[];
  type?: "domestic" | "international";
  country?: string;
  hotel?: string;
  flightIncluded?: boolean;
  translations?: {
    uz?: { title?: string; description?: string; duration?: string };
    ru?: { title?: string; description?: string; duration?: string };
  };
}

export function PackageCard({
  id,
  title,
  description,
  image,
  duration,
  price,
  rating,
  included,
  type = "domestic",
  country,
  hotel,
  flightIncluded,
  translations,
}: PackageCardProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "uz" | "ru";
  const localTitle = translations?.[lang]?.title || title;
  const localDescription = translations?.[lang]?.description || description;
  const localDuration = translations?.[lang]?.duration || duration;
  const [isFavorite, setIsFavorite] = useState(false);

  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/package/${type}/${id}`)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
    >
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={(event) => {
              event.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-slate-700"
              }`}
            />
          </button>
          <button
            onClick={(event) => event.stopPropagation()}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
          >
            <Share2 className="w-5 h-5 text-slate-700" />
          </button>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{rating}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {country && (
          <div className="text-sm text-purple-600 font-semibold mb-2">
            {country}
          </div>
        )}
        <h3 className="text-xl font-bold text-slate-900 mb-2">{localTitle}</h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {localDescription}
        </p>

        {hotel && (
          <div className="text-sm text-slate-700 mb-3">
            <span className="font-semibold">Hotel:</span> {hotel}
          </div>
        )}

        <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{localDuration}</span>
          </div>
          {flightIncluded && (
            <div className="flex items-center gap-1 text-green-600">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t("package.flightIncluded")}</span>
            </div>
          )}
        </div>

        <div className="border-t pt-4 mb-4">
          <div className="text-xs text-slate-500 mb-2">
            {t("package.included")}:
          </div>
          <div className="flex flex-wrap gap-2">
            {included.slice(0, 3).map((item, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
              >
                {item}
              </span>
            ))}
            {included.length > 3 && (
              <span className="text-xs text-slate-500">
                +{included.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500">
              {t("package.from")}
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ${price.toLocaleString()}
            </div>
          </div>
          <span className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all">
            {t("package.viewDetails")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
