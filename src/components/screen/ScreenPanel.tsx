import styled from 'styled-components'
import { IScreen, IScreenColor } from '../../models/Screen'
import { createCSSColor } from '../../utils/ScreenCalc'

const Panel = styled.div<{ $width: number; $height: number; $color?: IScreenColor; $index: number }>`
  width: ${(props) => props.$width}%;
  height: ${(props) => props.$height}%;
  border-color: ${(props) => createCSSColor(props.$color)};
  color: ${(props) => createCSSColor(props.$color)};
  text-align: center;
  z-index: ${(props) => props.$index};
`

type TProps = { screen: IScreen; index: number; selected: boolean }

export const ScreenPanel = ({ screen, index, selected }: TProps) => {
  const width = Math.round(100 * (screen.render?.width || 1))
  const height = Math.round(100 * (screen.render?.height || 1))

  return (
    <Panel
      className={`border-2 rounded-lg ${selected && 'border-4'}`}
      $width={width}
      $height={height}
      $color={screen.render?.color}
      $index={index}
    />
  )
}
