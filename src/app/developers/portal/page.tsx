"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";

type Tab = "colors" | "images" | "text" | "analytics";

interface ColorToken {
  name: string;
  value: string;
  variable: string;
}

export default function DevelopersPortal() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("colors");
  const [authorized, setAuthorized] = useState(false);
  const [colors, setColors] = useState<ColorToken[]>([
    { name: "Primary", value: "#B08D57", variable: "--color-bronze-500" },
    { name: "Black", value: "#08090A", variable: "--color-black-950" },
    { name: "White", value: "#FFFFFF", variable: "--color-white" },
    { name: "Text Muted", value: "#6E767E", variable: "--color-concrete-500" },
  ]);
  const [imageUrls, setImageUrls] = useState({
    hero: "/images/hero-home.webp",
    process: "/images/process-1.webp",
    project: "/images/project-1.webp",
  });
  const [pageTexts, setPageTexts] = useState({
    headline: "Premium Property Development",
    subtitle: "Over 100 homes built from first idea to final detail.",
  });
  const [performance, setPerformance] = useState({
    pageLoadTime: "1.2s",
    lighthouse: { performance: 95, accessibility: 98, bestPractices: 100 },
    enquiriesThisMonth: 12,
  });

  useEffect(() => {
    const auth = localStorage.getItem("dev-portal-auth");
    if (!auth) {
      router.push("/developers");
      return;
    }
    setAuthorized(true);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("dev-portal-auth");
    router.push("/developers");
  };

  const handleColorChange = (index: number, newValue: string) => {
    const updated = [...colors];
    updated[index].value = newValue;
    setColors(updated);
    document.documentElement.style.setProperty(updated[index].variable, newValue);
  };

  const handleImageUrlChange = (key: string, newUrl: string) => {
    setImageUrls((prev) => ({ ...prev, [key]: newUrl }));
  };

  const handleTextChange = (key: string, newText: string) => {
    setPageTexts((prev) => ({ ...prev, [key]: newText }));
  };

  if (!authorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black-950">
      <Container className="py-12">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="type-h1 text-white uppercase">Admin Portal</h1>
          <button
            onClick={handleLogout}
            className="px-6 py-2 text-sm text-concrete-300 hover:text-white transition-colors duration-300"
          >
            Logout
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b border-charcoal-800">
          {(["colors", "images", "text", "analytics"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 type-label uppercase transition-colors duration-300 ${
                activeTab === tab
                  ? "border-b-2 border-bronze-500 text-white"
                  : "text-concrete-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="grid gap-8">
          {/* Colors Tab */}
          {activeTab === "colors" && (
            <div>
              <h2 className="type-h3 text-white mb-6">Color Tokens</h2>
              <div className="space-y-4">
                {colors.map((color, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-lg bg-charcoal-900 border border-charcoal-800">
                    <div className="flex-1">
                      <label className="type-label text-concrete-300">{color.name}</label>
                      <p className="text-xs text-concrete-500 mt-1">{color.variable}</p>
                    </div>
                    <input
                      type="color"
                      value={color.value}
                      onChange={(e) => handleColorChange(idx, e.target.value)}
                      className="w-16 h-12 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={color.value}
                      onChange={(e) => handleColorChange(idx, e.target.value)}
                      className="px-3 py-2 rounded bg-black-950 border border-charcoal-800 text-white text-sm font-mono"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Images Tab */}
          {activeTab === "images" && (
            <div>
              <h2 className="type-h3 text-white mb-6">Image URLs</h2>
              <div className="space-y-4">
                {Object.entries(imageUrls).map(([key, url]) => (
                  <div key={key} className="p-4 rounded-lg bg-charcoal-900 border border-charcoal-800">
                    <label className="type-label text-concrete-300 capitalize">{key}</label>
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => handleImageUrlChange(key, e.target.value)}
                      className="mt-3 w-full px-4 py-3 rounded bg-black-950 border border-charcoal-800 text-white text-sm"
                      placeholder="Enter image URL"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Text Tab */}
          {activeTab === "text" && (
            <div>
              <h2 className="type-h3 text-white mb-6">Page Content</h2>
              <div className="space-y-4">
                {Object.entries(pageTexts).map(([key, text]) => (
                  <div key={key} className="p-4 rounded-lg bg-charcoal-900 border border-charcoal-800">
                    <label className="type-label text-concrete-300 capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
                    <textarea
                      value={text}
                      onChange={(e) => handleTextChange(key, e.target.value)}
                      className="mt-3 w-full px-4 py-3 rounded bg-black-950 border border-charcoal-800 text-white text-sm"
                      rows={3}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div>
              <h2 className="type-h3 text-white mb-6">Performance & Metrics</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-6 rounded-lg bg-charcoal-900 border border-charcoal-800">
                  <p className="type-eyebrow text-bronze-400">Page Load Time</p>
                  <p className="type-display-1 text-white mt-4">{performance.pageLoadTime}</p>
                </div>
                <div className="p-6 rounded-lg bg-charcoal-900 border border-charcoal-800">
                  <p className="type-eyebrow text-bronze-400">Enquiries (This Month)</p>
                  <p className="type-display-1 text-white mt-4">{performance.enquiriesThisMonth}</p>
                </div>
                <div className="p-6 rounded-lg bg-charcoal-900 border border-charcoal-800">
                  <p className="type-eyebrow text-bronze-400">Lighthouse Scores</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-concrete-300">Performance</span>
                      <span className="text-bronze-500 font-semibold">{performance.lighthouse.performance}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-concrete-300">Accessibility</span>
                      <span className="text-bronze-500 font-semibold">{performance.lighthouse.accessibility}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-concrete-300">Best Practices</span>
                      <span className="text-bronze-500 font-semibold">{performance.lighthouse.bestPractices}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 p-6 rounded-lg bg-charcoal-900 border border-charcoal-800">
          <p className="type-eyebrow text-concrete-400">
            💡 Changes are stored in your browser session. For production deployment, contact your developer.
          </p>
        </div>
      </Container>
    </div>
  );
}
