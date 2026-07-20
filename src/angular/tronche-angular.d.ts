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

export declare class TroncheAvatar {
  variant: import('@angular/core').InputSignal<AvatarProps['variant']>
  name: import('@angular/core').InputSignal<string>
  colors: import('@angular/core').InputSignal<string[]>
  title: import('@angular/core').InputSignal<boolean>
  square: import('@angular/core').InputSignal<boolean>
  size: import('@angular/core').InputSignal<number | string>
}

export declare class TroncheMarble {
  name: import('@angular/core').InputSignal<string>
  colors: import('@angular/core').InputSignal<string[]>
  title: import('@angular/core').InputSignal<boolean>
  square: import('@angular/core').InputSignal<boolean>
  size: import('@angular/core').InputSignal<number | string>
}

export declare class TroncheBeam {
  name: import('@angular/core').InputSignal<string>
  colors: import('@angular/core').InputSignal<string[]>
  title: import('@angular/core').InputSignal<boolean>
  square: import('@angular/core').InputSignal<boolean>
  size: import('@angular/core').InputSignal<number | string>
}

export declare class TroncheBauhaus {
  name: import('@angular/core').InputSignal<string>
  colors: import('@angular/core').InputSignal<string[]>
  title: import('@angular/core').InputSignal<boolean>
  square: import('@angular/core').InputSignal<boolean>
  size: import('@angular/core').InputSignal<number | string>
}

export declare class TronchePixel {
  name: import('@angular/core').InputSignal<string>
  colors: import('@angular/core').InputSignal<string[]>
  title: import('@angular/core').InputSignal<boolean>
  square: import('@angular/core').InputSignal<boolean>
  size: import('@angular/core').InputSignal<number | string>
}

export declare class TroncheRing {
  name: import('@angular/core').InputSignal<string>
  colors: import('@angular/core').InputSignal<string[]>
  title: import('@angular/core').InputSignal<boolean>
  square: import('@angular/core').InputSignal<boolean>
  size: import('@angular/core').InputSignal<number | string>
}

export declare class TroncheSunset {
  name: import('@angular/core').InputSignal<string>
  colors: import('@angular/core').InputSignal<string[]>
  title: import('@angular/core').InputSignal<boolean>
  square: import('@angular/core').InputSignal<boolean>
  size: import('@angular/core').InputSignal<number | string>
}
