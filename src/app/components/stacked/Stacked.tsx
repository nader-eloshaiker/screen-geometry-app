import styled from 'styled-components'

export const Stacked = styled.div<{ height: number }>`
  padding: 0.5rem;
  display: inline-grid;
  place-items: start;
  align-items: flex-end;
  width: 100%;
  height: ${({ height }) => height}px;
  * {
    grid-column-start: 1;
    grid-row-start: 1;
  }
`
