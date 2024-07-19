import { DarkMode } from '@app/components/theme/ThemeManager'
import { useThemeModeContext } from '@app/contexts/theme/useThemeModeContext'
import { ScreenItem } from '@packages/openapi/generated'
import { clsx } from 'clsx'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import styled from 'styled-components'

const Panel = styled.div<{ $width: number; $height: number; $color?: string }>`
  width: ${(props) => props.$width}%;
  height: ${(props) => props.$height}%;
  color: ${(props) => props.$color};
  outline-color: ${(props) => props.$color};
`

// const isEven = (num: number) => num % 2 == 0

type TProps = TRestProps & {
  screen: ScreenItem
  highlighted?: ScreenItem
  setHighLighted?: Dispatch<SetStateAction<ScreenItem | undefined>>
}

type PanelConfig = {
  width: number
  height: number
  color: string
  vPixelCount: number
  hPixelCount: number
}

export const ScreenPanel = ({ screen, highlighted = undefined, setHighLighted = () => {}, ...rest }: TProps) => {
  const [selected, setSelected] = useState(false)
  const [config, setConfig] = useState<PanelConfig>({
    width: 0,
    height: 0,
    color: '',
    vPixelCount: 0,
    hPixelCount: 0,
  })
  const [themeMode] = useThemeModeContext()

  useEffect(() => {
    setSelected(screen.id === highlighted?.id)
  }, [highlighted, screen.id])

  useEffect(() => {
    setConfig({
      width: Math.round(100 * (screen.render?.width ?? 1)),
      height: Math.round(100 * (screen.render?.height ?? 1)),
      color: themeMode === DarkMode ? `${screen.color.lightColor}35` : `${screen.color.darkColor}35`,
      vPixelCount: Math.round((screen.spec?.vRes ?? 1) / 100),
      hPixelCount: Math.round((screen.spec?.hRes ?? 1) / 100),
    })
  }, [screen, themeMode])

  return (
    <Panel
      className={clsx('rounded-md transition-[outline-width] duration-300 ease-out', {
        'outline outline-4 sm:outline-8': selected,
        'outline outline-2': !selected,
      })}
      $width={config.width}
      $height={config.height}
      $color={themeMode === DarkMode ? screen.color.lightColor : screen.color.darkColor}
      // onClick={() => setHighLighted(screen.id === highlighted?.id ? undefined : screen)}
      onMouseEnter={() => setHighLighted(selected ? undefined : screen)}
      onMouseLeave={() => setHighLighted(undefined)}
      {...rest}
    >
      {selected && (
        <table className='size-full border-separate border-spacing-px md:border-spacing-0.5 lg:border-spacing-[0.28rem]'>
          <tbody>
            {Array.from({ length: config.vPixelCount }, (_, i) => (
              <tr key={i}>
                {Array.from({ length: config.hPixelCount }, (_, j) => (
                  <td
                    key={j}
                    style={{
                      backgroundColor: config.color,
                      borderRadius: '50%',
                    }}
                    className='transition-all duration-300 ease-out'
                  ></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Panel>
  )
}
