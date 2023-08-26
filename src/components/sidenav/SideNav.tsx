// components/Navbar.tsx

import CreateScreenForm from '../createscreen/CreateScreenForm'

export default function SideNav() {
  return (
    <div className='sidebar z-50 flex w-72 flex-col gap-1 rounded-xl p-2 lg:h-full'>
      <div className='px-2 pt-2'>
        <label className='text-lg'>Add Screen</label>
        <CreateScreenForm />
      </div>
    </div>
  )
}
