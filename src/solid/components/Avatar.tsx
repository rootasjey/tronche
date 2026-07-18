import { splitProps } from 'solid-js'
import { AvatarMarble } from './AvatarMarble'
import { AvatarBeam } from './AvatarBeam'
import { AvatarBauhaus } from './AvatarBauhaus'
import { AvatarPixel } from './AvatarPixel'
import { AvatarRing } from './AvatarRing'
import { AvatarSunset } from './AvatarSunset'
import type { AvatarMarbleProps } from './AvatarMarble'
import type { JSX } from 'solid-js/jsx-runtime'

type AvatarVariant = 'marble' | 'bauhaus' | 'beam' | 'pixel' | 'ring' | 'sunset'

interface AvatarProps extends AvatarMarbleProps {
  variant?: AvatarVariant
}

const AVATAR_VARIANTS: Record<string, (props: AvatarMarbleProps & JSX.SvgSVGAttributes<SVGSVGElement>) => JSX.Element> = {
  pixel: AvatarPixel,
  bauhaus: AvatarBauhaus,
  ring: AvatarRing,
  beam: AvatarBeam,
  sunset: AvatarSunset,
  marble: AvatarMarble,
  geometric: AvatarBeam,
  abstract: AvatarBauhaus,
}

export function Avatar(allProps: AvatarProps & JSX.SvgSVGAttributes<SVGSVGElement>) {
  const [props, attrs] = splitProps(allProps, ['name', 'colors', 'title', 'square', 'size', 'variant'])
  const Component = AVATAR_VARIANTS[props.variant ?? 'marble'] || AvatarMarble

  return <Component {...attrs} name={props.name} colors={props.colors} title={props.title} square={props.square} size={props.size} />
}
