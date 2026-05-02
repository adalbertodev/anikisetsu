import type { Staff } from "../../types";

interface StaffCardProps {
  staff: Staff;
}

export const StaffCard = ({ staff }: StaffCardProps) => {
  return (
    <article className="staff-card">
      <img
        className="staff-card__image"
        src={staff.image ?? "/image-placeholder.png"}
        alt=""
        loading="lazy"
      />

      <div className="staff-card__content">
        <h3 className="staff-card__name">{staff.name}</h3>

        <span className="staff-card__role">{staff.role}</span>
      </div>
    </article>
  );
};
