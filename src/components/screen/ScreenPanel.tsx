import { DarkMode } from '@components/theme/ThemeConstants'
import { useThemeMode } from '@hooks/useThemeMode'
import { ScreenItem } from '@openapi/generated/models'
import { clsx } from 'clsx'
import { Dispatch, SetStateAction, useEffect } from 'react'
import styled from 'styled-components'

const Panel = styled.div<{ $width: number; $height: number; $color?: string }>`
  width: ${(props) => props.$width}%;
  height: ${(props) => props.$height}%;
  color: ${(props) => props.$color};
  border-color: ${(props) => props.$color};
  text-align: center;
`

// const isEven = (num: number) => num % 2 == 0

type TProps = TRestProps & {
  screen: ScreenItem
  highlighted?: ScreenItem
  setHighLighted?: Dispatch<SetStateAction<ScreenItem | undefined>>
}

export const ScreenPanel = ({ screen, highlighted = undefined, setHighLighted = () => {}, ...rest }: TProps) => {
  const [selected, setSelected] = useState(false)

  const [themeMode] = useThemeMode()
  const width = Math.round(100 * (screen.render?.width ?? 1))
  const height = Math.round(100 * (screen.render?.height ?? 1))
  const vPixelCount = Math.round((screen.spec?.vRes ?? 1) / 100)
  const hPixelCount = Math.round((screen.spec?.hRes ?? 1) / 100)
  const color = themeMode === DarkMode ? `${screen.color.lightColor}18` : `${screen.color.darkColor}18`

  useEffect(() => {
    setSelected(highlighted?.id)
  }, [highlighted, screen.id])

  return (
    <Panel
      className={clsx('m-2 box-border rounded-lg', {
        'border-solid border-4': selected,
        'border-dashed border-2': !selected,
      })}
      $width={width}
      $height={height}
      $color={themeMode === DarkMode ? screen.color.lightColor : screen.color.darkColor}
      onMouseOver={() => setHighLighted(selected ? undefined : screen)}
      onMouseOut={() => setHighLighted(undefined)}
      {...rest}
    >
      {selected && (
        <table className='size-full'>
          <tbody>
            {Array.from({ length: vPixelCount }, (_, i) => (
              <tr key={i}>
                {Array.from({ length: hPixelCount }, (_, j) => (
                  <td key={j} className='p-0.5'>
                    <div
                      className='size-full'
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
