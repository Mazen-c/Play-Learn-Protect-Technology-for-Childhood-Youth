import ProgressItem from "../../Components/parent/ProgressItem";

interface Module {
  name: string;
  progress: number;
}

const ChildProgress: React.FC = () => {
  const modules: Module[] = [
    { name: "Math Basics", progress: 80 },
    { name: "Science Fun", progress: 60 },
    { name: "Coding for Kids", progress: 40 }
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Child Progress</h1>

      <div className="space-y-4">
        {modules.map((module, index) => (
          <ProgressItem key={index} module={module} />
        ))}
      </div>
    </div>
  );
};

export default ChildProgress;
