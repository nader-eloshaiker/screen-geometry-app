import {
  type Alignment,
  HorizontalAlignmentSelector,
  VerticalAlignmentSelector,
} from '@/app/components/screen/alignment/AlignmentSelector'
import { ScreenPanel } from '@/app/components/screen/panel/ScreenPanel'
import { ScreenTable } from '@/app/components/screen/table/ScreenTable'
import { Stacked } from '@/app/components/stacked/Stacked'
import { useElementSize } from '@/app/hooks/useElementSize'
import type { ScreenItemRender } from '@/app/models/screenItemRender'
import { createScreenColors, getMaxScreenSize, toScreenItemRender } from '@/app/utils'
import { type Dimensions, toScreenItem } from '@screengeometry/lib-api/extended'
import type { ScreenItem } from '@screengeometry/lib-api/spec'
import { Skeleton } from '@screengeometry/lib-ui/skeleton'
import { useNavigate } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'
import ReactGA from 'react-ga4'
import { FormattedMessage } from 'react-intl'
import { ulid } from 'ulid'
import { SaveShareButton } from '../components/buttons/SaveShareButton'
import { ScreenParam } from '../routes/share'

export const SharePage = ({ screenParams = [] }: { screenParams: ScreenParam[] }) => {
  const [setRef, { width }] = useElementSize()
  const [highlighted, setHighlighted] = useState<ScreenItemRender | undefined>()
  const [maxPanelSize, setMaxPanelSize] = useState<Dimensions>({ width, height: 0 })
  const [hAlignment, setHAlignment] = useState<Alignment>('center')
  const [vAlignment, setVAlignment] = useState<Alignment>('end')
  const navigate = useNavigate()

  const [screens, setScreens] = useState<ScreenItemRender[]>([])

  useEffect(() => {
    if (!screenParams?.length) {
      setScreens([])
      return
    }

    const screenItems = screenParams
      .map((param) => {
        const { lightColor, darkColor } = createScreenColors()
        return {
          ...toScreenItem({
            diagonalSize: param.size,
            aspectRatio: param.ratio,
            hRes: param.h,
            vRes: param.v,
            lightColor,
            darkColor,
          }),
          id: ulid(),
        } as ScreenItem
      })
      .sort((a, b) => b.data.diagonalSize - a.data.diagonalSize)

    const biggest = getMaxScreenSize(screenItems)
    const renderedScreens = screenItems.map((item) => toScreenItemRender(item, biggest))
    setScreens(renderedScreens)
  }, [screenParams])

  const onShow = useCallback(
    (id: string) => {
      ReactGA.event({
        category: 'Checkbox Click',
        action: 'Clicked show',
        label: 'Share Page',
      })
      const item = screens.find((screen) => screen.id === id)
      if (item) {
        item.visible = !item.visible
        setScreens([...screens])
      }
    },
    [screens]
  )

  const onSave = useCallback(() => {
    ReactGA.event({
      category: 'Button Click',
      action: 'Clicked save',
      label: 'Share Page',
    })

    const selectedScreensToSave = screens.filter((screen) => screen.visible)

    return navigate({
      to: '/myscreens',
      state: (prev) => ({ ...prev, screens: selectedScreensToSave }),
    })
  }, [navigate, screens])

  useEffect(() => {
    const widestScreen = screens.length > 0 ? getMaxScreenSize(screens) : { width: 47, height: 16 }
    setMaxPanelSize({ width, height: Math.round(widestScreen.height * (width / widestScreen.width)) })
  }, [screens, width])

  return (
    <>
      <h1 className='mb-4 text-3xl'>
        <FormattedMessage id='share.content.heading' defaultMessage='Shared Screen Comparisons' />
      </h1>
      <div className='flex flex-1 flex-col gap-10'>
        <div className='flex flex-col items-center gap-4 md:flex-row md:justify-between' ref={setRef}>
          <h2 className='text-primary-label text-xl'>
            <FormattedMessage id='screens.specs.title' defaultMessage='Specs Table' />
          </h2>
          <SaveShareButton onClick={onSave} />
        </div>

        <ScreenTable
          screens={screens}
          isScreenListLoading={false}
          highlighted={highlighted}
          setHighLighted={setHighlighted}
          showAction={{ handler: onShow, isPending: false, id: undefined }}
        />

        {screens.length === 0 && (
          <div className='flex h-full flex-col items-center'>
            <div className='text-primary-label py-4 text-xl'>No List Found</div>
            <div className='flex flex-col items-center gap-2 py-6'>
              <div>
                <FormattedMessage
                  id='screens.emptytable.populatelist'
                  defaultMessage='Click here to populate default list'
                />
              </div>
            </div>
          </div>
        )}
        {screens.length > 0 && (
          <>
            <div className='flex flex-col items-center gap-4 md:flex-row md:justify-between'>
              <h2 className='text-primary-label text-xl'>
                <FormattedMessage id='screens.size.title' defaultMessage='Size and Pixel Density' />
              </h2>
              <div className='flex flex-wrap gap-4'>
                <HorizontalAlignmentSelector onChange={setHAlignment} />
                <VerticalAlignmentSelector onChange={setVAlignment} />
              </div>
            </div>
            <Stacked height={maxPanelSize.height} $hAlign={hAlignment} $vAlign={vAlignment}>
              {screens.length === 0 ? (
                <Skeleton data-testid='SkeletonImage' mode='image' className='size-full' />
              ) : (
                screens
                  .filter((screen) => screen.visible)
                  .map((screen) => (
                    <ScreenPanel
                      data-testid={`ScreenPanel-${screen.data.diagonalSize}`}
                      key={screen.id}
                      screen={screen}
                      highlighted={highlighted}
                      setHighLighted={setHighlighted}
                    />
                  ))
              )}
            </Stacked>
          </>
        )}
      </div>
    </>
  )
}
