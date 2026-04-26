import { CreateScreenButton } from '@/app/components/buttons/CreateButton'
import { ShareButton } from '@/app/components/buttons/ShareButton'
import { ScreenForm } from '@/app/components/screen/form/ScreenForm'
import { ScreenPanel } from '@/app/components/screen/panel/ScreenPanel'
import { ScreenTable } from '@/app/components/screen/table/ScreenTable'
import { Stacked } from '@/app/components/stacked/Stacked'
import { defaultScreenInputList } from '@/app/constants/defaultScreenList'
import { useElementSize } from '@/app/hooks/useElementSize'
import type { ScreenItemRender } from '@/app/models/screenItemRender'
import { normaliseScreenRender } from '@/app/stores/screen/ScreenManager'
import { TranslateMessage } from '@/app/stores/translation'
import { getMaxScreenSize } from '@/app/utils'
import { toScreenItem, type Dimensions } from '@screengeometry/lib-api/extended'
import type { ScreenItem } from '@screengeometry/lib-api/spec'
import { Button } from '@screengeometry/lib-ui/button'
import { Label } from '@screengeometry/lib-ui/label'
import { cn } from '@screengeometry/lib-ui/utils'
import { Pencil, X } from 'lucide-react'
import { useMemo } from 'react'
import { ulid } from 'ulid'

function Section({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('mb-14', className)} {...props}>
      {children}
    </div>
  )
}

function Diagram({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('my-8 flex w-full justify-center', className)} {...props}>
      {children}
    </div>
  )
}

function DiagramPanel({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('my-8 flex justify-center', className)} {...props}>
      {children}
    </div>
  )
}

function Paragraph({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('mb-6', className)} {...props}>
      {children}
    </div>
  )
}

function Heading({ className, children, ...props }: React.ComponentProps<typeof Label>) {
  return (
    <Label className={cn('mb-8 text-2xl font-bold', className)} {...props}>
      {children}
    </Label>
  )
}

export const HelpPage = () => {
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
    <div className='h-full'>
      <h1 className='mb-4 text-3xl'>
        <TranslateMessage id='help.content.heading' />
      </h1>
      <Section>
        <Heading palette='primary'>
          <TranslateMessage id='help.gettingstarted.heading' />
        </Heading>
        <Paragraph>
          <TranslateMessage id='help.emptytable.p1' />
        </Paragraph>
        <Diagram>
          <div className='border-primary-border w-96 overflow-hidden rounded-lg border-2 shadow-lg'>
            <ScreenTable
              screens={[]}
              isScreenListLoading={false}
              formOpenHandler={undefined}
              deleteHandler={undefined}
              showHandler={undefined}
            />
            <div className='flex h-full flex-col items-center'>
              <div className='text-primary-label py-4 text-xl'>
                <TranslateMessage id='help.emptytable.nolistfound' />
              </div>
              <div className='flex flex-col items-center gap-2 py-6'>
                <TranslateMessage id='screens.emptytable.populatelist' />
                <Button className='w-40' mode='outline' disabled={false}>
                  <TranslateMessage id='help.emptytable.loadbutton' />
                </Button>
              </div>
            </div>
          </div>
        </Diagram>
        <Paragraph>
          <TranslateMessage id='help.emptytable.sidenote' />
        </Paragraph>
        <Diagram>
          <CreateScreenButton className='pointer-events-none' />
        </Diagram>
        <Paragraph>
          <TranslateMessage id='help.emptytable.loadDefaultList' />
        </Paragraph>
        <Diagram>
          <div className='border-primary-border rounded-lg border-2 p-6 shadow-lg'>
            <ScreenTable
              className='pointer-events-none'
              screens={fullList}
              isScreenListLoading={false}
              formOpenHandler={undefined}
              deleteHandler={undefined}
              showHandler={undefined}
            />
          </div>
        </Diagram>
        <Paragraph>
          <TranslateMessage id='help.fulltable.comparison' />
        </Paragraph>
        <Diagram>
          <div ref={setRef} className='border-primary-border flex flex-col gap-4 rounded-lg border-2 p-6 shadow-lg'>
            <ScreenTable
              className='pointer-events-none'
              screens={smallList}
              highlighted={smallList[0]}
              formOpenHandler={undefined}
              deleteHandler={undefined}
              showHandler={undefined}
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
          <TranslateMessage id='help.hideshow.heading' />
        </Heading>
        <Paragraph>
          <TranslateMessage id='help.hideshow.p1' values={{ strong: (text) => <strong>{text}</strong> }} />
        </Paragraph>
        <Diagram>
          <div className='border-primary-border flex flex-col rounded-lg border-2 p-6 shadow-lg'>
            <ScreenTable className='pointer-events-none' screens={invisibleList} formOpenHandler={undefined} />
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
        <Heading palette='primary'>
          <TranslateMessage id='help.delete.heading' />
        </Heading>
        <Paragraph>
          <TranslateMessage
            id='help.delete.p1'
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
        <Heading palette='primary'>
          <TranslateMessage id='help.create.heading' />
        </Heading>
        <Paragraph>
          <TranslateMessage
            id='help.create.p1'
            values={{
              button: () => <CreateScreenButton className='pointer-events-none mx-4 shadow-lg' />,
            }}
          />
        </Paragraph>
        <DiagramPanel>
          <div className='border-primary-border bg-background text-foreground mb-6 w-96 border-l-2 p-2 shadow-lg'>
            <div className='pointer-events-none p-2'>
              <ScreenForm
                isFormLoading={false}
                editId={''}
                editValue={undefined}
                predefinedValue={undefined}
                onClose={() => {}}
                onClearPredefinedSelection={() => {}}
              />
            </div>
          </div>
        </DiagramPanel>
        <Paragraph>
          <TranslateMessage id='help.create.p2' />
        </Paragraph>
      </Section>

      <Section>
        <Heading palette='primary'>
          <TranslateMessage id='help.update.heading' />
        </Heading>
        <Paragraph>
          <TranslateMessage
            id='help.update.p1'
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

      <Section>
        <Heading palette='primary'>
          <TranslateMessage id='help.sharing.heading' />
        </Heading>
        <Paragraph>
          <TranslateMessage
            id='help.sharing.p1'
            values={{
              button: () => <ShareButton className='pointer-events-none mx-4 shadow-lg' />,
              strong: (text) => <strong>{text}</strong>,
            }}
          />
        </Paragraph>
        <Paragraph>
          <TranslateMessage id='help.sharing.p2' />
        </Paragraph>
        <Paragraph>
          <TranslateMessage id='help.sharing.p3' />
        </Paragraph>
      </Section>
    </div>
  )
}
