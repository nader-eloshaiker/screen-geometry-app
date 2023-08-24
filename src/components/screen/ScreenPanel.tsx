import cn from 'classnames'
import styled from 'styled-components'
import { ScreenColor, ScreenItem } from '../../generated/openapi/models'
import { createCSSColor } from '../../utils/ScreenCalc'

const Panel = styled.div<{ $width: number; $height: number; $color?: ScreenColor; $index: number }>`
  width: ${(props) => props.$width}%;
  height: ${(props) => props.$height}%;
  border-color: ${(props) => createCSSColor(props.$color)};
  color: ${(props) => createCSSColor(props.$color)};
  text-align: center;
  z-index: ${(props) => props.$index};
`

type TProps = TRestProps & { screen: ScreenItem; index: number; selected: boolean }

export const ScreenPanel = ({ screen, index, selected, ...rest }: TProps) => {
  const width = Math.round(100 * (screen.render?.width || 1))
  const height = Math.round(100 * (screen.render?.height || 1))

  return (
    <Panel
      className={cn({ 'border-4': selected, 'border-2 border-dotted': !selected }) + ' rounded-lg'}
      $width={width}
      $height={height}
      $color={screen.render?.color}
      $index={index}
      {...rest}
    />
  )
}
