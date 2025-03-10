import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../button/Button'
import { Input } from '../input/Input'
import { Label } from '../label/Label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card'

const meta = {
  title: 'elements/Card',
  component: Card,
  // tags: ['autodocs'],
  args: {},
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Component: Story = {
  args: {},
  render: () => (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='name'>Name</Label>
              <Input id='name' placeholder='Name of your project' />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='framework'>Framework</Label>
              <Input id='framework' placeholder='Name of your framework' />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button mode='outline'>Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {},
}
