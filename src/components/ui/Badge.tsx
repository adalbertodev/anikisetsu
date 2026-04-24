interface BadgeProps {
  label: string;
}

export const Badge = ({ label }: BadgeProps) => {
  return (
    <div className="badge">
      <span className="badge__label">{label}</span>
    </div>
  );
};
