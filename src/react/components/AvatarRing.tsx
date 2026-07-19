import { useMemo } from 'react'
import { generateRingData } from 'tronche'

const DESIGN_SIZE = 90

export interface AvatarRingProps {
  name?: string
  colors?: string[]
  title?: boolean
  square?: boolean
  size?: number | string
}

export function AvatarRing({
  name = 'Clara Barton',
  colors = ['#E07A5F', '#3D405B', '#81B29A', '#F4D06F', '#D8A47F'],
  title = false,
  square = false,
  size = 90,
  ...attrs
}: AvatarRingProps & React.SVGAttributes<SVGSVGElement>) {
  const data = useMemo(() => generateRingData(name, colors), [name, colors])
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
        <path d={`M0 0h${DESIGN_SIZE}v${mid}H0z`} fill={data.colors[0]} />
        <path d={`M0 ${mid}h${DESIGN_SIZE}v${mid}H0z`} fill={data.colors[1]} />
        <path d={`M${DESIGN_SIZE - 7} ${mid}a${mid - 7} ${mid - 7} 0 00-${DESIGN_SIZE - 14} 0h${DESIGN_SIZE - 14}z`} fill={data.colors[2]} />
        <path d={`M${DESIGN_SIZE - 7} ${mid}a${mid - 7} ${mid - 7} 0 01-${DESIGN_SIZE - 14} 0h${DESIGN_SIZE - 14}z`} fill={data.colors[3]} />
        <path d={`M${DESIGN_SIZE - 13} ${mid}a${mid - 13} ${mid - 13} 0 10-${DESIGN_SIZE - 26} 0h${DESIGN_SIZE - 26}z`} fill={data.colors[4]} />
        <path d={`M${DESIGN_SIZE - 13} ${mid}a${mid - 13} ${mid - 13} 0 11-${DESIGN_SIZE - 26} 0h${DESIGN_SIZE - 26}z`} fill={data.colors[5]} />
        <path d={`M${DESIGN_SIZE - 19} ${mid}a${mid - 19} ${mid - 19} 0 00-${DESIGN_SIZE - 38} 0h${DESIGN_SIZE - 38}z`} fill={data.colors[6]} />
        <path d={`M${DESIGN_SIZE - 19} ${mid}a${mid - 19} ${mid - 19} 0 01-${DESIGN_SIZE - 38} 0h${DESIGN_SIZE - 38}z`} fill={data.colors[7]} />
        <circle cx={mid} cy={mid} r={mid - 22} fill={data.colors[8]} />
      </g>
    </svg>
  )
}
