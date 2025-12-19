interface Module {
  name: string;
  progress: number;
}

interface ProgressItemProps {
  module: Module;
}

const ProgressItem: React.FC<ProgressItemProps> = ({ module }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="font-semibold">{module.name}</h2>

      <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
        <div
          className="bg-green-500 h-3 rounded-full"
          style={{ width: `${module.progress}%` }}
        />
      </div>

      <p className="text-sm text-gray-600 mt-1">
        {module.progress}% completed
      </p>
    </div>
  );
};

export default ProgressItem;

