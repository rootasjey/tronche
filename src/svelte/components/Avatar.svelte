<script lang="ts">
  import AvatarMarble from './AvatarMarble.svelte'
  import AvatarBeam from './AvatarBeam.svelte'
  import AvatarBauhaus from './AvatarBauhaus.svelte'
  import AvatarPixel from './AvatarPixel.svelte'
  import AvatarRing from './AvatarRing.svelte'
  import AvatarSunset from './AvatarSunset.svelte'

  const AVATAR_VARIANTS: Record<string, any> = {
    marble: AvatarMarble,
    bauhaus: AvatarBauhaus,
    beam: AvatarBeam,
    pixel: AvatarPixel,
    ring: AvatarRing,
    sunset: AvatarSunset,
    geometric: AvatarBeam,
    abstract: AvatarBauhaus,
  }

  let {
    name = 'Clara Barton',
    colors,
    title = false,
    square = false,
    size = 80,
    variant = 'marble',
    ...rest
  }: {
    name?: string
    colors?: string[]
    title?: boolean
    square?: boolean
    size?: number | string
    variant?: string
    [key: string]: unknown
  } = $props()

  const Component = $derived(AVATAR_VARIANTS[variant] ?? AvatarMarble)
</script>

<Component {name} {colors} {title} {square} {size} {...rest} />
