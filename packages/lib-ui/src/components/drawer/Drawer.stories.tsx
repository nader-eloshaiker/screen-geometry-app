import { Button } from '@/components/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/drawer'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

const meta = {
  title: 'Elements/Drawer',
  component: Drawer,
  // tags: ['autodocs'],
  argTypes: {},
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

const DemoComporent = () => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button mode='outline'>Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>Make changes to your profile here. Click save when you&lsquo;re done.</DrawerDescription>
        </DrawerHeader>
        <form className='grid items-start gap-4 px-4'>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input type='email' id='email' defaultValue='shadcn@example.com' />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='username'>Username</Label>
            <Input id='username' defaultValue='@shadcn' />
          </div>
          <Button type='submit'>Save changes</Button>
        </form>
        <DrawerFooter className='pt-2'>
          <DrawerClose asChild>
            <Button mode='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export const Component: Story = {
  args: {},
  parameters: {},
  render: () => {
    return <DemoComporent />
  },
}
