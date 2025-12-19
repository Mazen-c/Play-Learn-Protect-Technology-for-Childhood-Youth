interface StatCardProps {
  title: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-gray-500 text-sm">{title}</h2>
      <p className="text-2xl font-semibold mt-2">{value}</p>
    </div>
  );
};

export default StatCard;
