import { CreateScreenButton } from '@/app/components/screen/createbutton/CreateButton'
import { ScreenForm } from '@/app/components/screen/form/ScreenForm'
import { ScreenPanel } from '@/app/components/screen/panel/ScreenPanel'
import { ScreenTable } from '@/app/components/screen/table/ScreenTable'
import { Stacked } from '@/app/components/stacked/Stacked'
import { defaultScreenInputList } from '@/app/constants/defaultScreenList'
import { useElementSize } from '@/app/hooks/useElementSize'
import type { ScreenItemRender } from '@/app/models/screenItemRender'
import { normaliseScreenRender } from '@/app/stores/screen/ScreenManager'
import { getMaxScreenSize } from '@/app/utils'
import { toScreenItem, type Dimensions } from '@screengeometry/lib-api/extended'
import type { ScreenItem } from '@screengeometry/lib-api/spec'
import { Button } from '@screengeometry/lib-ui/button'
import { Label } from '@screengeometry/lib-ui/label'
import { Pencil, X } from 'lucide-react'
import { useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { FormattedMessage } from 'react-intl'
import tw from 'tailwind-styled-components'
import { ulid } from 'ulid'

const Section = tw.div`mb-14`
const Diagram = tw.div`my-8 flex w-full justify-center`
const DiagramPanel = tw.div`my-8 flex justify-center`
const Paragraph = tw.div`mb-6`
const Heading = tw(Label)`
  mb-8 text-2xl font-bold
`

export const Help = () => {
  const [setRef, { width }] = useElementSize()

  const { fullList, smallList, invisibleList, maxPanelSize } = useMemo(() => {
    const fullList = normaliseScreenRender(
      defaultScreenInputList.map((item) => ({ ...toScreenItem(item), id: ulid() }) as ScreenItem)
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
          <Heading palette='primary'>
            <FormattedMessage id='help.gettingstarted.heading' defaultMessage='Getting started' />
          </Heading>
          <Paragraph>
            <FormattedMessage
              id='help.emptytable.p1'
              defaultMessage='When you navigate to the screens page for the first time, you will be greated with an empty table and the
            ability to import a default list of screens'
            />
          </Paragraph>
          <Diagram>
            <div className='border-primary-border w-96 overflow-hidden rounded-lg border-2 shadow-lg'>
              <ScreenTable
                screens={[]}
                isScreenListLoading={false}
                editAction={{ handler: () => {} }}
                deleteAction={{ handler: () => {}, isPending: false }}
                showActon={{ handler: () => {}, isPending: false }}
              />
              <div className='flex h-full flex-col items-center'>
                <div className='text-primary-label py-4 text-xl'>
                  <FormattedMessage id='help.emptytable.nolistfound' defaultMessage='No List Found' />
                </div>
                <div className='flex flex-col items-center gap-2 py-6'>
                  <FormattedMessage
                    id='screens.emptytable.populatelist'
                    defaultMessage='Click here to populate default list'
                  />
                  <Button className='w-40' mode='outline' disabled={false}>
                    <FormattedMessage id='help.emptytable.loadbutton' defaultMessage='Load Screens' />
                  </Button>
                </div>
              </div>
            </div>
          </Diagram>
          <Paragraph>
            <FormattedMessage
              id='help.emptytable.sidenote'
              defaultMessage='Side Note: You can also create a new screen by clicking the button in the top right corner'
            />
          </Paragraph>
          <Diagram>
            <CreateScreenButton className='pointer-events-none' />
          </Diagram>
          <Paragraph>
            <FormattedMessage
              id='help.emptytable.loadDefaultList'
              defaultMessage='Loading the default list will populate the table with a list of screens.'
            />
          </Paragraph>
          <Diagram>
            <div className='border-primary-border rounded-lg border-2 p-6 shadow-lg'>
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
            <FormattedMessage
              id='help.fulltable.comparison'
              defaultMessage='Once the screens you are interested in are present in your table, you will notice a panel underneath which overlays their  physically sizes you easy comparison. Moving your mouse over the table will highlight the corresponding panel and vice versa.'
            />
          </Paragraph>
          <Diagram>
            <div ref={setRef} className='border-primary-border flex flex-col gap-4 rounded-lg border-2 p-6 shadow-lg'>
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
          <Heading palette='primary'>
            <FormattedMessage id='help.hideshow.heading' defaultMessage='Hide / Show' />
          </Heading>
          <Paragraph>
            <FormattedMessage
              id='help.hideshow.p1'
              defaultMessage='You can choose to exclude a screen from the the <strong>Physical Screen Comparison</strong> by unchecking the <strong>Show</strong> check box'
              values={{ strong: (text) => <strong>{text}</strong> }}
            />
          </Paragraph>
          <Diagram>
            <div className='border-primary-border flex flex-col rounded-lg border-2 p-6 shadow-lg'>
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
          <Heading className='mb-4 text-2xl font-bold'>
            <FormattedMessage id='help.delete.heading' defaultMessage='Delete' />
          </Heading>
          <Paragraph>
            <FormattedMessage
              id='help.delete.p1'
              defaultMessage='To delete an existing screen, click on the <button></button> icon in the <strong>action</strong> column of the Screen  Specs table.'
              values={{
                button: () => (
                  <span className='px-2'>
                    <Button mode='outline' dimension='icon-md' className='pointer-events-none shadow-lg'>
                      <X id='edit-icon' />
                    </Button>
                  </span>
                ),
                strong: (text) => <strong>{text}</strong>,
              }}
            />
          </Paragraph>
        </Section>

        <Section>
          <Heading className='mb-4 text-2xl font-bold'>
            <FormattedMessage id='help.create.heading' defaultMessage='Create' />
          </Heading>
          <Paragraph>
            <FormattedMessage
              id='help.create.p1'
              defaultMessage='To create a new screen, click the <button></button> button in the top right corner. This will open a form in the sidebar as show below.'
              values={{
                button: () => <CreateScreenButton className='pointer-events-none mx-4 shadow-lg' />,
              }}
            />
          </Paragraph>
          <DiagramPanel>
            <div className='border-primary-border bg-background text-foreground mb-6 w-96 border-l-2 p-2 shadow-lg'>
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
            <FormattedMessage
              id='help.create.p2'
              defaultMessage='You can then either use the search feature to populate the details or enter the details of the screen you want to create. Once you are happy with the details, click Create.'
            />
          </Paragraph>
        </Section>

        <Section>
          <Heading className='mb-4 text-2xl font-bold'>
            <FormattedMessage id='help.update.heading' defaultMessage='Create / Update' />
          </Heading>
          <Paragraph>
            <FormattedMessage
              id='help.update.p1'
              defaultMessage='To edit an existing screen, click on the <button></button> icon in the <strong>action</strong> column of the Screen Specs table. Then make your changes and click the <strong>Update</strong> button.'
              values={{
                button: () => (
                  <span className='px-2'>
                    <Button mode='outline' dimension='icon-md' className='pointer-events-none shadow-lg'>
                      <Pencil id='edit-icon' />
                    </Button>
                  </span>
                ),
                strong: (text) => <strong>{text}</strong>,
              }}
            />
          </Paragraph>
        </Section>
      </div>
    </>
  )
}
