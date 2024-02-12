import CloseIcon from '@assets/icons/Close'
import EditIcon from '@assets/icons/Edit'
import { ScreenButton } from '@components/screen/CreateButton'
import { ScreenPanel } from '@components/screen/ScreenPanel'
import { ScreenTable } from '@components/screen/ScreenTable'
import { ScreenForm } from '@components/screen/form/ScreenForm'
import { Stacked } from '@components/stacked/Stacked'
import { defaultScreenInputList } from '@constants/defaultScreenList'
import { useElementSize } from '@hooks/useElementSize'
import { Dimensions } from '@models/Screen'
import { ScreenItem } from '@openapi/generated/models'
import { getMaxScreenSize, normaliseScreenRender } from '@utils/ScreenCalc'
import { transformScreenInput } from '@utils/ScreenTransformation'
import { useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import tw from 'tailwind-styled-components'

const Section = tw.div`
  mb-14
`
const Diagram = tw.div`
  my-8 flex w-full justify-center
`
const DiagramPanel = tw.div`
my-8 flex justify-center
`
const Paragraph = tw.div`
  mb-6
`
const Heading = tw.div`
  mb-8 text-2xl font-bold
`

export const Help = () => {
  const divSizeRef = useRef<HTMLDivElement>(null)
  const { width } = useElementSize(divSizeRef)

  const fullList = normaliseScreenRender(defaultScreenInputList.map((item) => transformScreenInput(item)))
  const smallList = fullList.filter((_, index) => index < 2)
  const invisibleList = smallList.map((item, index) => (index !== 1 ? item : { ...item, visible: false }))
  const maxScreenSize = getMaxScreenSize(fullList) // max possible screen size
  const maxPanelSize: Dimensions = { width, height: Math.round(maxScreenSize.height * (width / maxScreenSize.width)) }

  return (
    <>
      <Helmet>
        <title>Help - Screen Geometry</title>
        <meta name='description' content='How to get started and use this app' />
      </Helmet>

      <div className='h-full'>
        <Section>
          <Heading>Getting started</Heading>
          <Paragraph>
            When you navigate to the screens page for the first time, you will be greated with an empty table and the
            ability to import a default list of screens
          </Paragraph>
          <Diagram>
            <div className='w-96  overflow-hidden rounded-lg border-2 shadow-lg'>
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
          </Diagram>
          <Paragraph>
            Side Note: You can also create a new screen by clicking the button in the top right corner
          </Paragraph>
          <Diagram>
            <ScreenButton className='pointer-events-none' />
          </Diagram>
          <Paragraph>Loading the default list will populate the table with a list of screens.</Paragraph>
          <Diagram>
            <div className='rounded-lg border-2 p-6 shadow-lg'>
              <ScreenTable className='pointer-events-none' screens={fullList} isScreenListLoading={false} />
            </div>
          </Diagram>
          <Paragraph>
            Once the screens you are interested in are present in your table, you will notice a panel underneath which
            overlays their physically sizes you easy comparison. Moving your mouse over the table will highlight the
            corresponding panel and vice versa.
          </Paragraph>
          <Diagram>
            <div ref={divSizeRef} className='flex flex-col gap-4 rounded-lg border-2 p-6 shadow-lg'>
              <ScreenTable className='pointer-events-none' screens={smallList} highlighted={smallList[0]} />
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
          </Diagram>
        </Section>

        <Section>
          <Heading>Hide / Show</Heading>
          <Paragraph>
            You can choose to exclude a screen from the the <strong>Physical Screen Comparison</strong> by unchecking
            the <strong>Show</strong> check box
          </Paragraph>
          <Diagram>
            <div className='flex flex-col rounded-lg border-2 p-6 shadow-lg'>
              <ScreenTable className='pointer-events-none' screens={invisibleList} />
              <Stacked height={maxPanelSize.height}>
                {invisibleList
                  .filter((screen) => screen.visible)
                  .map((screen) => (
                    <ScreenPanel key={screen.id} screen={screen} />
                  ))}
              </Stacked>
            </div>
          </Diagram>
        </Section>

        <Section>
          <Heading className='mb-4 text-2xl font-bold'>Delete</Heading>
          <Paragraph>
            To delete an existing screen, click on the
            <CloseIcon id='edit-icon' className='mx-4 inline size-8 shadow-lg' fill='currentColor' /> icon in the
            <strong>action</strong> column of the Screen Specs table.
          </Paragraph>
        </Section>

        <Section>
          <Heading className='mb-4 text-2xl font-bold'>Create</Heading>
          <Paragraph>
            To create a new screen, click the <ScreenButton className='pointer-events-none mx-4 shadow-lg' /> button in
            the top right corner. This will open a form in the sidebar as show below.
          </Paragraph>
          <DiagramPanel>
            <div className='sidebar mb-6 w-96 rounded-xl p-2'>
              <div className='pointer-events-none p-2'>
                <ScreenForm isLoading={false} />
              </div>
            </div>
          </DiagramPanel>
          <Paragraph>
            You can then either use the search feature to populate the details or enter the details of the screen you
            want to create. Once you are happy with the details, click Create.
          </Paragraph>
        </Section>

        <Section>
          <Heading className='mb-4 text-2xl font-bold'>Create / Update</Heading>
          <Paragraph>
            To edit an existing screen, click on the
            <EditIcon id='edit-icon' className='mx-4 inline size-8 shadow-lg' fill='currentColor' /> icon in the{' '}
            <strong>action</strong> column of the Screen Specs table. Then make your changes and click the{' '}
            <strong>Update</strong> button.
          </Paragraph>
        </Section>
      </div>
    </>
  )
}
