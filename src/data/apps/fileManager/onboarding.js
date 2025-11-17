export const onboardingSteps = [
  {
    folder: "/",
    title: "Selamat Datang di File Manager Linux",
    description:
      "Ini adalah struktur dasar Linux. Gunakan sidebar untuk berpindah antar folder penting dan pelajari fungsinya.",
  },
  {
    folder: "/boot",
    title: "Folder /boot",
    description:
      "Berisi kernel Linux, initramfs, dan konfigurasi bootloader seperti GRUB. Tanpa folder ini sistem tidak bisa menyala.",
  },
  {
    folder: "/bin",
    title: "Folder /bin",
    description:
      "Tempat executable penting: ls, cp, mv, rm. Tools inti yang dipakai seluruh sistem dan harus selalu tersedia.",
  },
  {
    folder: "/etc",
    title: "Folder /etc",
    description:
      "Direktori konfigurasi sistem: network, hostname, passwd, fstab. Admin sering mengedit file di sini.",
  },
  {
    folder: "/home",
    title: "Folder /home",
    description:
      "Tempat folder pengguna. Semua file milik user biasanya ada di sini. Setiap user punya subfolder sendiri.",
  },
  {
    folder: "/usr",
    title: "Folder /usr",
    description:
      "Berisi aplikasi dan library tambahan untuk pengguna. Mirip \"Program Files\" di sistem lain.",
  },
  {
    folder: "/var",
    title: "Folder /var",
    description:
      "Data yang selalu berubah: log, cache, spool. Penting untuk troubleshooting dan monitoring.",
  },
];