import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { motion } from "motion/react";
import { getPackagesByType } from "../data/packages";
import {
  MapPin, Plane, Globe2, Mountain, Building2, Palmtree,
  Sparkles, ShieldCheck, Headphones, BadgeDollarSign,
  Star, Users, Flag, Compass,
} from "lucide-react";
import type { TravelPackage } from "../data/packages";

export function HomePage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "uz" | "ru";

  const popularDomestic = getPackagesByType("domestic").slice(0, 4);
  const popularInternational = getPackagesByType("international").slice(0, 4);

  const getLocalTitle = (pkg: TravelPackage) =>
    pkg.translations?.[lang]?.title || pkg.title;
  const getLocalVibe = (pkg: TravelPackage) =>
    pkg.translations?.[lang]?.vibe || pkg.vibe || "";

  return (
    <div>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
          <div className="absolute inset-0 bg-black/30"></div>
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white mb-8 md:mb-16"
          >
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-tight">
              {t("hero.title")}
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              {t("hero.subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Link
                to="/domestic-travel"
                className="group block relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative p-6 sm:p-8 md:p-12 text-white">
                  <div className="bg-white/20 backdrop-blur-sm w-14 h-14 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                    <MapPin className="w-7 h-7 md:w-10 md:h-10" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
                    {t("hero.domestic")}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-blue-50 mb-4 md:mb-6">
                    {t("hero.domesticDesc")}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Mountain className="w-4 h-4 md:w-5 md:h-5" />
                      <span>Mountains</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 md:w-5 md:h-5" />
                      <span>Historical</span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-6 inline-flex items-center gap-2 bg-white text-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold group-hover:gap-4 transition-all text-sm sm:text-base">
                    Explore Now
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                to="/international-travel"
                className="group block relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-pink-500/50 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative p-6 sm:p-8 md:p-12 text-white">
                  <div className="bg-white/20 backdrop-blur-sm w-14 h-14 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                    <Plane className="w-7 h-7 md:w-10 md:h-10" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
                    {t("hero.international")}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-purple-50 mb-4 md:mb-6">
                    {t("hero.internationalDesc")}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Globe2 className="w-4 h-4 md:w-5 md:h-5" />
                      <span>Worldwide</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Palmtree className="w-4 h-4 md:w-5 md:h-5" />
                      <span>Beach & Luxury</span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-6 inline-flex items-center gap-2 bg-white text-purple-600 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold group-hover:gap-4 transition-all text-sm sm:text-base">
                    Discover Now
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section className="py-10 md:py-16 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { icon: <Compass className="w-7 h-7 md:w-9 md:h-9" />, value: "100+", label: t("stats.destinations"), color: "from-blue-500 to-cyan-500" },
              { icon: <Users className="w-7 h-7 md:w-9 md:h-9" />, value: "5 000+", label: t("stats.travelers"), color: "from-purple-500 to-pink-500" },
              { icon: <Flag className="w-7 h-7 md:w-9 md:h-9" />, value: "15+", label: t("stats.countries"), color: "from-emerald-500 to-teal-500" },
              { icon: <Star className="w-7 h-7 md:w-9 md:h-9" />, value: "4.9★", label: t("stats.rating"), color: "from-amber-400 to-orange-500" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center bg-slate-50 rounded-2xl p-5 md:p-7 border border-slate-100 hover:shadow-lg transition-shadow"
              >
                <div className={`bg-gradient-to-br ${stat.color} text-white rounded-xl p-2.5 md:p-3 mb-3`}>
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-xs sm:text-sm text-slate-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories Grid ── */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-slate-800"
          >
            {t("categories.title")}
          </motion.h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
            {[
              { to: "/domestic-travel?cat=historical", icon: "🏛️", label: t("categories.historical"), bg: "from-amber-400 to-orange-400" },
              { to: "/domestic-travel?cat=nature",     icon: "🌿", label: t("categories.nature"),     bg: "from-emerald-400 to-teal-400" },
              { to: "/domestic-travel?cat=pilgrimage", icon: "🕌", label: t("categories.pilgrimage"), bg: "from-violet-400 to-purple-500" },
              { to: "/domestic-travel?cat=family",     icon: "👨‍👩‍👧‍👦", label: t("categories.family"),   bg: "from-pink-400 to-rose-400" },
              { to: "/domestic-travel?cat=adventure",  icon: "⛺", label: t("categories.adventure"),  bg: "from-blue-400 to-cyan-400" },
              { to: "/international-travel?cat=beach", icon: "🏖️", label: t("categories.beach"),      bg: "from-sky-400 to-blue-500" },
            ].map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  to={cat.to}
                  className="group flex flex-col items-center gap-2 md:gap-3 p-4 md:p-5 bg-white rounded-2xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={`bg-gradient-to-br ${cat.bg} w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-2xl md:text-3xl shadow-sm group-hover:scale-110 transition-transform`}>
                    {cat.icon}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-700 text-center leading-tight">{cat.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular Domestic ── */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t("popular.domestic")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {popularDomestic.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all"
              >
                <Link to={`/package/${pkg.type}/${pkg.id}`} className="block">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end">
                    <div className="p-3 sm:p-6 text-white w-full">
                      <h3 className="text-base sm:text-2xl font-bold line-clamp-2">{getLocalTitle(pkg)}</h3>
                      <p className="text-xs sm:text-sm text-white/80 mt-1 sm:mt-2 line-clamp-2 hidden sm:block">{getLocalVibe(pkg)}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why TravelCraft AI ── */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-slate-800"
          >
            {t("features.title")}
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {[
              {
                icon: <Sparkles className="w-7 h-7" />,
                title: t("features.ai"),
                desc: t("features.aiDesc"),
                gradient: "from-blue-500 to-cyan-500",
                bg: "bg-blue-50",
              },
              {
                icon: <BadgeDollarSign className="w-7 h-7" />,
                title: t("features.price"),
                desc: t("features.priceDesc"),
                gradient: "from-emerald-500 to-teal-500",
                bg: "bg-emerald-50",
              },
              {
                icon: <Headphones className="w-7 h-7" />,
                title: t("features.support"),
                desc: t("features.supportDesc"),
                gradient: "from-purple-500 to-pink-500",
                bg: "bg-purple-50",
              },
              {
                icon: <ShieldCheck className="w-7 h-7" />,
                title: t("features.secure"),
                desc: t("features.secureDesc"),
                gradient: "from-amber-400 to-orange-500",
                bg: "bg-amber-50",
              },
            ].map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`${feat.bg} rounded-2xl p-6 md:p-7 border border-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`bg-gradient-to-br ${feat.gradient} text-white w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm`}>
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{feat.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular International ── */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t("popular.international")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {popularInternational.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all"
              >
                <Link to={`/package/${pkg.type}/${pkg.id}`} className="block">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={getLocalTitle(pkg)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end">
                    <div className="p-3 sm:p-6 text-white w-full">
                      <h3 className="text-base sm:text-2xl font-bold line-clamp-2">{getLocalTitle(pkg)}</h3>
                      <p className="text-xs sm:text-sm text-white/80 mt-1 sm:mt-2 line-clamp-2 hidden sm:block">{getLocalVibe(pkg)}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* ── CTA Banner ── */}
      <section className="py-14 md:py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=600&fit=crop')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full mb-6 text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              AI-powered
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
              {t("cta.title")}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 md:mb-10">
              {t("cta.desc")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/custom-package"
                className="group inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-8 py-4 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 text-base sm:text-lg w-full sm:w-auto justify-center"
              >
                <Sparkles className="w-5 h-5" />
                {t("cta.button")}
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                to="/domestic-travel"
                className="inline-flex items-center gap-2 border-2 border-white/50 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-300 text-base sm:text-lg w-full sm:w-auto justify-center"
              >
                <MapPin className="w-5 h-5" />
                {t("nav.domestic")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
