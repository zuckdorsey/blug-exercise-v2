import React from "react";

const Sidebar = ({ folders, activePath, onSelect }) => {
  return (
    <aside className="fm-sidebar">
      <div className="fm-sidebar-header">Linux Folders</div>
      <div className="flex flex-col gap-2">
        {folders.map((folder) => {
          const Icon = folder.icon;
          return (
            <button
              key={folder.path}
              type="button"
              className={`fm-folder-button ${activePath === folder.path ? "active" : ""}`}
              onClick={() => onSelect(folder.path)}
            >
              {Icon && <Icon className="w-5 h-5 text-sky-300" />}
              <div className="text-left">
                <h4>{folder.name}</h4>
                <p>{folder.shortDescription || folder.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
