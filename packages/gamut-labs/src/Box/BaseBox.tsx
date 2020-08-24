import { css } from '@emotion/core';
import { colors, spacing, SpacingSize } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

type Variants = 'yellow' | 'navy' | 'white';
type BoxVariants = {
  text: string;
  background: string;
  interactive?: string;
};

const BOX_VARIANTS: Record<Variants, BoxVariants> = {
  yellow: { text: colors.standard.navy, background: colors.standard.yellow },
  navy: { text: colors.white, background: colors.standard.navy },
  white: { text: colors.standard.navy, background: colors.white },
};

export type BoxProps = {
  /** Background Variation */
  variant?: Variants;
  /** Whether the box should have a border */
  bordered?: boolean;
  /** Standard spacing sizes */
  padding?: SpacingSize;
  /** Position of the hover shadow offset */
  shadowPosition?: 'left' | 'right';
};

const boxBorder = css`
  border: 1px solid ${colors.standard.navy};
  border-radius: 2px;
`;

const translationOffsets = {
  left: {
    body: [spacing[4], `-${spacing[4]}`],
    shadow: [`-${spacing[8]}`, `${spacing[8]}`],
  },
  right: {
    body: [`-${spacing[4]}`, `-${spacing[4]}`],
    shadow: [spacing[8], `${spacing[8]}`],
  },
};

const borderEffect = (direction: 'left' | 'right', variant: Variants) => {
  const { body, shadow } = translationOffsets[direction];
  return css`
  border: 1px solid transparent;
  border-radius: 2px;
  position: relative;
  background-color: ${BOX_VARIANTS[variant].background};
  z-index: 1;
  transition: 0.2s transform;

  &:before {
    content: '';
    ${boxBorder}
    background-color: ${BOX_VARIANTS[variant].background};
    top: -1px;
    left: -1px;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    position: absolute;
    z-index: -1;
  }

  &:after {
    content: '';
    ${boxBorder}
    background-color: ${BOX_VARIANTS[variant].text};
    top: -1px;
    left: -1px;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    position: absolute;
    z-index: -2;
    transition: 0.2s transform;
  }

  &:hover {
    transform: translate(${body.join(', ')});

    &:after {
      transform: translate(${shadow.join(', ')});
    }
  }
`;
};

export const Box = styled.div<BoxProps>`
  ${({ variant }) => {
    if (variant) {
      const { background, text } = BOX_VARIANTS[variant];
      return css`
        background-color: ${background};
        color: ${text};
      `;
    }
  }}
  ${({ bordered, shadowPosition, variant }) =>
    bordered && borderEffect(shadowPosition!, variant!)}
  ${({ padding }) =>
    padding && `padding: ${spacing[padding]} ${spacing[padding]};`}
`;

Box.defaultProps = {
  shadowPosition: 'left',
  variant: 'white',
};
