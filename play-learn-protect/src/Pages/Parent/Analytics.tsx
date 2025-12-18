import ScreenTimeChart from "../../Components/parent/ScreenTimeChart";

const Analytics: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>

      <ScreenTimeChart />

      <div className="mt-8 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Content Access</h2>
        <ul className="space-y-2 text-gray-700">
          <li>Math Games – 40 minutes</li>
          <li>Science Videos – 30 minutes</li>
          <li>Coding Activities – 20 minutes</li>
        </ul>
      </div>
    </div>
  );
};

export default Analytics;
