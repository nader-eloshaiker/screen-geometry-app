import useLocalStorage from '@/app/hooks/useLocalStorage'
import clsx from 'clsx'
import {
  AlignCenterHorizontal,
  AlignCenterVertical,
  AlignEndHorizontal,
  AlignEndVertical,
  AlignStartHorizontal,
  AlignStartVertical,
} from 'lucide-react'
import { ComponentType, SVGProps, useEffect } from 'react'

export type Alignment = 'start' | 'center' | 'end'

export const VAlignDefault = 'end'
export const HAlignDefault = 'center'
export const HAlignKey = 'hAlign'
export const VAlignKey = 'vAlign'

type TProps = {
  onChange: (alignment: Alignment) => void
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
  const [alignment, setAlignment] = useLocalStorage<Alignment>(storageKey, defaultValue)

  useEffect(() => {
    onChange(alignment)
  }, [alignment, onChange])

  return (
    <div className='join'>
      <button
        title='Start Alignment'
        className={clsx('btn btn-primary join-item ', { 'btn-outline': alignment !== 'start' })}
        onClick={() => setAlignment('start')}
      >
        <StartIcon className='size-5' />
      </button>
      <button
        title='Center Alignment'
        className={clsx('btn btn-primary join-item', { 'btn-outline': alignment !== 'center' })}
        onClick={() => setAlignment('center')}
      >
        <CenterIcon className='size-5' />
      </button>
      <button
        title='End Alignment'
        className={clsx('btn btn-primary join-item', { 'btn-outline': alignment !== 'end' })}
        onClick={() => setAlignment('end')}
      >
        <EndIcon className='size-5' />
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
      StartIcon={AlignStartHorizontal}
      CenterIcon={AlignCenterHorizontal}
      EndIcon={AlignEndHorizontal}
    />
  )
}

export const HorizontalAlignmentSelector = ({ onChange }: TProps) => {
  return (
    <AlignmentSelector
      storageKey={HAlignKey}
      defaultValue={HAlignDefault}
      onChange={onChange}
      StartIcon={AlignStartVertical}
      CenterIcon={AlignCenterVertical}
      EndIcon={AlignEndVertical}
    />
  )
}
