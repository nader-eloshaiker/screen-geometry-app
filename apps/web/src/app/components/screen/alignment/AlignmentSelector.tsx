import useLocalStorage from '@/app/hooks/useLocalStorage'
import { useTranslation } from '@/app/stores/translation'
import { ToggleGroup, ToggleGroupItem } from '@screengeometry/lib-ui/togglegroup'
import { TooltipProvider } from '@screengeometry/lib-ui/tooltip'
import { cn } from '@screengeometry/lib-ui/utils'
import {
  AlignCenterHorizontal,
  AlignCenterVertical,
  AlignEndHorizontal,
  AlignEndVertical,
  AlignStartHorizontal,
  AlignStartVertical,
} from 'lucide-react'
import { type ComponentType, type SVGProps, useEffect } from 'react'

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
  description: string
  content: Array<{
    Icon: ComponentType<SVGProps<SVGSVGElement>>
    alignment: Alignment
    label: string
  }>
}

const AlignmentSelector = ({ onChange, storageKey, defaultValue, description, content }: AlignmentSelectorProps) => {
  const [selectedAlignment, setSelectedAlignment] = useLocalStorage<string>(storageKey, defaultValue)

  useEffect(() => {
    onChange(selectedAlignment as Alignment)
  }, [selectedAlignment, onChange])

  return (
    <TooltipProvider>
      <ToggleGroup
        type='single'
        mode='pill'
        value={selectedAlignment}
        onValueChange={setSelectedAlignment}
        className='shadow-md'
        aria-label={description}
      >
        {content.map(({ Icon, alignment, label }) => (
          <ToggleGroupItem
            key={label}
            value={alignment}
            aria-label={label}
            className={cn(selectedAlignment === alignment && 'pointer-events-none')}
          >
            <Icon className='size-5' />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </TooltipProvider>
  )
}

export const VerticalAlignmentSelector = ({ onChange }: TProps) => {
  const { formatMessage } = useTranslation()
  return (
    <AlignmentSelector
      storageKey={VAlignKey}
      defaultValue={VAlignDefault}
      onChange={onChange}
      description={formatMessage('screens.panel.vertical')}
      content={[
        {
          Icon: AlignStartHorizontal,
          alignment: 'start',
          label: formatMessage('screens.panel.verticalTop'),
        },
        {
          Icon: AlignCenterHorizontal,
          alignment: 'center',
          label: formatMessage('screens.panel.verticalCenter'),
        },
        {
          Icon: AlignEndHorizontal,
          alignment: 'end',
          label: formatMessage('screens.panel.verticalBottom'),
        },
      ]}
    />
  )
}

export const HorizontalAlignmentSelector = ({ onChange }: TProps) => {
  const { formatMessage } = useTranslation()
  return (
    <AlignmentSelector
      storageKey={HAlignKey}
      defaultValue={HAlignDefault}
      onChange={onChange}
      description={formatMessage('screens.panel.horizontal')}
      content={[
        {
          Icon: AlignStartVertical,
          alignment: 'start',
          label: formatMessage('screens.panel.horizontalLeft'),
        },
        {
          Icon: AlignCenterVertical,
          alignment: 'center',
          label: formatMessage('screens.panel.horizontalCenter'),
        },
        {
          Icon: AlignEndVertical,
          alignment: 'end',
          label: formatMessage('screens.panel.horizontalRight'),
        },
      ]}
    />
  )
}
