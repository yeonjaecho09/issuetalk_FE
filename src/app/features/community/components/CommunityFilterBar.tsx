import type { CommunityCategory } from '../../../data/communityData';
import { PillButton } from '../../../components/ui/primitives';
import { FilterRow } from './CommunityFilterBar.styles';

type CommunityFilterBarProps = {
  categories: CommunityCategory[];
  selectedCategory: CommunityCategory;
  onSelect: (category: CommunityCategory) => void;
};

export function CommunityFilterBar({ categories, selectedCategory, onSelect }: CommunityFilterBarProps) {
  return (
    <FilterRow>
      {categories.map(category => (
        <PillButton key={category} type="button" $active={selectedCategory === category} onClick={() => onSelect(category)}>
          {category}
        </PillButton>
      ))}
    </FilterRow>
  );
}
