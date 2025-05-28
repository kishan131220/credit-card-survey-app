import React from 'react';
import { EMOJIS } from '../utils/emoji.constants';

interface EmojiSelectorProps {
  selectedIndex: number | null;
  hoverIndex: number | null;
  onSelect: (index: number) => void;
  onHover: (index: number | null) => void;
}

const EmojiSelector: React.FC<EmojiSelectorProps> = ({
  selectedIndex,
  hoverIndex,
  onSelect,
  onHover,
}) => {
  return (
    <div className="flex justify-center flex-wrap gap-5 mb-6">
      {EMOJIS.map((emoji, index) => (
        <button
          key={index}
          onMouseEnter={() => onHover(index)}
          onMouseLeave={() => onHover(null)}
          onClick={() => onSelect(index)}
          className="flex flex-col items-center cursor-pointer transition-transform hover:scale-110"
          title={emoji.label}
        >
          <img
            src={
              selectedIndex === index || hoverIndex === index
                ? emoji.highlight
                : emoji.icon
            }
            alt={emoji.label}
            className="w-10 h-10 sm:w-12 sm:h-12 transition-all duration-200"
          />
          <span
            className={`text-xs mt-1 ${
              selectedIndex === index || hoverIndex === index
                ? 'text-yellow-500 font-medium'
                : 'text-gray-600'
            }`}
          >
            {emoji.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default EmojiSelector;
