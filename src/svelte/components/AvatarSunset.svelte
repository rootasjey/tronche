<script lang="ts">
  import { generateSunsetData } from 'tronche'

  const DESIGN_SIZE = 80

  let {
    name = 'Clara Barton',
    colors = ['#E07A5F', '#3D405B', '#81B29A', '#F4D06F', '#D8A47F'],
    title = false,
    square = false,
    size = 80,
    ...rest
  }: {
    name?: string
    colors?: string[]
    title?: boolean
    square?: boolean
    size?: number | string
    [key: string]: unknown
  } = $props()

  const data = $derived(generateSunsetData(name, colors))
  const mid = DESIGN_SIZE / 2
  const displaySize = $derived(typeof size === 'string' && size.endsWith('%') ? size : Number(size))
  const id = $derived(data.nameWithoutSpace)
  const defsMarkup = $derived(`<linearGradient id="gradient0_${id}" x1="${mid}" y1="0" x2="${mid}" y2="${mid}" gradientUnits="userSpaceOnUse"><stop stop-color="${data.colors[0]}"/><stop offset="1" stop-color="${data.colors[1]}"/></linearGradient><linearGradient id="gradient1_${id}" x1="${mid}" y1="${mid}" x2="${mid}" y2="${DESIGN_SIZE}" gradientUnits="userSpaceOnUse"><stop stop-color="${data.colors[2]}"/><stop offset="1" stop-color="${data.colors[3]}"/></linearGradient>`)
</script>

<svg
  viewBox="0 0 {DESIGN_SIZE} {DESIGN_SIZE}"
  fill="none"
  role="img"
  xmlns="http://www.w3.org/2000/svg"
  width={displaySize}
  height={displaySize}
  {...rest}
>
  {#if title}
    <title>{name}</title>
  {/if}
  <mask id={data.maskId} maskUnits="userSpaceOnUse" x={0} y={0} width={DESIGN_SIZE} height={DESIGN_SIZE}>
    <rect width={DESIGN_SIZE} height={DESIGN_SIZE} rx={square ? undefined : DESIGN_SIZE * 2} fill="#FFFFFF" />
  </mask>
  <g mask="url({data.maskId})">
    <path d="M0 0h{DESIGN_SIZE}v{mid}H0z" fill="url(#gradient0_{data.nameWithoutSpace})" />
    <path d="M0 {mid}h{DESIGN_SIZE}v{mid}H0z" fill="url(#gradient1_{data.nameWithoutSpace})" />
  </g>
  <defs innerHTML={defsMarkup} />
</svg>
