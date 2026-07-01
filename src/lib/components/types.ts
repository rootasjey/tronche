import type { SVGAttributes } from 'vue';

export interface AvatarProps extends SVGAttributes {
  name: string;
  colors: string[];
  title?: boolean;
  square?: boolean;
  size?: number | string;
}

export type AvatarVariant = 'marble' | 'bauhaus' | 'beam' | 'pixel' | 'ring' | 'sunset';

export interface AvatarComponentProps extends AvatarProps {
  variant?: AvatarVariant;
}