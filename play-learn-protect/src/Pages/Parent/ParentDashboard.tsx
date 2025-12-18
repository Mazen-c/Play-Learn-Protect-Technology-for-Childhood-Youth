import StatCard from "../../Components/parent/StatCard";

const ParentDashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Parent Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Points" value="1,250" />
        <StatCard title="Achievements" value="12 Badges" />
        <StatCard title="Active Time Today" value="1h 40m" />
      </div>
    </div>
  );
};

export default ParentDashboard;
