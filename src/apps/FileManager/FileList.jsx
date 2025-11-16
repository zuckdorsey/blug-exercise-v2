import React from "react";
import { Folder, FileText } from "lucide-react";

const FileList = ({ folders, files = [], onOpenFolder }) => {
  return (
    <div className="fm-file-list">
      <div className="fm-section">
        <div className="fm-section-title">Folders</div>
        {folders.length === 0 ? (
          <p className="text-sm text-white/70">Tidak ada sub-folder di direktori ini.</p>
        ) : (
          <div className="fm-grid">
            {folders.map((folder) => {
              const Icon = folder.icon || Folder;
              return (
                <button
                  type="button"
                  key={folder.path}
                  className="fm-folder-card"
                  onClick={() => onOpenFolder(folder.path)}
                >
                  <Icon className="w-6 h-6 text-sky-300" />
                  <div className="folder-name">{folder.name}</div>
                  <div className="folder-desc">{folder.description}</div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="fm-section mt-6">
        <div className="fm-section-title">Files</div>
        {files.length === 0 ? (
          <p className="text-sm text-white/70">Belum ada file contoh pada folder ini.</p>
        ) : (
          <ul>
            {files.map((file) => (
              <li key={file.name}>
                <FileText className="w-4 h-4 text-amber-300" />
                <div>
                  <div className="font-medium">{file.name}</div>
                  <div className="text-xs text-white/60">{file.description}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FileList;
