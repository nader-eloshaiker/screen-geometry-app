import { CreateScreenForm } from './CreateScreenForm'

export const CreateScreen = () => {
  return (
    <div className='sidebar z-50 flex w-full flex-col gap-1 rounded-xl p-2 md:w-96'>
      <div className='p-2'>
        <label className='label'>
          <span className='text-lg'>Add Screen</span>
        </label>
        <CreateScreenForm />
      </div>
    </div>
  )
}
