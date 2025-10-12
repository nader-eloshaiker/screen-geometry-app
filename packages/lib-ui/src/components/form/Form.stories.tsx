import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '.'
import { Button } from '../button'
import { Input } from '../input'

const meta = {
  // tags: ['autodocs'],
  argTypes: {},
  component: Form,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  title: 'Elements/Form',
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj<typeof Form>

const formSchema = z.object(
  {
    username: z
      .string()
      .min(2, 'Username must be at least 2 characters')
      .max(50, 'Username must be at most 50 characters'),
  }
  //[[ScreenDataEnum.hRes, ScreenDataEnum.vRes]],
)

const ProfileForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      username: '',
    },
    resolver: zodResolver(formSchema),
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField<{ username: string }>
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  className='w-[226px]'
                  palette={form.formState.errors.username ? 'danger' : undefined}
                  placeholder='shadcn'
                  {...field}
                />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-between'>
          <Button type='submit'>Submit</Button>
          <Button type='button' mode='outline' onClick={() => form.reset()}>
            Reset
          </Button>
        </div>
      </form>
    </Form>
  )
}

export const Component: Story = {
  args: {},
  parameters: {},
  render: () => {
    return <ProfileForm />
  },
}
