interface StatusBadgeProps {
  status?: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <div className="badge badge--status" data-status={status?.toLowerCase()}>
      <span className="badge__label">{status}</span>
    </div>
  );
};
