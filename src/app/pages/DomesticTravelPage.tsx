import { useTranslation } from "react-i18next";
import { useState } from "react";
import { PackageCard } from "../components/PackageCard";
import { domesticPackages } from "../data/packages";
import { Search, SlidersHorizontal, MapPin } from "lucide-react";

export function DomesticTravelPage() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "All" },
    { id: "historical", label: t("domestic.historical") },
    { id: "nature", label: t("domestic.nature") },
    { id: "pilgrimage", label: t("domestic.pilgrimage") },
    { id: "family", label: t("domestic.family") },
    { id: "weekend", label: t("domestic.weekend") },
    { id: "adventure", label: t("domestic.adventure") },
  ];

  const packages = domesticPackages;

  const filteredPackages = packages.filter((pkg) => {
    const matchesCategory =
      selectedCategory === "all" || pkg.category === selectedCategory;
    const matchesSearch = pkg.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-6 h-6 md:w-8 md:h-8 shrink-0" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">{t("domestic.title")}</h1>
          </div>
          <p className="text-base sm:text-xl text-blue-100 max-w-2xl">
            {t("hero.domesticDesc")}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search packages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg.id} {...pkg} type="domestic" />
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">
              No packages found. Try different filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
