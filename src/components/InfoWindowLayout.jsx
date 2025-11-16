import React, { useEffect, useMemo, useState } from "react";
import "./InfoWindowLayout.css";

const accentClassMap = {
  blue: "accent-blue",
  cyan: "accent-cyan",
  emerald: "accent-emerald",
  purple: "accent-purple",
  pink: "accent-pink",
  amber: "accent-amber",
};

const createIconElement = (iconProp, props = {}) => {
  if (!iconProp) return null;
  if (React.isValidElement(iconProp)) {
    return React.cloneElement(iconProp, props);
  }
  if (typeof iconProp === "string") {
    return iconProp;
  }
  return React.createElement(iconProp, props);
};

const InfoWindowLayout = ({
  title,
  subtitle,
  description,
  icon,
  sections,
  defaultSectionId,
  sidebarTitle = "Navigasi",
  eyebrow = "Informasi",
  actions,
  className = "",
  accent = "blue",
  children,
  onSectionChange,
}) => {
  const hasSidebar = Array.isArray(sections) && sections.length > 0;
  const [activeSection, setActiveSection] = useState(() => {
    if (!hasSidebar) return null;
    return defaultSectionId ?? sections[0]?.id ?? null;
  });

  useEffect(() => {
    if (!hasSidebar) {
      setActiveSection(null);
      return;
    }

    setActiveSection((prev) => {
      if (prev && sections.some((section) => section.id === prev)) {
        return prev;
      }
      return defaultSectionId ?? sections[0]?.id ?? null;
    });
  }, [hasSidebar, sections, defaultSectionId]);

  const resolvedIcon = useMemo(
    () => createIconElement(icon, { size: 22, strokeWidth: 1.6 }),
    [icon]
  );

  const activeSectionContent = hasSidebar
    ? sections.find((section) => section.id === activeSection)
    : null;

  const handleSectionClick = (id) => {
    setActiveSection(id);
    if (typeof onSectionChange === "function") {
      onSectionChange(id);
    }
  };

  const accentClass = accentClassMap[accent] ?? accentClassMap.blue;

  return (
    <div className={`info-window ${accentClass} ${className}`.trim()}>
      <div className="info-sheen" aria-hidden="true" />
      <header className="info-header">
        <div className="info-header-meta">
          {resolvedIcon && <div className="info-header-icon">{resolvedIcon}</div>}
          <div>
            {eyebrow && <p className="info-eyebrow">{eyebrow}</p>}
            <h1>{title}</h1>
            {subtitle && <p className="info-subtitle">{subtitle}</p>}
            {description && <p className="info-description">{description}</p>}
          </div>
        </div>
        {actions && <div className="info-header-actions">{actions}</div>}
      </header>
      <div className="info-divider" />
      <div className={`info-body ${hasSidebar ? "with-sidebar" : ""}`.trim()}>
        {hasSidebar && (
          <aside className="info-sidebar">
            {sidebarTitle && <p className="info-sidebar-title">{sidebarTitle}</p>}
            <div className="info-sidebar-buttons">
              {sections.map((section) => (
                <button
                  type="button"
                  key={section.id}
                  onClick={() => handleSectionClick(section.id)}
                  className={`info-sidebar-button ${
                    section.id === activeSection ? "active" : ""
                  }`.trim()}
                >
                  {section.icon && (
                    <span className="info-sidebar-icon">
                      {createIconElement(section.icon, { size: 16 })}
                    </span>
                  )}
                  <div>
                    <p className="info-sidebar-label">{section.label}</p>
                    {section.caption && (
                      <p className="info-sidebar-caption">{section.caption}</p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </aside>
        )}
        <main className="info-main">
          {hasSidebar ? activeSectionContent?.content : children}
        </main>
      </div>
    </div>
  );
};

export default InfoWindowLayout;
