import styled from 'styled-components';

export const FilterRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[3]};
  margin-bottom: ${props => props.theme.spacing[6]};
`;
