import React, { createContext, useContext, useState, useEffect } from "react";

export interface Project {
  id: string;
  title: string;
  type: "Structure" | "Story" | "Drawing" | "Animation";
  userEmail: string;
  date: string;
  points: number;
  status: "Draft" | "Submitted";
  content: string; // Serialized canvas content
  thumbnail?: string;
}

interface ProjectsContextValue {
  projects: Project[];
  saveProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  getUserProjects: (userEmail: string) => Project[];
}

const ProjectsContext = createContext<ProjectsContextValue | undefined>(
  undefined
);

export const ProjectsProvider = ({ children }: { children: React.ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const raw = localStorage.getItem("plp_projects");
      return raw ? (JSON.parse(raw) as Project[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("plp_projects", JSON.stringify(projects));
  }, [projects]);

  const saveProject = (project: Project) => {
    setProjects((prev) => {
      const existing = prev.find((p) => p.id === project.id);
      if (existing) {
        return prev.map((p) => (p.id === project.id ? project : p));
      }
      return [...prev, project];
    });
  };

  const deleteProject = (projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
  };

  const updateProject = (
    projectId: string,
    updates: Partial<Project>
  ) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, ...updates } : p))
    );
  };

  const getUserProjects = (userEmail: string): Project[] => {
    return projects.filter((p) => p.userEmail === userEmail);
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        saveProject,
        deleteProject,
        updateProject,
        getUserProjects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const ctx = useContext(ProjectsContext);
  if (!ctx) throw new Error("useProjects must be used within ProjectsProvider");
  return ctx;
};
