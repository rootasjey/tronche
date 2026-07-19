import type { Component } from 'svelte'

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

export declare const Avatar: Component<AvatarProps>
export declare const AvatarMarble: Component<AvatarBaseProps>
export declare const AvatarBauhaus: Component<AvatarBaseProps>
export declare const AvatarBeam: Component<AvatarBaseProps>
export declare const AvatarPixel: Component<AvatarBaseProps>
export declare const AvatarRing: Component<AvatarBaseProps>
export declare const AvatarSunset: Component<AvatarBaseProps>
