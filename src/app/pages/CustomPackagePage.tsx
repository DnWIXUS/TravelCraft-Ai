import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Hotel,
  Car,
  Heart,
  ArrowRight,
  ArrowLeft,
  Check,
} from "lucide-react";

export function CustomPackagePage() {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: "",
    destinationType: "",
    startDate: "",
    endDate: "",
    days: 3,
    travelers: 2,
    budget: "",
    hotelType: "",
    transport: "",
    interests: [] as string[],
    name: "",
    phone: "",
  });

  type DestinationData = {
    key: string;
    name: string;
    country: string;
    description: string;
    images: string[];
  };

  const destinationCatalog: DestinationData[] = [
    {
      key: "samarkand",
      name: "Samarkand",
      country: "Uzbekistan",
      description: "Historic Silk Road city with beautiful madrasas and ancient monuments.",
      images: [
        "https://images.unsplash.com/photo-1596847613777-18ae8d1bd8f5?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop",
      ],
    },
    {
      key: "bukhara",
      name: "Bukhara",
      country: "Uzbekistan",
      description: "Ancient city full of madrasas, bazaars and historical charm.",
      images: [
        "https://images.unsplash.com/photo-1511485977113-f5d8f4a4f6ef?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1510276976340-43f26af4ec4b?w=800&h=600&fit=crop",
      ],
    },
    {
      key: "dubai",
      name: "Dubai",
      country: "UAE",
      description: "Modern metropolis with luxury hotels, desert safaris and sky-high views.",
      images: [
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1508051123996-69f8caf4891e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=800&h=600&fit=crop",
      ],
    },
    {
      key: "thailand",
      name: "Thailand",
      country: "Thailand",
      description: "Tropical beaches, vibrant culture and unforgettable food.",
      images: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=600&fit=crop",
      ],
    },
    {
      key: "santorini",
      name: "Santorini",
      country: "Greece",
      description: "Iconic sunsets, white cliffs and magical island beaches.",
      images: [
        "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
      ],
    },
  ];

  const uzbekistanRegions: DestinationData[] = [
    {
      key: "andijan",
      name: "Andijon viloyati",
      country: "O‘zbekiston",
      description: "Sharqiy O‘zbekistonning tarixiy shaharlari va tog‘li tabiatini kashf eting.",
      images: [
        "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=800&h=600&fit=crop",
      ],
    },
    {
      key: "bukhara",
      name: "Buxoro viloyati",
      country: "O‘zbekiston",
      description: "Sulton Islom madrasasi va qadimiy shaharlari bilan mashhur bo‘lgan hudud.",
      images: [
        "https://images.unsplash.com/photo-1542596594-7ff579dfc784?w=800&h=600&fit=crop",
      ],
    },
    {
      key: "fergana",
      name: "Farg‘ona viloyati",
      country: "O‘zbekiston",
      description: "Gulzor vodiysi, tarixiy ziyoratgohlar va madaniyat markazlarini o‘z ichiga oladi.",
      images: [
        "https://images.unsplash.com/photo-1526481280692-210c53933a86?w=800&h=600&fit=crop",
      ],
    },
    {
      key: "jizzakh",
      name: "Jizzax viloyati",
      country: "O‘zbekiston",
      description: "Qadimiy arxeologik yodgorliklar va keng yaylovlarga boy viloyat.",
      images: [
        "https://images.unsplash.com/photo-1517638851339-4d0843fd6a60?w=800&h=600&fit=crop",
      ],
    },
    {
      key: "namangan",
      name: "Namangan viloyati",
      country: "O‘zbekiston",
      description: "Farg‘ona vodiysining markazi, mazali taomlar va an’anaviy hunarmandchiligi bilan.",
      images: [
        "https://images.unsplash.com/photo-1534323101319-9b369301cb75?w=800&h=600&fit=crop",
      ],
    },
    {
      key: "navoi",
      name: "Navoiy viloyati",
      country: "O‘zbekiston",
      description: "Cho‘l sahrolari, tarixiy yodgorliklar va eksklyuziv tabiat joylari.",
      images: [
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop",
      ],
    },
    {
      key: "qashqadaryo",
      name: "Qashqadaryo viloyati",
      country: "O‘zbekiston",
      description: "Tarix, tabiat va cho‘l manzaralarining noyob uyg‘unligi.",
      images: [
        "https://images.unsplash.com/photo-1601993499782-18c8a8c10f10?w=800&h=600&fit=crop",
      ],
    },
    {
      key: "samarqand",
      name: "Samarqand viloyati",
      country: "O‘zbekiston",
      description: "O‘zbekistonda tarixiy meros va qadimiy me’moriy obidalar markazi.",
      images: [
        "https://images.unsplash.com/photo-1505471768195-1f817b1b5469?w=800&h=600&fit=crop",
      ],
    },
    {
      key: "sirdaryo",
      name: "Sirdaryo viloyati",
      country: "O‘zbekiston",
      description: "Suv manbalari va dam olish uchun tinch tabiat maskani.",
      images: [
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&h=600&fit=crop",
      ],
    },
    {
      key: "surxondaryo",
      name: "Surxondaryo viloyati",
      country: "O‘zbekiston",
      description: "G‘arbiy cho‘l, tarixiy yodgorliklar va tabiiy ko‘llar bilan mashhur.",
      images: [
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=600&fit=crop",
      ],
    },
    {
      key: "toshkent",
      name: "Toshkent viloyati",
      country: "O‘zbekiston",
      description: "Poytaxt yaqinidagi zamonaviy va tarixiy joylarni kashf qiling.",
      images: [
        "https://images.unsplash.com/photo-1516685018646-549d9c0d27a8?w=800&h=600&fit=crop",
      ],
    },
    {
      key: "xorazm",
      name: "Xorazm viloyati",
      country: "O‘zbekiston",
      description: "Qadimiy xonliklar tarixi va Amudaryo bo‘yidagi sayyohlik joylari.",
      images: [
        "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=800&h=600&fit=crop",
      ],
    },
  ];

  const [selectedDestination, setSelectedDestination] = useState<DestinationData | null>(null);
  const [locationMessage, setLocationMessage] = useState("");

  const lookupDestination = (value: string) => {
    const normalized = value.toLowerCase().trim();
    if (!normalized) {
      setSelectedDestination(null);
      setLocationMessage("");
      return;
    }

    const catalogMatch = destinationCatalog.find(
      (item) =>
        normalized.includes(item.key) ||
        item.name.toLowerCase() === normalized ||
        item.country.toLowerCase() === normalized,
    );

    const regionMatch = uzbekistanRegions.find(
      (item) =>
        normalized.includes(item.key) ||
        item.name.toLowerCase() === normalized,
    );

    const match = catalogMatch || regionMatch;

    if (match) {
      setSelectedDestination(match);
      setLocationMessage(t("customPackage.locationDetected", { place: match.name }));
    } else {
      setSelectedDestination(null);
      setLocationMessage(t("customPackage.noLocationMatch"));
    }
  };

  const handleRegionSelect = (regionKey: string) => {
    const region = uzbekistanRegions.find((item) => item.key === regionKey) || null;
    if (region) {
      setFormData((prev) => ({
        ...prev,
        destination: region.name,
      }));
      setSelectedDestination(region);
      setLocationMessage(t("customPackage.locationDetected", { place: region.name }));
    } else {
      setFormData((prev) => ({ ...prev, destination: "" }));
      setSelectedDestination(null);
      setLocationMessage("");
    }
  };

  const updateDestination = (value: string) => {
    setFormData((prev) => ({ ...prev, destination: value }));
    lookupDestination(value);
  };

  const getMapQuery = () => {
    if (selectedDestination?.key === "current-location") {
      return formData.destination.trim();
    }
    if (selectedDestination?.name) {
      return selectedDestination.name;
    }
    return formData.destination.trim();
  };

  const mapQuery = getMapQuery();

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationMessage(t("customPackage.locationNotSupported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const current = t("customPackage.currentLocation");
        const coords = `${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`;
        setFormData((prev) => ({
          ...prev,
          destination: `${current} (${coords})`,
        }));
        setSelectedDestination({
          key: "current-location",
          name: current,
          country: t("customPackage.currentLocation"),
          description: t("customPackage.currentLocationDescription"),
          images: [
            "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=800&h=600&fit=crop",
          ],
        });
        setLocationMessage(t("customPackage.locationDetected", { place: current }));
      },
      () => {
        setLocationMessage(t("customPackage.locationDenied"));
      },
    );
  };

  const navigate = useNavigate();
  const totalSteps = 8;

  const calculateDaysAway = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return null;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff >= 0 ? diff + 1 : null;
  };

  const getEndDateFromDays = (startDate: string, days: number) => {
    if (!startDate || days <= 0) return "";
    const start = new Date(startDate);
    if (Number.isNaN(start.getTime())) return "";
    const end = new Date(start);
    end.setDate(end.getDate() + days - 1);
    return end.toISOString().slice(0, 10);
  };

  const updateDays = (days: number) => {
    const normalized = Math.max(1, days);
    setFormData((prev) => ({
      ...prev,
      days: normalized,
      endDate: prev.startDate ? getEndDateFromDays(prev.startDate, normalized) : prev.endDate,
    }));
  };

  const handleGenerateCustomPackage = () => {
    const nextBooking = {
      id: Date.now(),
      type: "custom" as const,
      title: formData.destination || t("customPackage.customTitle"),
      price: Math.max(100, formData.days * 120),
      name: formData.name || "",
      phone: formData.phone || "",
      guests: formData.travelers,
      bookedAt: new Date().toISOString(),
      days: formData.days,
    };

    const bookings = JSON.parse(localStorage.getItem("travelcraft_bookings") || "[]");
    bookings.push(nextBooking);
    localStorage.setItem("travelcraft_bookings", JSON.stringify(bookings));
    navigate("/dashboard");
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6">{t("customPackage.step1")}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() =>
                  setFormData({ ...formData, destinationType: "domestic" })
                }
                className={`p-6 rounded-[2rem] border transition-all shadow-sm bg-white hover:-translate-y-0.5 hover:shadow-lg ${
                  formData.destinationType === "domestic"
                    ? "border-transparent bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg"
                    : "border-slate-200 text-slate-700"
                }`}
              >
                <MapPin className="w-8 h-8 mb-3 text-blue-600" />
                <h3 className="font-bold text-xl mb-2">
                  {t("hero.domestic")}
                </h3>
                <p className="text-slate-600">{t("hero.domesticDesc")}</p>
              </button>
              <button
                onClick={() =>
                  setFormData({ ...formData, destinationType: "international" })
                }
                className={`p-6 rounded-[2rem] border transition-all shadow-sm bg-white hover:-translate-y-0.5 hover:shadow-lg ${
                  formData.destinationType === "international"
                    ? "border-transparent bg-gradient-to-br from-purple-600 to-pink-500 text-white shadow-lg"
                    : "border-slate-200 text-slate-700"
                }`}
              >
                <Sparkles className="w-8 h-8 mb-3 text-purple-600" />
                <h3 className="font-bold text-xl mb-2">
                  {t("hero.international")}
                </h3>
                <p className="text-slate-600">{t("hero.internationalDesc")}</p>
              </button>
            </div>
            {formData.destinationType && (
              <div className="mt-6 space-y-4">
                <label className="block text-sm font-semibold mb-2">
                  {t("customPackage.destinationLabel")}
                </label>
                <div className="flex flex-col gap-3">
                  {formData.destinationType === "domestic" ? (
                    <select
                      value={formData.destination}
                      onChange={(e) => handleRegionSelect(e.target.value)}
                      className="w-full px-4 py-3 border border-sky-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    >
                      <option value="">{t("customPackage.selectRegionPlaceholder")}</option>
                      {uzbekistanRegions.map((region) => (
                        <option key={region.key} value={region.key}>
                          {region.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <input
                        type="text"
                        placeholder={t("customPackage.destinationPlaceholder")}
                        value={formData.destination}
                        onChange={(e) => updateDestination(e.target.value)}
                        className="w-full px-4 py-3 border border-sky-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      />
                      <button
                        onClick={handleUseCurrentLocation}
                        className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-white shadow-lg shadow-cyan-300/30 hover:from-blue-700 hover:to-cyan-600 transition"
                      >
                        {t("customPackage.useLocation")}
                      </button>
                    </div>
                  )}
                </div>

                {locationMessage && (
                  <p className="text-sm text-slate-500">{locationMessage}</p>
                )}

                {selectedDestination && (
                  <div className="rounded-[2rem] border border-sky-200 bg-white p-5 shadow-[0_18px_50px_-24px_rgba(15,23,42,0.35)]">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm text-sky-600 uppercase tracking-[0.2em] mb-2">
                          {formData.destinationType === "international"
                            ? t("hero.international")
                            : t("hero.domestic")}
                        </p>
                        <h3 className="text-2xl font-semibold text-slate-900">
                          {selectedDestination.name}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                          {selectedDestination.country}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                          {t("customPackage.placeCard")}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-700 mt-4 mb-4 leading-7">
                      {selectedDestination.description}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedDestination.images.slice(0, 2).map((src, index) => (
                        <img
                          key={index}
                          src={src}
                          alt={`${selectedDestination.name} ${index + 1}`}
                          className="h-32 w-full rounded-2xl object-cover"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {mapQuery && (
                  <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_18px_50px_-24px_rgba(15,23,42,0.25)]">
                    <div className="mb-4">
                      <h3 className="font-semibold text-lg text-slate-900">
                        {t("customPackage.mapTitle")}
                      </h3>
                      <p className="text-sm text-sky-600">
                        {t("customPackage.mapSubtitle")}
                      </p>
                    </div>
                    <div className="aspect-[16/9] overflow-hidden rounded-3xl border border-slate-200">
                      <iframe
                        title="Destination map"
                        src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
                        className="w-full h-full"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                    {selectedDestination && (
                      <div className="mt-4 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_18px_50px_-24px_rgba(15,23,42,0.25)]">
                        <div className="mb-4">
                          <h4 className="text-xl font-semibold text-slate-900">
                            {selectedDestination.name}
                          </h4>
                          <p className="text-sm text-sky-600">
                            {t("customPackage.mapInfoCountry")} {selectedDestination.country}
                          </p>
                        </div>
                        <h5 className="font-semibold mb-2 text-slate-900">
                          {t("customPackage.mapInfoTitle")}
                        </h5>
                        <p className="text-sm text-slate-600 mb-4">
                          {selectedDestination.description}
                        </p>
                        <div className="grid gap-3 grid-cols-1 sm:grid-cols-3 mb-4">
                          {selectedDestination.images.slice(0, 3).map((src, index) => (
                            <img
                              key={index}
                              src={src}
                              alt={`${selectedDestination.name} ${index + 1}`}
                              className="h-28 w-full rounded-2xl object-cover"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6">{t("customPackage.step2")}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  {t("customPackage.startDateLabel")}
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      startDate: e.target.value,
                      endDate: prev.days ? getEndDateFromDays(e.target.value, prev.days) : prev.endDate,
                    }))
                  }
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold">
                    {t("customPackage.tripLengthLabel")}
                  </label>
                  <span className="text-sm text-slate-500">
                    {formData.days} {t("customPackage.days")}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateDays(formData.days - 1)}
                    className="h-12 w-12 rounded-full bg-slate-100 hover:bg-slate-200 transition"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={1}
                    value={formData.days}
                    onChange={(e) => updateDays(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => updateDays(formData.days + 1)}
                    className="h-12 w-12 rounded-full bg-slate-100 hover:bg-slate-200 transition"
                  >
                    +
                  </button>
                </div>
                <div className="mt-4 rounded-[1.75rem] border border-slate-200 bg-white/90 p-4 text-slate-700 shadow-sm">
                  <div className="text-sm font-semibold">{t("customPackage.endDateLabel")}</div>
                  <div className="mt-2">
                    {formData.startDate
                      ? getEndDateFromDays(formData.startDate, formData.days) || t("customPackage.invalidDate")
                      : t("customPackage.selectStartDateFirst")}
                  </div>
                </div>
              </div>
            </div>
            {calculateDaysAway(formData.startDate, formData.endDate) !== null && (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 mt-6 text-slate-700">
                {t("customPackage.daysAwaySummary", {
                  days: calculateDaysAway(formData.startDate, formData.endDate),
                })}
              </div>
            )}
          </div>
        );

      case 3:
        return (
            <div className="space-y-6">
            <h2 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6">{t("customPackage.step8")}</h2>
            <div className="rounded-[2rem] bg-white/95 border border-slate-200 p-8 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.25)]">
              <button
                onClick={() =>
                  setFormData({
                    ...formData,
                    travelers: Math.max(1, formData.travelers - 1),
                  })
                }
                className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-2xl"
              >
                -
              </button>
              <div className="text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                <div className="text-5xl font-bold">{formData.travelers}</div>
                <div className="text-slate-500 mt-2">{t("customPackage.travelersLabel")}</div>
              </div>
              <button
                onClick={() =>
                  setFormData({ ...formData, travelers: formData.travelers + 1 })
                }
                className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-2xl"
              >
                +
              </button>
            </div>
          </div>
        );

      case 4:
        const budgetOptions = [
          { key: "budget", label: t("customPackage.budgetOptions.budget") },
          { key: "mid-range", label: t("customPackage.budgetOptions.midRange") },
          { key: "luxury", label: t("customPackage.budgetOptions.luxury") },
        ];

        return (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6">{t("customPackage.step4")}</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {budgetOptions.map((budget) => (
                <button
                  key={budget.key}
                  onClick={() => setFormData({ ...formData, budget: budget.label })}
                  className={`p-6 rounded-[1.75rem] border transition-all shadow-sm bg-white hover:-translate-y-0.5 hover:shadow-lg ${
                      formData.budget === budget.label
                        ? "border-transparent bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg"
                        : "border-slate-200 text-slate-700"
                    }`}
                >
                  <DollarSign className="w-8 h-8 mb-3 text-blue-600 mx-auto" />
                  <h3 className="font-bold text-lg">{budget.label}</h3>
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        const hotelOptions = [
          { key: "3-star", label: t("customPackage.hotelOptions.threeStar") },
          { key: "4-star", label: t("customPackage.hotelOptions.fourStar") },
          { key: "5-star", label: t("customPackage.hotelOptions.fiveStar") },
          { key: "boutique", label: t("customPackage.hotelOptions.boutique") },
        ];

        return (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6">{t("customPackage.step5")}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {hotelOptions.map((hotel) => (
                <button
                  key={hotel.key}
                  onClick={() => setFormData({ ...formData, hotelType: hotel.label })}
                  className={`p-6 rounded-[1.75rem] border transition-all shadow-sm bg-white hover:-translate-y-0.5 hover:shadow-lg ${
                      formData.hotelType === hotel.label
                        ? "border-transparent bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg"
                        : "border-slate-200 text-slate-700"
                    }`}
                >
                  <Hotel className="w-8 h-8 mb-3 text-blue-600" />
                  <h3 className="font-bold text-lg">{hotel.label}</h3>
                </button>
              ))}
            </div>
          </div>
        );

      case 6:
        const transportOptions = [
          { key: "flight", label: t("customPackage.transportOptions.flight") },
          { key: "bus", label: t("customPackage.transportOptions.bus") },
          { key: "train", label: t("customPackage.transportOptions.train") },
          { key: "private-car", label: t("customPackage.transportOptions.privateCar") },
        ];

        return (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6">{t("customPackage.step6")}</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {transportOptions.map((transport) => (
                <button
                  key={transport.key}
                  onClick={() =>
                    setFormData({ ...formData, transport: transport.label })
                  }
                  className={`p-6 rounded-[1.75rem] border transition-all shadow-sm bg-white hover:-translate-y-0.5 hover:shadow-lg ${
                      formData.transport === transport.label
                        ? "border-transparent bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg"
                        : "border-slate-200 text-slate-700"
                    }`}
                >
                  <Car className="w-8 h-8 mb-3 text-blue-600 mx-auto" />
                  <h3 className="font-bold text-lg">{transport.label}</h3>
                </button>
              ))}
            </div>
          </div>
        );

      case 7:
        const interestOptions = [
          { key: "historical", label: t("customPackage.interests.historical") },
          { key: "nature", label: t("customPackage.interests.nature") },
          { key: "beach", label: t("customPackage.interests.beach") },
          { key: "culture", label: t("customPackage.interests.culture") },
          { key: "food", label: t("customPackage.interests.food") },
          { key: "shopping", label: t("customPackage.interests.shopping") },
          { key: "photography", label: t("customPackage.interests.photography") },
          { key: "family", label: t("customPackage.interests.family") },
          { key: "nightlife", label: t("customPackage.interests.nightlife") },
        ];

        return (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6">{t("customPackage.step7")}</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {interestOptions.map((interest) => (
                <button
                  key={interest.key}
                  onClick={() => toggleInterest(interest.label)}
                  className={`p-4 rounded-[1.75rem] border transition-all shadow-sm bg-white hover:-translate-y-0.5 hover:shadow-lg ${
                      formData.interests.includes(interest.label)
                        ? "border-transparent bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg"
                        : "border-slate-200 text-slate-700"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{interest.label}</span>
                    {formData.interests.includes(interest.label) && (
                      <Check className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-center">
              {t("customPackage.step8")}
            </h2>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <Sparkles className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                <p className="text-lg text-slate-600">
                  {t("customPackage.aiGenerating")}
                </p>
              </div>

              <div className="bg-slate-50 rounded-[1.5rem] p-6 mb-4 border border-slate-200">
                <h3 className="font-bold mb-4">{t("customPackage.yourSelections")}</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">{t("customPackage.labels.destination")}:</span>
                    <span className="ml-2 font-semibold">
                      {formData.destination || t("customPackage.notSpecified")}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">{t("customPackage.labels.type")}:</span>
                    <span className="ml-2 font-semibold">
                      {formData.destinationType}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">{t("customPackage.labels.dates")}:</span>
                    <span className="ml-2 font-semibold">
                      {formData.startDate} {t("customPackage.labels.to")} {formData.endDate}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">{t("customPackage.labels.travelers")}:</span>
                    <span className="ml-2 font-semibold">
                      {formData.travelers}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">{t("customPackage.labels.budget")}:</span>
                    <span className="ml-2 font-semibold">{formData.budget}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">{t("customPackage.labels.hotel")}:</span>
                    <span className="ml-2 font-semibold">
                      {formData.hotelType}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">{t("customPackage.labels.transport")}:</span>
                    <span className="ml-2 font-semibold">
                      {formData.transport}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">{t("customPackage.labels.interests")}:</span>
                    <span className="ml-2 font-semibold">
                      {formData.interests.join(", ")}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleGenerateCustomPackage}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-[1.5rem] hover:shadow-xl transition-all font-semibold text-lg"
              >
                {t("customPackage.viewRecommended")}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-sky-50 to-cyan-100 py-12 relative overflow-hidden">
      <div className="pointer-events-none absolute right-0 top-16 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl"></div>
      <div className="pointer-events-none absolute left-0 bottom-24 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl"></div>
      <div className="container mx-auto px-4 max-w-4xl relative">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 sm:px-6 py-2 rounded-full mb-4 shadow-lg shadow-cyan-200/40 text-sm sm:text-base">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-semibold">{t("customPackage.pageLabel")}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            {t("customPackage.title")}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            {t("customPackage.introText")}
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-700">

              {/* If destination looks like Turkey, ask for name and phone */}
              {(() => {
                const destText = (formData.destination || "").toLowerCase();
                const isTurkey =
                  selectedDestination?.country?.toLowerCase().includes("turkey") ||
                  destText.includes("turk") ||
                  destText.includes("istanbul") ||
                  destText.includes("turkiye");

                if (!isTurkey) return null;

                return (
                  <div className="bg-white rounded-xl p-6 mb-4">
                    <h3 className="font-bold mb-4">{t("customPackage.contactInfo")}</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder={t("customPackage.placeholders.name")}
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="tel"
                        placeholder={t("customPackage.placeholders.phone")}
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                );
              })()}
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-slate-500">
              {Math.round((currentStep / totalSteps) * 100)}%
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white/95 border border-slate-200 rounded-[2rem] shadow-[0_30px_80px_-40px_rgba(15,23,42,0.25)] p-5 sm:p-8 mb-6 sm:mb-8 backdrop-blur-sm"
        >
          {renderStep()}
        </motion.div>

        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
              currentStep === 1
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            {t("customPackage.previous")}
          </button>

          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
            >
              {t("customPackage.next")}
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all">
              <Sparkles className="w-5 h-5" />
              {t("customPackage.generate")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
