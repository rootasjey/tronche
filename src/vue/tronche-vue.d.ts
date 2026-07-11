import type { DefineComponent } from 'vue'

export interface AvatarProps {
  variant?: 'marble' | 'bauhaus' | 'beam' | 'pixel' | 'ring' | 'sunset'
  name?: string
  colors?: string[]
  title?: boolean
  square?: boolean
  size?: number | string
}

export interface AvatarVariantProps {
  name?: string
  colors?: string[]
  title?: boolean
  square?: boolean
  size?: number | string
}

export declare const Avatar: DefineComponent<AvatarProps>
export declare const AvatarMarble: DefineComponent<AvatarVariantProps>
export declare const AvatarBauhaus: DefineComponent<AvatarVariantProps>
export declare const AvatarBeam: DefineComponent<AvatarVariantProps>
export declare const AvatarPixel: DefineComponent<AvatarVariantProps>
export declare const AvatarRing: DefineComponent<AvatarVariantProps>
export declare const AvatarSunset: DefineComponent<AvatarVariantProps>
