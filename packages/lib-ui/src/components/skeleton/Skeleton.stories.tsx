import { StateTable } from '@/storybook/StateTable'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from './Skeleton'
import type { TSkeletonDimension, TSkeletonMode } from './SkeletonVariants'

const meta = {
  component: Skeleton,
  // tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  title: 'elements/Skeleton',
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof Skeleton>

export const Mode: Story = {
  render: () => (
    <StateTable<TSkeletonMode>
      getComponent={(prop) => <Skeleton className='h-16 w-36' mode={prop} />}
      caption='Modes'
      defaultProps='empty'
      props={['empty', 'image']}
    />
  ),
}

export const Dimension: Story = {
  render: () => (
    <StateTable<TSkeletonDimension>
      getComponent={(prop) => <Skeleton className='size-16' dimension={prop} />}
      caption='Dimensions'
      defaultProps='rectangle'
      props={['rectangle', 'circle']}
    />
  ),
}
