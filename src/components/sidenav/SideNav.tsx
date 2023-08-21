// components/Navbar.tsx

import CreateScreenForm from '../createscreen/CreateScreenForm'

export default function SideNav() {
  return (
    <div className='z-50 flex flex-col gap-1 p-2 lg:h-full rounded-xl sidebar w-72'>
      <div className='px-2 pt-2'>
        <label className='text-lg'>Add Screen</label>
        <CreateScreenForm />
      </div>
    </div>
  )
}
