import React from "react";
import useStore from "./store/windowStore";
import Desktop from "./components/Desktop/Desktop";
import AppLauncher from "./components/Menu/AppLauncher";
import MacOSWindow from "./components/Window/MacOSWindow";
import Dock from "./components/Dock/Dock";
import MenuBar from "./components/MenuBar/MenuBar";
import ControlCenter from "./components/ControlCenter/ControlCenter";

// Import all app components
import Terminal from "./components/Apps/Terminal/Terminal";
import Sejarah from "./components/Apps/Sejarah/Sejarah";
import Distro from "./components/Apps/Distro/Distro";
import Kelebihan from "./components/Apps/Kelebihan/Kelebihan";
import Fitur from "./components/Apps/Fitur/Fitur";
import PerintahDasar from "./components/Apps/PerintahDasar/PerintahDasar";
import Tentang from "./components/Apps/Tentang/Tentang";
import SettingsApp from "./components/Apps/Settings/SettingsApp";

import {
  Terminal as TerminalIcon,
  FileText,
  FolderOpen,
  Info,
  Monitor,
  Command,
  Settings,
} from "lucide-react";

const appRegistry = {
  terminal: { component: Terminal, title: "Terminal", icon: TerminalIcon },
  sejarah: { component: Sejarah, title: "Sejarah Linux", icon: FileText },
  distro: { component: Distro, title: "Distribusi Linux", icon: FolderOpen },
  kelebihan: { component: Kelebihan, title: "Kelebihan Linux", icon: Info },
  fitur: { component: Fitur, title: "Fitur Utama", icon: Monitor },
  perintah: { component: PerintahDasar, title: "Perintah Dasar", icon: Command },
  tentang: { component: Tentang, title: "Tentang Linux", icon: Info },
  settings: { component: SettingsApp, title: "Settings", icon: Settings },
};

function App() {
  const windows = useStore((state) => state.windows);
  const darkMode = useStore((state) => state.darkMode);

  return (
    <div className={`w-screen h-screen overflow-hidden relative ${darkMode ? 'dark' : ''}`}>
      <MenuBar />
      <Desktop>
        {/* Render all open windows */}
        {windows.map((win) => {
          const app = appRegistry[win.id];
          if (!app) return null;

          const AppComponent = app.component;
          return (
            <MacOSWindow key={win.id} id={win.id} title={app.title} icon={app.icon}>
              <AppComponent />
            </MacOSWindow>
          );
        })}
      </Desktop>

      <AppLauncher />
      <Dock />
      <ControlCenter />
    </div>
  );
}

export default App;
