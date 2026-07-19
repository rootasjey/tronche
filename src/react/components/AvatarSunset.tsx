import { useMemo } from 'react'
import { generateSunsetData } from 'tronche'

const DESIGN_SIZE = 80

export interface AvatarSunsetProps {
  name?: string
  colors?: string[]
  title?: boolean
  square?: boolean
  size?: number | string
}

export function AvatarSunset({
  name = 'Clara Barton',
  colors = ['#E07A5F', '#3D405B', '#81B29A', '#F4D06F', '#D8A47F'],
  title = false,
  square = false,
  size = 80,
  ...attrs
}: AvatarSunsetProps & React.SVGAttributes<SVGSVGElement>) {
  const data = useMemo(() => generateSunsetData(name, colors), [name, colors])
  const displaySize = typeof size === 'string' && size.endsWith('%') ? size : Number(size)
  const mid = DESIGN_SIZE / 2

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
      <mask id={data.maskId} maskUnits="userSpaceOnUse" x={0} y={0} width={DESIGN_SIZE} height={DESIGN_SIZE}>
        <rect width={DESIGN_SIZE} height={DESIGN_SIZE} rx={square ? undefined : DESIGN_SIZE * 2} fill="#FFFFFF" />
      </mask>
      <g mask={`url(#${data.maskId})`}>
        <path fill={`url(#gradient0_${data.nameWithoutSpace})`} d={`M0 0h${DESIGN_SIZE}v${mid}H0z`} />
        <path fill={`url(#gradient1_${data.nameWithoutSpace})`} d={`M0 ${mid}h${DESIGN_SIZE}v${mid}H0z`} />
      </g>
      <defs>
        <linearGradient id={`gradient0_${data.nameWithoutSpace}`} x1={mid} y1={0} x2={mid} y2={mid} gradientUnits="userSpaceOnUse">
          <stop stopColor={data.colors[0]} />
          <stop offset="1" stopColor={data.colors[1]} />
        </linearGradient>
        <linearGradient id={`gradient1_${data.nameWithoutSpace}`} x1={mid} y1={mid} x2={mid} y2={DESIGN_SIZE} gradientUnits="userSpaceOnUse">
          <stop stopColor={data.colors[2]} />
          <stop offset="1" stopColor={data.colors[3]} />
        </linearGradient>
      </defs>
    </svg>
  )
}
