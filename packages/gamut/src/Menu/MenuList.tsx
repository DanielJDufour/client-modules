import { colors, spacing } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { MenuList as ReachMenuList } from '@reach/menu-button';

export const MenuList = styled(ReachMenuList)`
  background: ${colors.white};
  border: 1px solid ${colors.black};
  border-radius: 2px;
  margin-left: 0.5rem;
  padding: ${spacing[8]} 0;
`;