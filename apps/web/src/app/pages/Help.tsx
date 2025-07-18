import { CreateScreenButton } from '@/app/components/screen/createbutton/CreateButton'
import { ScreenPanel } from '@/app/components/screen/panel/ScreenPanel'
import { ScreenTable } from '@/app/components/screen/table/ScreenTable'
import { Stacked } from '@/app/components/stacked/Stacked'
import { defaultScreenInputList } from '@/app/constants/defaultScreenList'
import { ScreenItemRender } from '@/app/models/screenItemRender'
import { useElementSize } from '@/lib/ui/hooks/useElementSize'
import { getMaxScreenSize, normaliseScreenRender, transformScreenInput } from '@/lib/utils'
import { Dimensions } from '@screengeometry/lib-api/internal'
import { Button } from '@screengeometry/lib-ui/button'
import { Label } from '@screengeometry/lib-ui/label'
import { Pencil, X } from 'lucide-react'
import { useMemo, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import tw from 'tailwind-styled-components'
import { ulid } from 'ulid'
import { ScreenForm } from '../components/screen/form/ScreenForm'

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
const Heading = tw(Label)`
  mb-8 text-2xl font-bold
`

export const Help = () => {
  const divSizeRef = useRef<HTMLDivElement>(null)
  const { width } = useElementSize(divSizeRef)

  const { fullList, smallList, invisibleList, maxPanelSize } = useMemo(() => {
    const fullList = normaliseScreenRender(
      defaultScreenInputList.map((item) => ({ ...transformScreenInput(item), id: ulid() }))
    )
    const smallList = fullList.filter((_, index) => index < 2)
    const invisibleList = smallList.map((item, index) => (index !== 1 ? item : { ...item, visible: false }))
    const maxScreenSize = getMaxScreenSize(fullList) // max possible screen size
    const maxPanelSize: Dimensions = { width, height: Math.round(maxScreenSize.height * (width / maxScreenSize.width)) }

    return {
      fullList,
      smallList,
      invisibleList,
      maxScreenSize,
      maxPanelSize,
    }
  }, [width])

  return (
    <>
      <Helmet>
        <title>Screen Geometry: Help</title>
        <meta name='description' content='How to get started and use this screeen comparison tool' />
      </Helmet>

      <div className='h-full'>
        <Section>
          <Heading palette='primary'>Getting started</Heading>
          <Paragraph>
            When you navigate to the screens page for the first time, you will be greated with an empty table and the
            ability to import a default list of screens
          </Paragraph>
          <Diagram>
            <div className='w-96  overflow-hidden rounded-lg border-2 border-primary-border shadow-lg'>
              <ScreenTable
                screens={[]}
                isScreenListLoading={false}
                editAction={{ handler: () => {} }}
                deleteAction={{ handler: () => {}, isPending: false }}
                showActon={{ handler: () => {}, isPending: false }}
              />
              <div className='flex h-full flex-col items-center'>
                <div className='py-4 text-primary-label'>
                  <span className='text-xl'>No List Found</span>
                </div>
                <div className='flex flex-col items-center gap-2 py-6'>
                  <div>Click here to populate default list</div>
                  <Button className='w-40' mode='outline' disabled={false}>
                    Load Screens
                  </Button>
                </div>
              </div>
            </div>
          </Diagram>
          <Paragraph>
            Side Note: You can also create a new screen by clicking the button in the top right corner
          </Paragraph>
          <Diagram>
            <CreateScreenButton className='pointer-events-none' />
          </Diagram>
          <Paragraph>Loading the default list will populate the table with a list of screens.</Paragraph>
          <Diagram>
            <div className='rounded-lg border-2 border-primary-border p-6 shadow-lg'>
              <ScreenTable
                className='pointer-events-none'
                screens={fullList}
                isScreenListLoading={false}
                editAction={{ handler: () => {} }}
                deleteAction={{ handler: () => {}, isPending: false }}
                showActon={{ handler: () => {}, isPending: false }}
              />
            </div>
          </Diagram>
          <Paragraph>
            Once the screens you are interested in are present in your table, you will notice a panel underneath which
            overlays their physically sizes you easy comparison. Moving your mouse over the table will highlight the
            corresponding panel and vice versa.
          </Paragraph>
          <Diagram>
            <div
              ref={divSizeRef}
              className='flex flex-col gap-4 rounded-lg border-2 border-primary-border p-6 shadow-lg'
            >
              <ScreenTable
                className='pointer-events-none'
                screens={smallList}
                highlighted={smallList[0]}
                editAction={{ handler: () => {} }}
                deleteAction={{ handler: () => {}, isPending: false }}
                showActon={{ handler: () => {}, isPending: false }}
              />
              <Stacked height={maxPanelSize.height}>
                {smallList
                  .filter((screen) => screen.visible)
                  .map((screen) => (
                    <ScreenPanel
                      key={screen.id}
                      screen={screen}
                      $isHighlighted={(screen: ScreenItemRender) => screen.id === smallList[0].id}
                    />
                  ))}
              </Stacked>
            </div>
          </Diagram>
        </Section>

        <Section>
          <Heading palette='primary'>Hide / Show</Heading>
          <Paragraph>
            You can choose to exclude a screen from the the <strong>Physical Screen Comparison</strong> by unchecking
            the <strong>Show</strong> check box
          </Paragraph>
          <Diagram>
            <div className='flex flex-col rounded-lg border-2 border-primary-border p-6 shadow-lg'>
              <ScreenTable
                className='pointer-events-none'
                screens={invisibleList}
                editAction={{ handler: () => {} }}
                deleteAction={{ handler: () => {}, isPending: false }}
                showActon={{ handler: () => {}, isPending: false }}
              />
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
            <span>To delete an existing screen, click on the</span>
            <span className='px-4'>
              <Button mode='outline' dimension='icon-md' className='pointer-events-none shadow-lg'>
                <X id='edit-icon' />
              </Button>
            </span>
            <span>
              icon in the <strong>action</strong> column of the Screen Specs table.
            </span>
          </Paragraph>
        </Section>

        <Section>
          <Heading className='mb-4 text-2xl font-bold'>Create</Heading>
          <Paragraph>
            To create a new screen, click the <CreateScreenButton className='pointer-events-none mx-4 shadow-lg' />{' '}
            button in the top right corner. This will open a form in the sidebar as show below.
          </Paragraph>
          <DiagramPanel>
            <div className='mb-6 w-96 border-l-2 border-primary-border bg-background p-2 text-foreground shadow-lg'>
              <div className='pointer-events-none p-2'>
                <ScreenForm
                  setOpen={() => {}}
                  isEditLoading={false}
                  editId={''}
                  editScreen={undefined}
                  selectedItem={undefined}
                  setSelectedItem={() => {}}
                />
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
            <span>To edit an existing screen, click on the</span>
            <span className='px-4'>
              <Button mode='outline' dimension='icon-md' className='pointer-events-none shadow-lg'>
                <Pencil id='edit-icon' />
              </Button>
            </span>
            <span>
              icon in the <strong>action</strong> column of the Screen Specs table. Then make your changes and click the{' '}
              <strong>Update</strong> button.
            </span>
          </Paragraph>
        </Section>
      </div>
    </>
  )
}
