interface StatsBadgeProps {
  label: string;
  value: number;
  color?: string;
}

function StatsBadge({ label, value, color = "#1e40af" }: StatsBadgeProps) {
  return (
    <div
      style={{
        border: `1px solid ${color}`,
        borderRadius: "8px",
        padding: "16px",
        textAlign: "center",
        minWidth: "160px",
      }}
    >
      <div style={{ fontSize: "28px", fontWeight: 700, color }}>{value}</div>
      <div style={{ fontSize: "14px", color: "#64748b" }}>{label}</div>
    </div>
  );
}

export default StatsBadge;