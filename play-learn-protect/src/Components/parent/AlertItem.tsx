interface Alert {
  message: string;
  type: "warning" | "danger";
}

interface AlertItemProps {
  alert: Alert;
}

const AlertItem: React.FC<AlertItemProps> = ({ alert }) => {
  return (
    <div
      className={`p-4 rounded-xl shadow flex justify-between items-center
      ${alert.type === "danger" ? "bg-red-100" : "bg-yellow-100"}`}
    >
      <p>{alert.message}</p>
      <button className="bg-black text-white px-4 py-1 rounded">
        Acknowledge
      </button>
    </div>
  );
};

export default AlertItem;
