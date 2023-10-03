// components/Navbar.tsx

import { CreateScreenForm } from './CreateScreenForm'

export const CreateScreen = () => {
  return (
    <div className='sidebar z-50 flex w-96 flex-col gap-1 rounded-xl p-2'>
      <div className='px-2 pt-2'>
        <label className='text-lg'>Add Screen</label>
        <CreateScreenForm />
      </div>
    </div>
  )
}
