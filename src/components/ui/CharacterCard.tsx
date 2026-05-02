import type { Character } from "../../types";

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
  return (
    <article className="character-card">
      <img
        className="character-card__image"
        src={character.image ?? "/image-placeholder.png"}
        alt=""
        loading="lazy"
      />

      <div className="character-card__content">
        <h3 className="character-card__name">{character.name.full}</h3>

        <span className="character-card__role">{character.role}</span>

        <span className="character-card__seiyuu">
          {
            character.voiceActors.find(
              (voiceActor) => voiceActor.language == "Japanese",
            )?.name
          }
        </span>
      </div>
    </article>
  );
};
