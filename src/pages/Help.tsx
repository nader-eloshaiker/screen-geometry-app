import { useRef } from 'react'
import { ScreenPanel } from '../components/screen/ScreenPanel'
import { ScreenTable } from '../components/screen/ScreenTable'
import { ScreenButton } from '../components/screen/create-edit/CreateButton'
import { Stacked } from '../components/stacked/Stacked'
import { defaultScreenInputList } from '../constants/defaultScreenList'
import { ScreenItem } from '../generated/openapi/models'
import { useElementSize } from '../hooks/useElementSize'
import { Dimensions } from '../models/Screen'
import { getMaxScreenSize, normaliseScreenRender } from '../utils/ScreenCalc'
import { transformScreenInput } from '../utils/ScreenTransformation'

export const Help = () => {
  const divSizeRef = useRef<HTMLDivElement>(null)
  const { width } = useElementSize(divSizeRef)

  const fullList = normaliseScreenRender(defaultScreenInputList.map((item) => transformScreenInput(item)))
  const smallList = fullList.filter((_, index) => index < 2)
  const invisibleList = smallList.map((item, index) => (index !== 1 ? item : { ...item, visible: false }))
  const maxScreenSize = getMaxScreenSize(fullList) // max possible screen size
  const maxPanelSize: Dimensions = { width, height: Math.round(maxScreenSize.height * (width / maxScreenSize.width)) }
  console.log(fullList)

  return (
    <div className='h-full' ref={divSizeRef}>
      <div className='mb-4 text-2xl font-bold'>Getting started</div>
      <p className='mb-4'>
        When you navigate to the screens page for the first time, you will be greated with an empty table and the
        ability to import a default list of screens
      </p>
      <div className='my-6 flex w-full justify-center'>
        <div className='mb-6 w-96  overflow-hidden rounded-lg border-2 shadow-lg'>
          <ScreenTable screens={[]} isScreenListLoading={false} />
          <div className='flex h-full flex-col items-center'>
            <div className='label py-4'>
              <span className='text-xl'>No List Found</span>
            </div>
            <div className='flex flex-col items-center gap-2 py-6'>
              <div>Click here to populate default list</div>
              <button className='btn btn-outline btn-primary w-40' disabled={false}>
                Load Screens
              </button>
            </div>
          </div>
        </div>
      </div>
      <p className='mb-4'>Side Note: You can also create a new screen by clicking the button in the top right corner</p>
      <div className='my-6 flex w-full justify-center'>
        <ScreenButton className='pointer-events-none' />
      </div>
      <p className='mb-4'>Loading the default list will populate the table with a list of screens.</p>
      <div className='my-6 rounded-lg border-2 p-6 shadow-lg'>
        <ScreenTable className='pointer-events-none' screens={fullList} isScreenListLoading={false} />
      </div>
      <p className='mb-4'>
        Once the screens you are interested in are present in your table, you will notice a panel underneath which
        overlays their physically sizes you easy comparison. Moving your mouse over the table will highlight the
        corresponding panel and vice versa.
      </p>
      <div className='my-6 flex flex-col gap-4 rounded-lg border-2 p-6 shadow-lg'>
        <ScreenTable
          className='pointer-events-none'
          screens={smallList}
          isHighlighted={(screen: ScreenItem) => screen.id === smallList[0].id}
        />
        <Stacked height={maxPanelSize.height}>
          {smallList
            .filter((screen) => screen.visible)
            .map((screen) => (
              <ScreenPanel
                key={screen.id}
                screen={screen}
                isHighlighted={(screen: ScreenItem) => screen.id === smallList[0].id}
              />
            ))}
        </Stacked>
      </div>
      <div className='mb-4 text-2xl font-bold'>Hide / Show</div>
      <p className='mb-4'>
        You can choose to exclude a screen from the the `Physical Screen Comparison` by unchecking the `Show` check box
      </p>
      <div className='my-6 flex flex-col gap-4 rounded-lg border-2 p-6 shadow-lg'>
        <ScreenTable className='pointer-events-none' screens={invisibleList} />
        <Stacked height={maxPanelSize.height}>
          {invisibleList
            .filter((screen) => screen.visible)
            .map((screen) => (
              <ScreenPanel key={screen.id} screen={screen} />
            ))}
        </Stacked>
      </div>
      <div className='mb-4 text-2xl font-bold'>Delete</div>
      <div className='mb-4 text-2xl font-bold'>Create</div>
      <div className='mb-4 text-2xl font-bold'>Edit</div>
    </div>
  )
}
