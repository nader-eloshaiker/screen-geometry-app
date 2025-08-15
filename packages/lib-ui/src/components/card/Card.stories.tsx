import { Label } from '@radix-ui/react-label'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../button'
import { Input } from '../input'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card'

const meta = {
  // tags: ['autodocs'],
  args: {},
  component: Card,
  parameters: {
    layout: 'centered',
  },
  title: 'elements/Card',
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Component: Story = {
  args: {},
  parameters: {},
  render: () => (
    <Card className='w-[400px]'>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
        <CardAction>
          <Button mode='link'>Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className='flex flex-col gap-6'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' type='email' placeholder='m@example.com' required />
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>Password</Label>
                <a href='#' className='ml-auto inline-block text-sm underline-offset-4 hover:underline'>
                  Forgot your password?
                </a>
              </div>
              <Input id='password' type='password' required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className='flex-col gap-2'>
        <Button type='submit' className='w-full'>
          Login
        </Button>
        <Button mode='outline' className='w-full'>
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  ),
}
