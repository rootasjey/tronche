import { useMemo, type ComponentType } from 'react'
import { AvatarMarble } from './AvatarMarble'
import { AvatarBeam } from './AvatarBeam'
import { AvatarBauhaus } from './AvatarBauhaus'
import { AvatarPixel } from './AvatarPixel'
import { AvatarRing } from './AvatarRing'
import { AvatarSunset } from './AvatarSunset'
import type { AvatarMarbleProps } from './AvatarMarble'

type AvatarVariant = 'marble' | 'bauhaus' | 'beam' | 'pixel' | 'ring' | 'sunset'

interface AvatarProps extends AvatarMarbleProps {
  variant?: AvatarVariant
}

const AVATAR_VARIANTS: Record<string, ComponentType<AvatarMarbleProps>> = {
  pixel: AvatarPixel,
  bauhaus: AvatarBauhaus,
  ring: AvatarRing,
  beam: AvatarBeam,
  sunset: AvatarSunset,
  marble: AvatarMarble,
  geometric: AvatarBeam,
  abstract: AvatarBauhaus,
}

export function Avatar({ variant = 'marble', ...props }: AvatarProps) {
  const Component = useMemo(() => AVATAR_VARIANTS[variant] || AvatarMarble, [variant])

  return <Component {...props} />
}
