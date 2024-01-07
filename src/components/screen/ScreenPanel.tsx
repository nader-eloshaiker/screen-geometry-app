import { DarkMode } from '@components/Theme/ThemeConstants'
import { useThemeMode } from '@hooks/useThemeMode'
import { ScreenItem } from '@openapi/generated/models'
import { clsx } from 'clsx'
import styled from 'styled-components'

const Panel = styled.div<{ $width: number; $height: number; $color?: string }>`
  width: ${(props) => props.$width}%;
  height: ${(props) => props.$height}%;
  border-color: ${(props) => props.$color};
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
  const vPixelCount = Math.round((screen.spec?.vRes ?? 1) / 100)
  const hPixelCount = Math.round((screen.spec?.hRes ?? 1) / 100)
  const color = themeMode === DarkMode ? `${screen.color.lightColor}18` : `${screen.color.darkColor}18`

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
    >
      {selected && (
        <table className='h-full w-full'>
          <tbody>
            {Array.from({ length: vPixelCount }, (_, i) => (
              <tr key={i}>
                {Array.from({ length: hPixelCount }, (_, j) => (
                  <td key={j} className='p-0.5'>
                    <div
                      className='h-full w-full rounded-full'
                      style={{
                        backgroundColor: color,
                      }}
                    ></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Panel>
  )
}
