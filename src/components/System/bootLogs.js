const bootLogs = [
  { status: "OK", message: "Initializing BlueG LinuxOnWeb firmware..." },
  { status: "OK", message: "Probing CPU topology (8 cores detected)" },
  { status: "OK", message: "Calibrating system clock" },
  { status: "OK", message: "Starting init system..." },
  { status: "OK", message: "Loading kernel modules..." },
  { status: "OK", message: "Mounting /dev, /proc, /sys..." },
  { status: "OK", message: "Checking file system integrity" },
  { status: "OK", message: "Spawning system services" },
  { status: "OK", message: "Configuring network interfaces" },
  { status: "OK", message: "Synchronizing time with ntp.blueg.local" },
  { status: "OK", message: "Starting GNOME Display Manager..." },
  { status: "OK", message: "Handing off control to user session" },
  { status: "OK", message: "Boot completed. Welcome to BlueG LinuxOnWeb." }
];

export default bootLogs;
