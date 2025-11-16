import {
  Settings,
  Terminal,
  FileText,
  FolderOpen,
  Info,
  Monitor,
  Command,
} from "lucide-react";

export const dockApps = [
  {
    id: "terminal",
    name: "Terminal",
    icon: Terminal,
    color: "#000000",
  },
  {
    id: "sejarah",
    name: "Sejarah Linux",
    icon: FileText,
    color: "#3B82F6",
  },
  {
    id: "distro",
    name: "Distribusi Linux",
    icon: FolderOpen,
    color: "#F59E0B",
  },
  {
    id: "kelebihan",
    name: "Kelebihan",
    icon: Monitor,
    color: "#10B981",
  },
  {
    id: "fitur",
    name: "Fitur",
    icon: Info,
    color: "#8B5CF6",
  },
  {
    id: "perintah",
    name: "Perintah Dasar",
    icon: Command,
    color: "#EF4444",
  },
  {
    id: "tentang",
    name: "Tentang Linux",
    icon: Info,
    color: "#06B6D4",
  },
  {
    id: "settings",
    name: "Settings",
    icon: Settings,
    color: "#6B7280",
  },
];
