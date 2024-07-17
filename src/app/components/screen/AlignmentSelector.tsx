import AlignBottomIcon from '@app/assets/icons/AlignBottom'
import AlignHorizCenterIcon from '@app/assets/icons/AlignHorizCenter'
import AlignLeftIcon from '@app/assets/icons/AlignLeft'
import AlignRightIcon from '@app/assets/icons/AlignRight'
import AlignTopIcon from '@app/assets/icons/AlignTop'
import AlignVertCenterIcon from '@app/assets/icons/AlignVertCenter'
import clsx from 'clsx'
import { ComponentType, SVGProps, useEffect, useState } from 'react'

export type Alignment = 'start' | 'center' | 'end'

export const VAlignDefault = 'end'
export const HAlignDefault = 'center'
export const HAlignKey = 'hAlign'
export const VAlignKey = 'vAlign'

type TProps = {
  onChange: (alignment: Alignment) => void
}

export const HorizontalAlignmentSelector = ({ onChange }: TProps) => {
  const [alignment, setAlignment] = useState<Alignment>()

  useEffect(() => {
    const value = (window.localStorage.getItem(HAlignKey) as Alignment) ?? HAlignDefault
    setAlignment(value)
    onChange(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!alignment) return

    window.localStorage.setItem(HAlignKey, alignment)
    onChange(alignment)
  }, [alignment, onChange])

  return (
    <div className='join'>
      <button
        className={clsx('btn btn-primary join-item ', { 'btn-outline': alignment !== 'start' })}
        onClick={() => setAlignment('start')}
      >
        <AlignLeftIcon className='size-6' fill='currentColor' />
      </button>
      <button
        className={clsx('btn btn-primary join-item', { 'btn-outline': alignment !== 'center' })}
        onClick={() => setAlignment('center')}
      >
        <AlignHorizCenterIcon className='size-6' fill='currentColor' />
      </button>
      <button
        className={clsx('btn btn-primary join-item', { 'btn-outline': alignment !== 'end' })}
        onClick={() => setAlignment('end')}
      >
        <AlignRightIcon className='size-6' fill='currentColor' />
      </button>
    </div>
  )
}

export const VerticalAlignmentSelectorOld = ({ onChange }: TProps) => {
  const [alignment, setAlignment] = useState<Alignment>()

  useEffect(() => {
    const value = (window.localStorage.getItem(VAlignKey) as Alignment) ?? VAlignDefault
    setAlignment(value)
    onChange(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!alignment) return

    window.localStorage.setItem(VAlignKey, alignment)
    onChange(alignment)
  }, [alignment, onChange])

  return (
    <div className='join'>
      <button
        className={clsx('btn btn-primary join-item ', { 'btn-outline': alignment !== 'start' })}
        onClick={() => setAlignment('start')}
      >
        <AlignTopIcon className='size-6' fill='currentColor' />
      </button>
      <button
        className={clsx('btn btn-primary join-item', { 'btn-outline': alignment !== 'center' })}
        onClick={() => setAlignment('center')}
      >
        <AlignVertCenterIcon className='size-6' fill='currentColor' />
      </button>
      <button
        className={clsx('btn btn-primary join-item', { 'btn-outline': alignment !== 'end' })}
        onClick={() => setAlignment('end')}
      >
        <AlignBottomIcon className='size-6' fill='currentColor' />
      </button>
    </div>
  )
}

type AlignmentSelectorProps = TProps & {
  storageKey: string
  defaultValue: Alignment
  StartIcon: ComponentType<SVGProps<SVGSVGElement>>
  CenterIcon: ComponentType<SVGProps<SVGSVGElement>>
  EndIcon: ComponentType<SVGProps<SVGSVGElement>>
}
const AlignmentSelector = ({
  onChange,
  storageKey,
  defaultValue,
  StartIcon,
  CenterIcon,
  EndIcon,
}: AlignmentSelectorProps) => {
  const [alignment, setAlignment] = useState<Alignment>()

  useEffect(() => {
    const value = (window.localStorage.getItem(storageKey) as Alignment) ?? defaultValue
    setAlignment(value)
    onChange(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!alignment) return

    window.localStorage.setItem(storageKey, alignment)
    onChange(alignment)
  }, [alignment, storageKey, onChange])

  return (
    <div className='join'>
      <button
        className={clsx('btn btn-primary join-item ', { 'btn-outline': alignment !== 'start' })}
        onClick={() => setAlignment('start')}
      >
        <StartIcon className='size-6' fill='currentColor' />
      </button>
      <button
        className={clsx('btn btn-primary join-item', { 'btn-outline': alignment !== 'center' })}
        onClick={() => setAlignment('center')}
      >
        <CenterIcon className='size-6' fill='currentColor' />
      </button>
      <button
        className={clsx('btn btn-primary join-item', { 'btn-outline': alignment !== 'end' })}
        onClick={() => setAlignment('end')}
      >
        <EndIcon className='size-6' fill='currentColor' />
      </button>
    </div>
  )
}

export const VerticalAlignmentSelector = ({ onChange }: TProps) => {
  return (
    <AlignmentSelector
      storageKey={VAlignKey}
      defaultValue={VAlignDefault}
      onChange={onChange}
      StartIcon={AlignTopIcon}
      CenterIcon={AlignVertCenterIcon}
      EndIcon={AlignBottomIcon}
    />
  )
}
