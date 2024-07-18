import styled from 'styled-components'
import { Alignment, HAlignDefault } from '../screen/AlignmentSelector'

export const Stacked = styled.div<{ height: number; $hAlign?: Alignment; $vAlign?: Alignment }>`
  padding: 0.5rem;
  display: inline-grid;
  justify-items: ${({ $hAlign }) => $hAlign ?? HAlignDefault};
  align-items: ${({ $vAlign }) => {
    switch ($vAlign) {
      case 'start':
        return 'flex-start'
      case 'end':
        return 'flex-end'
      case 'center':
        return 'center'
      default:
        return 'flex-end'
    }
  }};

  width: 100%;
  height: ${({ height }) => height}px;
  * {
    grid-column-start: 1;
    grid-row-start: 1;
  }
`
