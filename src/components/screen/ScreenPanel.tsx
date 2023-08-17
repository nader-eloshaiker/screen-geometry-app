import styled from 'styled-components'
import { IScreen, IScreenColor } from '../../models/Screen'

const Panel = styled.div<{ $width: number; $height: number; $color: string; $index: number; $maxIndex: number }>`
  width: ${(props) => props.$width}%;
  height: ${(props) => props.$height}%;
  border-color: ${(props) => props.$color};
  color: ${(props) => props.$color};
  text-align: center;
  z-index: ${(props) => props.$index};
  &:hover {
    z-index: ${(props) => props.$maxIndex};
  }
`

const createCSSColor = (color?: IScreenColor) => (color ? `rgb(${color.r}, ${color.g}, ${color.b})` : 'white')

type TProps = { screen: IScreen; index: number; maxIndex: number }

export const ScreenPanel = ({ screen, index, maxIndex }: TProps) => {
  const width = Math.round(100 * (screen.render?.width || 1))
  const height = Math.round(100 * (screen.render?.height || 1))

  return (
    <Panel
      className={'border-2 rounded-lg hover:border-4'}
      $width={width}
      $height={height}
      $color={createCSSColor(screen.render?.color)}
      $index={index}
      $maxIndex={maxIndex}
    >
      <span>
        {screen.tag.diagonalSize}&quot; {screen.tag.aspectRatio}
      </span>
    </Panel>
  )
}
