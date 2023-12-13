import { DarkMode } from '@components/theme/ThemeConstants'
import { useThemeMode } from '@hooks/useThemeMode'
import { ScreenItem } from '@openapi/models'
import { clsx } from 'clsx'
import styled from 'styled-components'

const Panel = styled.div<{ $width: number; $height: number; $color?: string }>`
  width: ${(props) => props.$width}%;
  height: ${(props) => props.$height}%;
  border-color: ${(props) => props.$color};
  color: ${(props) => props.$color};
  text-align: center;
`

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
      className={clsx('rounded-lg', { 'border-4': selected, 'border-2 border-dashed': !selected })}
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
