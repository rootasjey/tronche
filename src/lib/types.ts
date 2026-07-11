export type AvatarVariant = 'marble' | 'bauhaus' | 'beam' | 'pixel' | 'ring' | 'sunset';

export interface AvatarOptions {
  name: string;
  colors: string[];
  title?: boolean;
  square?: boolean;
  size?: number;
}

export interface AvatarData {
  maskId: string;
}
