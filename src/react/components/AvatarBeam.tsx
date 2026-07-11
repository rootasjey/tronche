import { useMemo } from 'react'
import { generateBeamData } from 'tronche'

const DESIGN_SIZE = 36

export interface AvatarBeamProps {
  name?: string
  colors?: string[]
  title?: boolean
  square?: boolean
  size?: number | string
}

export function AvatarBeam({
  name = 'Clara Barton',
  colors = ['#E07A5F', '#3D405B', '#81B29A', '#F4D06F', '#D8A47F'],
  title = false,
  square = false,
  size = 36,
  ...attrs
}: AvatarBeamProps & React.SVGAttributes<SVGSVGElement>) {
  const data = useMemo(() => generateBeamData(name, colors), [name, colors])
  const displaySize = Number(size)
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
        <rect width={DESIGN_SIZE} height={DESIGN_SIZE} fill={data.backgroundColor} />
        <rect
          x={0}
          y={0}
          width={DESIGN_SIZE}
          height={DESIGN_SIZE}
          transform={`translate(${data.wrapperTranslateX} ${data.wrapperTranslateY}) rotate(${data.wrapperRotate} ${mid} ${mid}) scale(${data.wrapperScale})`}
          fill={data.wrapperColor}
          rx={data.isCircle ? DESIGN_SIZE : DESIGN_SIZE / 6}
        />
        <g transform={`translate(${data.faceTranslateX} ${data.faceTranslateY}) rotate(${data.faceRotate} ${mid} ${mid})`}>
          {data.isMouthOpen ? (
            <path d={`M15 ${19 + data.mouthSpread}c2 1 4 1 6 0`} stroke={data.faceColor} fill="none" strokeLinecap="round" />
          ) : (
            <path d={`M13,${19 + data.mouthSpread} a1,0.75 0 0,0 10,0`} fill={data.faceColor} />
          )}
          <rect x={14 - data.eyeSpread} y={14} width={1.5} height={2} rx={1} stroke="none" fill={data.faceColor} />
          <rect x={20 + data.eyeSpread} y={14} width={1.5} height={2} rx={1} stroke="none" fill={data.faceColor} />
        </g>
      </g>
    </svg>
  )
}
