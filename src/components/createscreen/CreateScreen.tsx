import { ScreenForm } from './form/ScreenForm'

export const CreateScreen = () => {
  return (
    <div className='sidebar flex-1 rounded-xl p-2 md:w-96'>
      <div className='p-2'>
        <label className='label'>
          <span className='text-lg'>Add Screen</span>
        </label>
        <ScreenForm />
      </div>
    </div>
  )
}
