import AlertItem from "../../Components/parent/AlertItem";

interface Alert {
  id: number;
  message: string;
  type: "warning" | "danger";
}

const Alerts: React.FC = () => {
  const alerts: Alert[] = [
    { id: 1, message: "Exceeded screen time limit", type: "warning" },
    { id: 2, message: "Accessed restricted content", type: "danger" }
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Alerts & Notifications</h1>

      <div className="space-y-4">
        {alerts.map(alert => (
          <AlertItem key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  );
};

export default Alerts;
