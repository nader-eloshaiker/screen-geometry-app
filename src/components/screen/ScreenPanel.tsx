import styled from 'styled-components'
import { IDimension, IScreen, IScreenColor } from '../../models/Screen'

const Panel = styled.div<{ $width: number; $height: number; $color: string }>`
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  border-color: ${(props) => props.$color};
  color: ${(props) => props.$color};
  text-align: center;
`

const createCSSColor = (color?: IScreenColor) => (color ? `rgb(${color.r}, ${color.g}, ${color.b})` : 'white')

type TProps = { screen: IScreen; size: IDimension }

export const ScreenPanel = ({ screen, size }: TProps) => {
  const width = size.width * (screen.render?.width || 1)
  const height = size.height * (screen.render?.height || 1)

  return (
    <Panel
      className='border-2 rounded-lg hover:border-4'
      $width={width}
      $height={height}
      $color={createCSSColor(screen.render?.color)}
    >
      <span>
        {Math.round((screen.data.hSize + Number.EPSILON) * 100) / 100}&quot;x
        {Math.round((screen.data.vSize + +Number.EPSILON) * 100) / 100}&quot; - {screen.tag.diagonalSize}&quot;{' '}
        {screen.tag.aspectRatio}
      </span>
    </Panel>
  )
}
