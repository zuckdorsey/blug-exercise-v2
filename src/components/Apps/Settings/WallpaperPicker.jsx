import React, { useRef } from "react";
import { Check, Upload, X } from "lucide-react";
import useStore from "../../../store/windowStore";
import { wallpapers } from "../../../data/apps/settings/settingsData";

const WallpaperPicker = () => {
  const currentWallpaper = useStore((state) => state.wallpaper);
  const customWallpaper = useStore((state) => state.customWallpaper);
  const setWallpaper = useStore((state) => state.setWallpaper);
  const setCustomWallpaper = useStore((state) => state.setCustomWallpaper);
  const fileInputRef = useRef(null);

  const handleWallpaperChange = (wallpaperId) => {
    setWallpaper(wallpaperId);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomWallpaper(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Mohon pilih file gambar yang valid (JPG, PNG, GIF, dll)");
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveCustom = () => {
    setWallpaper("default");
  };

  // Get current wallpaper details
  const getCurrentWallpaperData = () => {
    if (currentWallpaper === "custom" && customWallpaper) {
      return {
        id: "custom",
        name: "Custom Wallpaper",
        preview: customWallpaper,
        description: "Your uploaded image",
        isImage: true,
      };
    }
    return wallpapers.find((w) => w.id === currentWallpaper) || wallpapers[0];
  };

  const currentWallpaperData = getCurrentWallpaperData();

  return (
    <div className="flex flex-col h-full">
      {/* Preview Section */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Current Wallpaper</h3>
        <div
          className="w-full h-32 rounded-lg shadow-lg border-2 border-gray-200 transition-all duration-300 relative overflow-hidden"
          style={
            currentWallpaperData.isImage
              ? {
                  backgroundImage: `url(${currentWallpaperData.preview})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : { background: currentWallpaperData.preview }
          }
        >
          <div className="w-full h-full flex items-end p-4 bg-gradient-to-t from-black/40 to-transparent rounded-lg">
            <div className="text-white flex items-center justify-between w-full">
              <div>
                <p className="font-semibold">{currentWallpaperData.name}</p>
                <p className="text-xs text-white/80">{currentWallpaperData.description}</p>
              </div>
              {currentWallpaper === "custom" && (
                <button
                  onClick={handleRemoveCustom}
                  className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full transition-colors"
                  title="Hapus wallpaper custom"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Upload Custom Wallpaper Section */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Custom Wallpaper</h3>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        <button
          onClick={handleUploadClick}
          className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 bg-blue-100 group-hover:bg-blue-500 rounded-full transition-colors">
              <Upload className="w-6 h-6 text-blue-500 group-hover:text-white" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-700 group-hover:text-blue-600">
                Upload Wallpaper Anda
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Klik untuk memilih gambar dari komputer Anda
              </p>
              <p className="text-xs text-gray-400 mt-1">JPG, PNG, GIF (Max 10MB)</p>
            </div>
          </div>
        </button>
      </div>

      {/* Wallpaper Grid */}
      <div className="flex-1 overflow-y-auto">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Preset Wallpapers</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {wallpapers.map((wallpaper) => {
            const isActive = wallpaper.id === currentWallpaper;
            return (
              <button
                key={wallpaper.id}
                onClick={() => handleWallpaperChange(wallpaper.id)}
                className={`
                  relative group cursor-pointer rounded-lg overflow-hidden
                  transition-all duration-200 hover:scale-105
                  ${isActive ? "ring-2 ring-blue-500 ring-offset-2" : "hover:ring-2 hover:ring-gray-300"}
                `}
              >
                {/* Wallpaper Preview */}
                <div
                  className="w-full aspect-video"
                  style={{ background: wallpaper.preview }}
                />

                {/* Overlay with name */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-xs font-medium truncate">{wallpaper.name}</p>
                  </div>
                </div>

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1 shadow-lg">
                    <Check className="w-3 h-3" />
                  </div>
                )}

                {/* Bottom label (always visible) */}
                <div className="p-2 bg-white border-t border-gray-100">
                  <p className="text-xs text-gray-700 font-medium truncate">{wallpaper.name}</p>
                  <p className="text-xs text-gray-500 truncate">{wallpaper.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Info Footer */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-800">
          💡 <strong>Tip:</strong> Upload gambar Anda sendiri atau pilih dari preset wallpaper. Perubahan langsung terlihat!
        </p>
      </div>
    </div>
  );
};

export default WallpaperPicker;
