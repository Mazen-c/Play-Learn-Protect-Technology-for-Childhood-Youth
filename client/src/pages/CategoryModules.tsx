import { useParams } from "wouter";
import { Header } from "@/components/Header";
import { ModuleCard } from "@/components/ModuleCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Calculator, Beaker, BookOpen, Code, Users } from "lucide-react";
import type { CategoryWithModules, CategoryType, AgeGroup } from "@shared/schema";
import { useState } from "react";

const categoryIcons: Record<CategoryType, typeof Calculator> = {
  math: Calculator,
  science: Beaker,
  language: BookOpen,
  coding: Code,
};

const categoryColors: Record<CategoryType, string> = {
  math: "from-blue-400 to-blue-600",
  science: "from-emerald-400 to-emerald-600",
  language: "from-amber-400 to-orange-500",
  coding: "from-purple-400 to-purple-600",
};

const ageGroups: AgeGroup[] = ["3-5", "6-8", "9-12"];

export default function CategoryModules() {
  const { id } = useParams<{ id: string }>();
  const [selectedAge, setSelectedAge] = useState<AgeGroup | "all">("all");

  const { data: category, isLoading } = useQuery<CategoryWithModules>({
    queryKey: ["/api/categories", id],
  });

  const { data: userStats } = useQuery<{ totalPoints: number }>({
    queryKey: ["/api/user/stats"],
  });

  const { data: progress } = useQuery<Record<string, { progress: number; isCompleted: boolean }>>({
    queryKey: ["/api/user/progress"],
  });

  const Icon = category?.type ? categoryIcons[category.type] : Calculator;
  const gradient = category?.type ? categoryColors[category.type] : categoryColors.math;

  const filteredModules = category?.modules?.filter(
    (m) => selectedAge === "all" || m.ageGroup === selectedAge
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header showBack backHref="/" showPoints points={0} />
        <main className="container px-4 py-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Skeleton className="w-20 h-20 rounded-2xl" />
            <div>
              <Skeleton className="h-8 w-32 mb-2" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-48 rounded-xl" />
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Category not found</h2>
          <p className="text-muted-foreground">The category you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        showBack
        backHref="/"
        title={category.name}
        showPoints
        points={userStats?.totalPoints || 0}
      />

      <main className="container px-4 py-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 mb-8"
        >
          <div
            className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}
          >
            <Icon className="w-10 h-10 md:w-12 md:h-12 text-white" strokeWidth={1.5} />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-muted-foreground">{category.description}</p>
            )}
            <div className="flex items-center gap-2 mt-3">
              <Badge variant="secondary">{category.modules?.length || 0} Modules</Badge>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center gap-2 mb-6"
        >
          <span className="text-sm text-muted-foreground mr-2">Filter by age:</span>
          <Button
            variant={selectedAge === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedAge("all")}
            data-testid="button-filter-all"
          >
            All Ages
          </Button>
          {ageGroups.map((age) => (
            <Button
              key={age}
              variant={selectedAge === age ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedAge(age)}
              className="gap-1"
              data-testid={`button-filter-${age}`}
            >
              <Users className="w-3 h-3" />
              {age} yrs
            </Button>
          ))}
        </motion.div>

        {filteredModules && filteredModules.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            data-testid="modules-grid"
          >
            {filteredModules.map((module) => (
              <motion.div key={module.id} variants={itemVariants}>
                <ModuleCard
                  module={module}
                  progress={progress?.[module.id]?.progress || 0}
                  isCompleted={progress?.[module.id]?.isCompleted || false}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Icon className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No modules available
            </h3>
            <p className="text-muted-foreground">
              {selectedAge !== "all"
                ? `No modules found for ages ${selectedAge}. Try a different age group.`
                : "Check back soon for new learning content!"}
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
}
