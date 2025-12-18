import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, Beaker, BookOpen, Code, Users } from "lucide-react";
import { Link } from "wouter";
import type { CategoryType, AgeGroup } from "@shared/schema";
import { motion } from "framer-motion";

interface CategoryCardProps {
  id: string;
  name: string;
  type: CategoryType;
  description?: string;
  moduleCount: number;
  colorClass: string;
  ageGroups?: AgeGroup[];
}

const categoryIcons: Record<CategoryType, typeof Calculator> = {
  math: Calculator,
  science: Beaker,
  language: BookOpen,
  coding: Code,
};

const categoryColors: Record<CategoryType, { bg: string; icon: string; border: string }> = {
  math: {
    bg: "bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700",
    icon: "text-white",
    border: "border-blue-300 dark:border-blue-600",
  },
  science: {
    bg: "bg-gradient-to-br from-emerald-400 to-emerald-600 dark:from-emerald-500 dark:to-emerald-700",
    icon: "text-white",
    border: "border-emerald-300 dark:border-emerald-600",
  },
  language: {
    bg: "bg-gradient-to-br from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600",
    icon: "text-white",
    border: "border-amber-300 dark:border-amber-600",
  },
  coding: {
    bg: "bg-gradient-to-br from-purple-400 to-purple-600 dark:from-purple-500 dark:to-purple-700",
    icon: "text-white",
    border: "border-purple-300 dark:border-purple-600",
  },
};

const ageGroupColors: Record<AgeGroup, string> = {
  "3-5": "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  "6-8": "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
  "9-12": "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
};

export function CategoryCard({
  id,
  name,
  type,
  description,
  moduleCount,
  ageGroups = ["3-5", "6-8", "9-12"],
}: CategoryCardProps) {
  const Icon = categoryIcons[type];
  const colors = categoryColors[type];

  return (
    <Link href={`/category/${id}`} data-testid={`link-category-${type}`}>
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Card
          className={`relative overflow-visible cursor-pointer p-6 ${colors.border} border-2 shadow-lg bg-card`}
          data-testid={`card-category-${type}`}
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div
              className={`w-24 h-24 md:w-28 md:h-28 rounded-2xl ${colors.bg} flex items-center justify-center shadow-md`}
            >
              <Icon className={`w-12 h-12 md:w-14 md:h-14 ${colors.icon}`} strokeWidth={1.5} />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">{name}</h3>
              {description && (
                <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
              )}
            </div>

            <Badge variant="secondary" className="text-sm px-3 py-1">
              {moduleCount} Activities
            </Badge>

            <div className="flex flex-wrap justify-center gap-2 mt-1">
              {ageGroups.map((age) => (
                <div
                  key={age}
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${ageGroupColors[age]}`}
                >
                  <Users className="w-3 h-3" />
                  <span>{age} yrs</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
}
