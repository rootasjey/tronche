import type { Component, JSX } from 'solid-js'

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

export declare const Avatar: Component<AvatarProps & JSX.SvgSVGAttributes<SVGSVGElement>>
export declare const AvatarMarble: Component<AvatarBaseProps & JSX.SvgSVGAttributes<SVGSVGElement>>
export declare const AvatarBauhaus: Component<AvatarBaseProps & JSX.SvgSVGAttributes<SVGSVGElement>>
export declare const AvatarBeam: Component<AvatarBaseProps & JSX.SvgSVGAttributes<SVGSVGElement>>
export declare const AvatarPixel: Component<AvatarBaseProps & JSX.SvgSVGAttributes<SVGSVGElement>>
export declare const AvatarRing: Component<AvatarBaseProps & JSX.SvgSVGAttributes<SVGSVGElement>>
export declare const AvatarSunset: Component<AvatarBaseProps & JSX.SvgSVGAttributes<SVGSVGElement>>
