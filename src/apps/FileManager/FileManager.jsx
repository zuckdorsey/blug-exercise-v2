import React, { useEffect, useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import Sidebar from "./Sidebar";
import FileList from "./FileList";
import FilePreview from "./FilePreview";
import "./fileManager.css";
import {
  folderInfo,
  getBreadcrumbSegments,
  getChildFolders,
  getFolder,
  rootFolders,
} from "./folderData";
import { onboardingSteps } from "./onboarding";

const STORAGE_KEY = "fileManagerTutorialDone";

const FileManager = () => {
  const [currentPath, setCurrentPath] = useState("/");
  const [onboardingActive, setOnboardingActive] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const done = localStorage.getItem(STORAGE_KEY) === "true";
      if (!done) {
        setOnboardingActive(true);
        if (onboardingSteps[0]?.folder) {
          setCurrentPath(onboardingSteps[0].folder);
        }
      }
    } catch (error) {
      console.error("File Manager onboarding init failed", error);
    }
  }, []);

  useEffect(() => {
    if (!onboardingActive) return;
    const target = onboardingSteps[onboardingStep];
    if (target?.folder && target.folder !== currentPath) {
      setCurrentPath(target.folder);
    }
  }, [onboardingActive, onboardingStep, currentPath]);

  const currentFolder = useMemo(() => getFolder(currentPath), [currentPath]);
  const childFolders = useMemo(() => getChildFolders(currentPath), [currentPath]);
  const breadcrumbs = useMemo(() => getBreadcrumbSegments(currentPath), [currentPath]);
  const files = currentFolder.files || [];

  const sidebarFolders = useMemo(() => {
    return rootFolders
      .map((path) => folderInfo[path])
      .filter(Boolean)
      .map((folder) => ({
        ...folder,
        shortDescription:
          folder.description.length > 60
            ? `${folder.description.slice(0, 57)}...`
            : folder.description,
      }));
  }, []);

  const handleNavigate = (path) => {
    setCurrentPath(path);
    if (onboardingActive) {
      const matchedIndex = onboardingSteps.findIndex((step) => step.folder === path);
      if (matchedIndex !== -1) {
        setOnboardingStep(matchedIndex);
      }
    }
  };

  const handleBreadcrumbClick = (path) => handleNavigate(path);

  const totalSteps = onboardingSteps.length;
  const isLastStep = onboardingStep >= totalSteps - 1;

  const finishOnboarding = () => {
    setOnboardingActive(false);
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch (error) {
      console.error("Failed to persist onboarding", error);
    }
  };

  const handleNext = () => {
    if (isLastStep) {
      finishOnboarding();
    } else {
      setOnboardingStep((step) => Math.min(step + 1, totalSteps - 1));
    }
  };

  const handlePrev = () => {
    setOnboardingStep((step) => Math.max(step - 1, 0));
  };

  return (
    <div className="file-manager relative">
      <Sidebar folders={sidebarFolders} activePath={currentPath} onSelect={handleNavigate} />
      <div className="fm-main">
        <div className="fm-breadcrumbs">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.path}>
              {index > 0 && <span className="separator">/</span>}
              <button type="button" onClick={() => handleBreadcrumbClick(crumb.path)}>
                {crumb.label}
              </button>
            </React.Fragment>
          ))}
        </div>

        <div className="fm-content">
          <FileList folders={childFolders} files={files} onOpenFolder={handleNavigate} />
          <FilePreview folder={currentFolder} />
        </div>
      </div>

      {onboardingActive && onboardingSteps[onboardingStep] && (
        <div className="fm-onboarding-overlay">
          <div className="fm-onboarding-card">
            <div className="fm-onboarding-steps">
              Langkah {onboardingStep + 1} dari {totalSteps}
            </div>
            <h3>{onboardingSteps[onboardingStep].title}</h3>
            <p>{onboardingSteps[onboardingStep].description}</p>

            <div className="fm-onboarding-actions">
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <ChevronRight className="w-4 h-4" />
                {currentPath}
              </div>
              <div className="fm-onboarding-buttons">
                <button
                  type="button"
                  className="fm-button secondary"
                  onClick={handlePrev}
                  disabled={onboardingStep === 0}
                >
                  Previous
                </button>
                <button type="button" className="fm-button secondary" onClick={finishOnboarding}>
                  Finish
                </button>
                <button type="button" className="fm-button primary" onClick={handleNext}>
                  {isLastStep ? "Selesai" : "Next"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileManager;
