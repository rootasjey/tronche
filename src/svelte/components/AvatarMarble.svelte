<script lang="ts">
  import { generateMarbleData } from 'tronche'

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

  const data = $derived(generateMarbleData(name, colors))
  const mid = DESIGN_SIZE / 2
  const filterId = $derived(`${data.maskId}Filter`)
  const displaySize = $derived(typeof size === 'string' && size.endsWith('%') ? size : Number(size))
  const filterMarkup = $derived(`<filter id="${filterId}" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="7" result="effect1_foregroundBlur"/></filter>`)
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
    <rect width={DESIGN_SIZE} height={DESIGN_SIZE} fill={data.elements[0].color} />
    <path
      d="M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z"
      fill={data.elements[1].color}
      filter="url({filterId})"
      transform="translate({data.elements[1].translateX} {data.elements[1].translateY}) rotate({data.elements[1].rotate} {mid} {mid}) scale({data.elements[2].scale})"
    />
    <path
      style="mix-blend-mode: overlay"
      d="M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z"
      fill={data.elements[2].color}
      filter="url({filterId})"
      transform="translate({data.elements[2].translateX} {data.elements[2].translateY}) rotate({data.elements[2].rotate} {mid} {mid}) scale({data.elements[2].scale})"
    />
  </g>
  <defs innerHTML={filterMarkup} />
</svg>
