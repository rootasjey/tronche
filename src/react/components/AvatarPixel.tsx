import { useMemo } from 'react'
import { generatePixelData } from 'tronche'

const DESIGN_SIZE = 80
const GRID = 8

export interface AvatarPixelProps {
  name?: string
  colors?: string[]
  title?: boolean
  square?: boolean
  size?: number | string
}

export function AvatarPixel({
  name = 'Clara Barton',
  colors = ['#E07A5F', '#3D405B', '#81B29A', '#F4D06F', '#D8A47F'],
  title = false,
  square = false,
  size = 80,
  ...attrs
}: AvatarPixelProps & React.SVGAttributes<SVGSVGElement>) {
  const data = useMemo(() => generatePixelData(name, colors), [name, colors])
  const displaySize = typeof size === 'string' && size.endsWith('%') ? size : Number(size)
  const cellSize = DESIGN_SIZE / GRID

  return (
    <svg
      viewBox={`0 0 ${DESIGN_SIZE} ${DESIGN_SIZE}`}
      fill="none"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width={displaySize}
      height={displaySize}
      {...attrs}
    >
      {title && <title>{name}</title>}
      <mask id={data.maskId} mask-type="alpha" maskUnits="userSpaceOnUse" x={0} y={0} width={DESIGN_SIZE} height={DESIGN_SIZE}>
        <rect width={DESIGN_SIZE} height={DESIGN_SIZE} rx={square ? undefined : DESIGN_SIZE * 2} fill="#FFFFFF" />
      </mask>
      <g mask={`url(#${data.maskId})`}>
        {data.colors.map((color, index) => (
          <rect
            key={index}
            x={(index % GRID) * cellSize}
            y={Math.floor(index / GRID) * cellSize}
            width={cellSize}
            height={cellSize}
            fill={color}
          />
        ))}
      </g>
    </svg>
  )
}
