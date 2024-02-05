import { DarkMode } from '@components/theme/ThemeConstants'
import { useThemeMode } from '@hooks/useThemeMode'
import { ScreenItem } from '@openapi/generated/models'
import { clsx } from 'clsx'
import styled from 'styled-components'

const Panel = styled.div<{ $width: number; $height: number; $color?: string }>`
  width: ${(props) => props.$width}%;
  height: ${(props) => props.$height}%;
  color: ${(props) => props.$color};
  text-align: center;
`

// const isEven = (num: number) => num % 2 == 0

type TProps = TRestProps & {
  screen: ScreenItem
  isHighlighted?: (screen: ScreenItem) => boolean
  setHighLighted?: (screen: ScreenItem | undefined) => void
  onHighlightClick?: (screen: ScreenItem) => void
}

export const ScreenPanel = ({
  screen,
  isHighlighted = () => false,
  setHighLighted = () => {},
  onHighlightClick = () => {},
  ...rest
}: TProps) => {
  const [themeMode] = useThemeMode()
  const width = Math.round(100 * (screen.render?.width ?? 1))
  const height = Math.round(100 * (screen.render?.height ?? 1))
  const selected = isHighlighted(screen)

  return (
    <Panel
      className={clsx('rounded-lg', { 'outline outline-4': selected, 'outline-dashed outline-2': !selected })}
      $width={width}
      $height={height}
      $color={themeMode === DarkMode ? screen.color.lightColor : screen.color.darkColor}
      onMouseEnter={() => setHighLighted(screen)}
      onMouseLeave={() => setHighLighted(undefined)}
      onClick={() => onHighlightClick(screen)}
      {...rest}
    />
  )
}
