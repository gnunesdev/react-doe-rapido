import { AddressSuggestionsContainer } from './styles';

interface AddressSuggestions {
  address: any;
  handleSelect: any;
}

export function AddressSuggestions({
  address,
  handleSelect,
}: AddressSuggestions) {
  return (
    <AddressSuggestionsContainer>
      {address.map((address: any) => (
        <li
          key={address.place_id}
          onClick={async () => handleSelect(address.description)}
        >
          <strong>{address.structured_formatting.main_text}</strong>{' '}
          <small>{address.structured_formatting.secondary_text}</small>
        </li>
      ))}
    </AddressSuggestionsContainer>
  );
}
