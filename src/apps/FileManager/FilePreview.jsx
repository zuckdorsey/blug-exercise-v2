import React from "react";
import { ShieldCheck, TerminalSquare } from "lucide-react";

const InfoRow = ({ label, value }) => (
  <div className="flex items-center gap-2 text-sm text-white/70">
    <span className="uppercase tracking-[0.2em] text-[0.6rem] text-white/40">{label}</span>
    <span className="font-semibold text-white/80">{value}</span>
  </div>
);

const FilePreview = ({ folder }) => {
  if (!folder) return null;

  return (
    <aside className="fm-preview">
      <div className="flex items-center gap-3">
        {folder.icon && <folder.icon className="w-7 h-7 text-sky-300" />}
        <div>
          <h2>{folder.path}</h2>
          <p>{folder.description}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        <InfoRow label="Nama" value={folder.name} />
        <InfoRow label="Tipe" value={folder.children?.length ? "Folder & subtree" : "Folder"} />
        <InfoRow label="Subfolder" value={folder.children?.length || 0} />
        <InfoRow label="Contoh File" value={folder.files?.length || 0} />
      </div>

      {folder.files?.length > 0 && (
        <div>
          <div className="fm-section-title">Contoh File</div>
          <ul className="fm-highlight-list">
            {folder.files.map((file) => (
              <li key={file.name}>
                <TerminalSquare className="inline w-4 h-4 text-white/70 mr-2" />
                <span className="font-semibold mr-1">{file.name}</span>
                <span>{file.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center gap-2 text-sm text-white/65 bg-white/5 rounded-xl px-3 py-2">
        <ShieldCheck className="w-4 h-4 text-emerald-300" />
        Folder ini bersifat read-only dalam simulasi WebOS ini.
      </div>
    </aside>
  );
};

export default FilePreview;
