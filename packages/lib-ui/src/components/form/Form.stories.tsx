import { yupResolver } from '@hookform/resolvers/yup'
import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { ObjectSchema } from 'yup'
import { Button } from '../button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../form'
import { Input } from '../input'

const meta = {
  title: 'Elements/Form',
  component: Form,
  // tags: ['autodocs'],
  argTypes: {},
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj<typeof Form>

const formSchema: ObjectSchema<{ username: string }> = yup.object().shape(
  {
    username: yup
      .string()
      .min(2, 'Username must be at least 2 characters')
      .max(50, 'Username must be at most 50 characters')
      .required('User name is required'),
  }
  //[[ScreenDataEnum.hRes, ScreenDataEnum.vRes]],
)

const ProfileForm = () => {
  // 1. Define your form.
  const form = useForm<yup.InferType<typeof formSchema>>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      username: '',
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: yup.InferType<typeof formSchema>) {
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
