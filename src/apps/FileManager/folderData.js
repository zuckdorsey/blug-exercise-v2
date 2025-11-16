import {
  HardDrive,
  Box,
  Cpu,
  Cog,
  Home,
  FolderTree,
  HardDriveDownload,
  Usb,
  Briefcase,
  Server,
  Shield,
  FileCog,
  ActivitySquare,
  Package2,
  LifeBuoy,
  ArchiveRestore,
  Layers,
  TerminalSquare,
  FileText,
} from "lucide-react";

const createFolder = ({ path, name, description, icon, children = [], files = [] }) => ({
  path,
  name,
  description,
  icon,
  children,
  files,
});

export const folderInfo = {
  "/": createFolder({
    path: "/",
    name: "/ (root)",
    description:
      "Akar dari seluruh sistem berkas Linux. Semua direktori lain bercabang dari sini.",
    icon: HardDrive,
    children: [
      "/bin",
      "/boot",
      "/dev",
      "/etc",
      "/home",
      "/lib",
      "/media",
      "/mnt",
      "/opt",
      "/proc",
      "/root",
      "/run",
      "/sbin",
      "/srv",
      "/sys",
      "/tmp",
      "/usr",
      "/var",
    ],
    files: [
      { name: "README.txt", description: "Panduan singkat struktur sistem" },
    ],
  }),
  "/bin": createFolder({
    path: "/bin",
    name: "bin",
    description:
      "Berisi program executable dasar seperti ls, cp, mv, mkdir yang dibutuhkan semua user.",
    icon: Box,
    files: [
      { name: "ls", description: "List directory" },
      { name: "cp", description: "Copy files" },
      { name: "mv", description: "Move/Rename" },
    ],
  }),
  "/boot": createFolder({
    path: "/boot",
    name: "boot",
    description: "File penting untuk proses booting: kernel, initrd, GRUB, dan konfigurasi loader.",
    icon: HardDriveDownload,
    files: [
      { name: "vmlinuz-linux", description: "Kernel utama" },
      { name: "initramfs.img", description: "Initial RAM disk" },
    ],
  }),
  "/dev": createFolder({
    path: "/dev",
    name: "dev",
    description: "Device files untuk hardware (disk, terminal, random generator).",
    icon: Usb,
    files: [
      { name: "sda", description: "Disk pertama" },
      { name: "tty0", description: "Virtual console" },
    ],
  }),
  "/etc": createFolder({
    path: "/etc",
    name: "etc",
    description: "Direktori konfigurasi global: network, hosts, fstab, passwd, services.",
    icon: Cog,
    files: [
      { name: "hosts", description: "Mapping hostname" },
      { name: "fstab", description: "Mount table" },
      { name: "passwd", description: "Daftar user" },
    ],
  }),
  "/home": createFolder({
    path: "/home",
    name: "home",
    description: "Folder untuk semua pengguna. Setiap user punya subfolder sendiri.",
    icon: Home,
    children: ["/home/bill"],
  }),
  "/home/bill": createFolder({
    path: "/home/bill",
    name: "bill",
    description: "Folder pribadi pengguna 'bill' — menyimpan dokumen dan konfigurasi.",
    icon: Home,
    files: [
      { name: "Documents/", description: "Catatan belajar Linux" },
      { name: ".bashrc", description: "Preferensi shell" },
    ],
  }),
  "/lib": createFolder({
    path: "/lib",
    name: "lib",
    description: "Library penting yang digunakan binary di /bin dan /sbin.",
    icon: Layers,
    files: [{ name: "libc.so", description: "GNU C library" }],
  }),
  "/media": createFolder({
    path: "/media",
    name: "media",
    description: "Mount point untuk removable media (USB, DVD).",
    icon: Briefcase,
  }),
  "/mnt": createFolder({
    path: "/mnt",
    name: "mnt",
    description: "Mount point sementara saat admin melakukan mounting manual.",
    icon: Briefcase,
    files: [{ name: "project-drive", description: "Mount disk eksternal" }],
  }),
  "/opt": createFolder({
    path: "/opt",
    name: "opt",
    description: "Software opsional / pihak ketiga seperti suite enterprise.",
    icon: Package2,
    files: [{ name: "acme-suite", description: "Contoh aplikasi vendor" }],
  }),
  "/proc": createFolder({
    path: "/proc",
    name: "proc",
    description: "Pseudo-filesystem berisi informasi kernel & proses real-time.",
    icon: Server,
    files: [{ name: "cpuinfo", description: "Detail CPU" }],
  }),
  "/root": createFolder({
    path: "/root",
    name: "root (user)",
    description: "Home directory khusus untuk superuser root.",
    icon: Shield,
    files: [{ name: "root-notes.txt", description: "Catatan admin" }],
  }),
  "/run": createFolder({
    path: "/run",
    name: "run",
    description: "Data runtime volatile seperti PID file dan socket.",
    icon: ActivitySquare,
  }),
  "/sbin": createFolder({
    path: "/sbin",
    name: "sbin",
    description: "Binary administratif seperti fdisk, mkfs, ifconfig (akses root).",
    icon: Shield,
    files: [{ name: "fdisk", description: "Manajer partisi" }],
  }),
  "/srv": createFolder({
    path: "/srv",
    name: "srv",
    description: "Data untuk layanan yang disediakan server: web, ftp, dll.",
    icon: Server,
  }),
  "/sys": createFolder({
    path: "/sys",
    name: "sys",
    description: "Interface ke kernel dan device tree modern (sysfs).",
    icon: Cpu,
  }),
  "/tmp": createFolder({
    path: "/tmp",
    name: "tmp",
    description: "File sementara. Dibersihkan secara otomatis saat reboot.",
    icon: ArchiveRestore,
  }),
  "/usr": createFolder({
    path: "/usr",
    name: "usr",
    description: "User Space binaries, library, dan shared resources.",
    icon: FolderTree,
    children: ["/usr/bin", "/usr/lib", "/usr/share"],
  }),
  "/usr/bin": createFolder({
    path: "/usr/bin",
    name: "usr/bin",
    description: "Sebagian besar aplikasi user-level: editors, browsers, git, dsb.",
    icon: Box,
    files: [{ name: "nano", description: "Editor teks" }],
  }),
  "/usr/lib": createFolder({
    path: "/usr/lib",
    name: "usr/lib",
    description: "Library tambahan yang dibutuhkan program user space.",
    icon: Layers,
  }),
  "/usr/share": createFolder({
    path: "/usr/share",
    name: "usr/share",
    description: "File data arsitektur-independen (ikon, docs, locale).",
    icon: LifeBuoy,
    files: [{ name: "man/", description: "Manual pages" }],
  }),
  "/var": createFolder({
    path: "/var",
    name: "var",
    description: "Data yang berubah dinamis: log, cache, spool, tmp.",
    icon: FileCog,
    children: ["/var/log", "/var/cache", "/var/tmp"],
  }),
  "/var/log": createFolder({
    path: "/var/log",
    name: "log",
    description: "Catatan sistem dan aplikasi (syslog, journal).",
    icon: FileText,
    files: [{ name: "syslog", description: "Log sistem harian" }],
  }),
  "/var/cache": createFolder({
    path: "/var/cache",
    name: "cache",
    description: "Cache aplikasi (man page, package manager).",
    icon: Box,
  }),
  "/var/tmp": createFolder({
    path: "/var/tmp",
    name: "tmp (var)",
    description: "Temporary files yang bertahan lebih lama dari /tmp.",
    icon: ArchiveRestore,
  }),
};

export const rootFolders = [
  "/",
  "/home",
  "/bin",
  "/boot",
  "/etc",
  "/usr",
  "/var",
  "/tmp",
  "/opt",
  "/srv",
  "/root",
];

export const getBreadcrumbSegments = (path) => {
  if (!path || path === "/") {
    return [{ label: "root", path: "/" }];
  }

  const segments = path.split("/").filter(Boolean);
  const breadcrumbs = [{ label: "root", path: "/" }];
  let accumulator = "";

  segments.forEach((segment) => {
    accumulator += `/${segment}`;
    breadcrumbs.push({ label: segment, path: accumulator || "/" });
  });

  return breadcrumbs;
};

export const getChildFolders = (path) => {
  const entry = folderInfo[path];
  if (!entry || !entry.children) return [];
  return entry.children
    .map((childPath) => folderInfo[childPath])
    .filter(Boolean);
};

export const getFolder = (path) => folderInfo[path] || folderInfo["/"];