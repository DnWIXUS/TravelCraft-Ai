import { useTranslation } from "react-i18next";
import { useState } from "react";
import { PackageCard } from "../components/PackageCard";
import { internationalPackages } from "../data/packages";
import { Search, SlidersHorizontal, Globe2 } from "lucide-react";

export function InternationalTravelPage() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "All" },
    { id: "beach", label: t("international.beach") },
    { id: "luxury", label: t("international.luxury") },
    { id: "family", label: t("international.familyPkg") },
    { id: "honeymoon", label: t("international.honeymoon") },
    { id: "religious", label: t("international.religious") },
    { id: "shopping", label: t("international.shopping") },
    { id: "adventure", label: t("international.adventurePkg") },
  ];

  const packages = internationalPackages;

  const filteredPackages = packages.filter((pkg) => {
    const matchesCategory =
      selectedCategory === "all" || pkg.category === selectedCategory;
    const matchesSearch =
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.country?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const countries = [
    { name: "Turkey", count: 2 },
    { name: "Dubai (UAE)", count: 2 },
    { name: "Thailand", count: 1 },
    { name: "Saudi Arabia", count: 1 },
    { name: "Egypt", count: 1 },
    { name: "Indonesia", count: 1 },
    { name: "Malaysia", count: 1 },
    { name: "Qatar", count: 1 },
    { name: "Maldives", count: 1 },
    { name: "Greece", count: 1 },
  ];

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Globe2 className="w-6 h-6 md:w-8 md:h-8 shrink-0" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">{t("international.title")}</h1>
          </div>
          <p className="text-base sm:text-xl text-purple-100 max-w-2xl">
            {t("hero.internationalDesc")}
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
                placeholder="Search by destination or country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Popular Countries</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {countries.map((country) => (
              <button
                key={country.name}
                onClick={() => setSearchQuery(country.name)}
                className="p-4 bg-white rounded-xl border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all text-left"
              >
                <div className="font-semibold">{country.name}</div>
                <div className="text-sm text-slate-500">
                  {country.count} {country.count === 1 ? "package" : "packages"}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg.id} {...pkg} type="international" />
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
