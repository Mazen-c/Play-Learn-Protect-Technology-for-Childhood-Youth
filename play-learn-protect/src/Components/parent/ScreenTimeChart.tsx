const ScreenTimeChart: React.FC = () => {
  const days: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">
        Screen Time (This Week)
      </h2>

      <div className="space-y-3">
        {days.map((day, index) => (
          <div key={day}>
            <p className="text-sm">{day}</p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full"
                style={{ width: `${(index + 1) * 15}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScreenTimeChart;
