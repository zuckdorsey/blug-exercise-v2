import React, { useState } from "react";
import { Palette, Image, Info, ChevronRight } from "lucide-react";
import WallpaperPicker from "./WallpaperPicker";

const SettingsApp = () => {
  const [activeSection, setActiveSection] = useState("wallpaper");

  const sections = [
    {
      id: "appearance",
      name: "Appearance",
      icon: Palette,
      description: "Customize your desktop look",
    },
    {
      id: "wallpaper",
      name: "Wallpaper",
      icon: Image,
      description: "Change desktop background",
    },
    {
      id: "about",
      name: "About",
      icon: Info,
      description: "System information",
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "wallpaper":
        return <WallpaperPicker />;
      case "appearance":
        return (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Palette className="w-16 h-16 mb-4 opacity-50" />
            <p className="text-lg font-semibold">Appearance Settings</p>
            <p className="text-sm mt-2">Coming soon...</p>
          </div>
        );
      case "about":
        return (
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg text-white">
              <h2 className="text-2xl font-bold mb-2">BlueG WebOS</h2>
              <p className="text-sm opacity-90">Linux Education Platform</p>
            </div>
            <div className="space-y-2">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500">Version</p>
                <p className="text-sm font-semibold text-gray-800">1.0.0</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500">Built with</p>
                <p className="text-sm font-semibold text-gray-800">React + Vite + TailwindCSS</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500">Purpose</p>
                <p className="text-sm font-semibold text-gray-800">Interactive Linux Learning Environment</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full bg-white">
      {/* Sidebar */}
      <div className="w-48 md:w-56 bg-gray-50 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">Settings</h2>
          <p className="text-xs text-gray-500 mt-1">Customize your WebOS</p>
        </div>
        
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                  transition-all duration-200 text-left group
                  ${
                    isActive
                      ? "bg-blue-500 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-white" : "text-gray-500 group-hover:text-gray-700"}`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${isActive ? "text-white" : "text-gray-900"}`}>
                    {section.name}
                  </p>
                  <p className={`text-xs truncate ${isActive ? "text-blue-100" : "text-gray-500"}`}>
                    {section.description}
                  </p>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 flex-shrink-0" />}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-gray-200 bg-white">
          <p className="text-xs text-gray-500 text-center">
            🐧 Linux WebOS v1.0
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SettingsApp;
