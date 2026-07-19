<script lang="ts">
  import { generatePixelData } from 'tronche'

  const DESIGN_SIZE = 80
  const GRID = 8

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

  const data = $derived(generatePixelData(name, colors))
  const cellSize = DESIGN_SIZE / GRID
  const displaySize = $derived(typeof size === 'string' && size.endsWith('%') ? size : Number(size))
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
  <mask id={data.maskId} mask-type="alpha" maskUnits="userSpaceOnUse" x={0} y={0} width={DESIGN_SIZE} height={DESIGN_SIZE}>
    <rect width={DESIGN_SIZE} height={DESIGN_SIZE} rx={square ? undefined : DESIGN_SIZE * 2} fill="#FFFFFF" />
  </mask>
  <g mask="url({data.maskId})">
    {#each data.colors as color, index}
      <rect
        x={(index % GRID) * cellSize}
        y={Math.floor(index / GRID) * cellSize}
        width={cellSize}
        height={cellSize}
        fill={color}
      />
    {/each}
  </g>
</svg>
