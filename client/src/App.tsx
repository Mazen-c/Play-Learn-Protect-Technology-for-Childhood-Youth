import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import ModulesListing from "@/pages/ModulesListing";
import CategoryModules from "@/pages/CategoryModules";
import ModuleActivity from "@/pages/ModuleActivity";
import { useTheme } from "@/hooks/use-theme";

function Router() {
  return (
    <Switch>
      <Route path="/" component={ModulesListing} />
      <Route path="/category/:id" component={CategoryModules} />
      <Route path="/module/:id" component={ModuleActivity} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
