import { DarkMode, TThemeMode } from '@/app/contexts/theme/Theme.types'
import { useTheme } from '@/app/contexts/theme/useTheme'
import { ScreenItemRender } from '@/app/models/screenItemRender'
import { ScreenColor } from '@/lib/openapi/generated'
import { cn } from '@/lib/utils'
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
  screen: ScreenItemRender
  highlighted?: ScreenItemRender
  setHighLighted?: Dispatch<SetStateAction<ScreenItemRender | undefined>>
}

type PanelConfig = {
  width: number
  height: number
  bgColor: string
  vPixelCount: number
  hPixelCount: number
  title: string
}

const getBorderColor = (themeMode: TThemeMode, color: ScreenColor, selected: boolean) => {
  const darkMode = themeMode === DarkMode
  const colorDarkMode = darkMode && selected ? color.lightColor : `${color.lightColor}80`
  const colorLightMode = !darkMode && !selected ? `${color.darkColor}80` : color.darkColor

  return darkMode ? colorDarkMode : colorLightMode
}

export const ScreenPanel = ({ screen, highlighted = undefined, setHighLighted = () => {}, ...rest }: TProps) => {
  const [selected, setSelected] = useState(false)
  const [config, setConfig] = useState<PanelConfig>({
    width: 0,
    height: 0,
    bgColor: '',
    vPixelCount: 0,
    hPixelCount: 0,
    title: '',
  })
  const [themeMode] = useTheme()

  useEffect(() => {
    setSelected(screen.id === highlighted?.id)
  }, [highlighted, screen.id])

  useEffect(() => {
    setConfig({
      width: Math.round(100 * (screen.render?.width ?? 1)),
      height: Math.round(100 * (screen.render?.height ?? 1)),
      bgColor: themeMode === DarkMode ? `${screen.color.lightColor}45` : `${screen.color.darkColor}45`,
      vPixelCount: Math.round((screen.data.vRes ?? 1) / 100),
      hPixelCount: Math.round((screen.data.hRes ?? 1) / 100),
      title: `${screen.data.diagonalSize.toString()}" ${screen.data.aspectRatio} ${screen.data.hRes} x ${screen.data.vRes}`,
    })
  }, [screen, selected, themeMode])

  return (
    <Panel
      className={cn('rounded-md transition-[outline-width] duration-300 ease-out outline relative ', {
        'outline-[6px]': selected,
        'outline-[4px]': !selected,
        'opacity-65': !selected && highlighted,
      })}
      $width={config.width}
      $height={config.height}
      $color={getBorderColor(themeMode, screen.color, selected)}
      // $color={themeMode === DarkMode ? screen.color.lightColor : screen.color.darkColor}
      // onClick={() => setHighLighted(screen.id === highlighted?.id ? undefined : screen)}
      onMouseEnter={() => setHighLighted(selected ? undefined : screen)}
      onMouseLeave={() => setHighLighted(undefined)}
      {...rest}
    >
      {selected && (
        <div
          className='absolute top-[-24px] text-xs font-bold sm:top-[-30px] sm:text-base'
          style={{ color: themeMode === DarkMode ? screen.color.lightColor : screen.color.darkColor }}
        >
          {config.title}
        </div>
      )}
      {selected && (
        <table className='size-full border-separate border-spacing-px p-px md:border-spacing-[2px] md:p-px lg:border-spacing-[4px] lg:p-[2px]'>
          <tbody>
            {Array.from({ length: config.vPixelCount }, (_, v) => (
              <tr key={v}>
                {Array.from({ length: config.hPixelCount }, (_, h) => (
                  <td key={`h-${h}-v-${v}`} style={{ backgroundColor: config.bgColor, borderRadius: '20%' }}></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Panel>
  )
}
