import { Header } from "@/components/Header";
import { CategoryCard } from "@/components/CategoryCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import type { Category } from "@shared/schema";

export default function ModulesListing() {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: userStats } = useQuery<{ totalPoints: number }>({
    queryKey: ["/api/user/stats"],
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-modules-listing">
      <Header
        title="Learning Modules"
        showPoints
        points={userStats?.totalPoints || 0}
      />

      <main className="container px-4 py-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-page-title">
            What do you want to learn today?
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-page-description">
            Choose a category and start your learning adventure! Complete activities to earn points and unlock new challenges.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-6 rounded-2xl border">
                <div className="flex flex-col items-center gap-4">
                  <Skeleton className="w-28 h-28 rounded-2xl" />
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-6 w-24" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            data-testid="categories-grid"
          >
            {categories?.map((category) => (
              <motion.div key={category.id} variants={itemVariants}>
                <CategoryCard
                  id={category.id}
                  name={category.name}
                  type={category.type}
                  description={category.description || ""}
                  moduleCount={category.moduleCount || 0}
                  colorClass={category.colorClass}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-muted rounded-full">
            <span className="text-sm text-muted-foreground">
              For children ages 3-12 years
            </span>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
