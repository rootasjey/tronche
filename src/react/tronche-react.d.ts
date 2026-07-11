import type { ComponentType, SVGAttributes } from 'react'

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

export declare const Avatar: ComponentType<AvatarProps & SVGAttributes<SVGSVGElement>>
export declare const AvatarMarble: ComponentType<AvatarBaseProps & SVGAttributes<SVGSVGElement>>
export declare const AvatarBauhaus: ComponentType<AvatarBaseProps & SVGAttributes<SVGSVGElement>>
export declare const AvatarBeam: ComponentType<AvatarBaseProps & SVGAttributes<SVGSVGElement>>
export declare const AvatarPixel: ComponentType<AvatarBaseProps & SVGAttributes<SVGSVGElement>>
export declare const AvatarRing: ComponentType<AvatarBaseProps & SVGAttributes<SVGSVGElement>>
export declare const AvatarSunset: ComponentType<AvatarBaseProps & SVGAttributes<SVGSVGElement>>
