import { motion, SVGMotionProps, Transition } from 'framer-motion'

type Props = SVGMotionProps<SVGSVGElement> & {
  isOpen?: boolean
  color?: string
  strokeWidth?: string | number
  transition?: Transition
  lineProps?: unknown
}

export const HamburgerMenu = ({
  isOpen = false,
  width = 20,
  height = 12,
  strokeWidth = 2,
  color = 'currentColor',
  transition,
  lineProps,
  ...props
}: Props) => {
  const variant = isOpen ? 'opened' : 'closed'
  const top = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: 45,
      translateY: 2,
    },
  }
  const center = {
    closed: {
      opacity: 1,
    },
    opened: {
      opacity: 0,
    },
  }
  const bottom = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: -45,
      translateY: -2,
    },
  }
  lineProps = {
    stroke: color,
    strokeWidth: strokeWidth as number,
    vectorEffect: 'non-scaling-stroke',
    initial: 'closed',
    animate: variant,
    transition,
    ...(lineProps ?? {}),
  }
  const unitHeight = 4
  const unitWidth = (unitHeight * (width as number)) / (height as number)

  return (
    <motion.svg
      viewBox={`0 0 ${unitWidth} ${unitHeight}`}
      overflow='visible'
      preserveAspectRatio='none'
      width={width}
      height={height}
      style={{ originX: '50%', originY: '50%' }}
      {...props}
    >
      <motion.line
        style={{ originX: '50%', originY: '0%' }}
        x1='0'
        x2={unitWidth}
        y1='0'
        y2='0'
        variants={top}
        {...(lineProps ?? {})}
      />
      <motion.line
        style={{ originX: '50%', originY: '50%' }}
        x1='0'
        x2={unitWidth}
        y1='2'
        y2='2'
        variants={center}
        {...(lineProps ?? {})}
      />
      <motion.line
        style={{ originX: '50%', originY: '100%' }}
        x1='0'
        x2={unitWidth}
        y1='4'
        y2='4'
        variants={bottom}
        {...(lineProps ?? {})}
      />
    </motion.svg>
  )
}
