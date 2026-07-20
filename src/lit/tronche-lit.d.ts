import type { LitElement } from 'lit'

type Constructor<T> = new (...args: any[]) => T

export interface AvatarBaseProps {
  name?: string
  colors?: string[]
  title?: boolean
  square?: boolean
  size?: number | string
}

export interface AvatarProps extends AvatarBaseProps {
  variant?: 'marble' | 'bauhaus' | 'beam' | 'pixel' | 'ring' | 'sunset'
}

export declare const Avatar: Constructor<LitElement>
export declare const AvatarMarble: Constructor<LitElement>
export declare const AvatarBauhaus: Constructor<LitElement>
export declare const AvatarBeam: Constructor<LitElement>
export declare const AvatarPixel: Constructor<LitElement>
export declare const AvatarRing: Constructor<LitElement>
export declare const AvatarSunset: Constructor<LitElement>
