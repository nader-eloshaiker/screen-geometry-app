import useLocalStorage from '@/app/hooks/useLocalStorage'
import { ToggleGroup, ToggleGroupItem } from '@/lib/ui/components/tooglegroup/ToggleGroup'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/lib/ui/components/tooltip/Tooltip'
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
  content: Array<{
    Icon: ComponentType<SVGProps<SVGSVGElement>>
    alignment: Alignment
    label: string
  }>
}
const AlignmentSelector = ({ onChange, storageKey, defaultValue, content }: AlignmentSelectorProps) => {
  const [alignment, setAlignment] = useLocalStorage<string>(storageKey, defaultValue)

  useEffect(() => {
    onChange(alignment as Alignment)
  }, [alignment, onChange])

  return (
    <TooltipProvider>
      <ToggleGroup type='single' mode='pill' value={alignment} onValueChange={setAlignment}>
        {content.map(({ Icon, alignment, label }) => (
          <ToggleGroupItem key={label} value={alignment} aria-label={label}>
            <Tooltip>
              <TooltipTrigger>
                <Icon className='size-5' />
              </TooltipTrigger>
              <TooltipContent className='m-3'>
                <p>{label}</p>
              </TooltipContent>
            </Tooltip>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </TooltipProvider>
  )
}

export const VerticalAlignmentSelector = ({ onChange }: TProps) => {
  return (
    <AlignmentSelector
      storageKey={VAlignKey}
      defaultValue={VAlignDefault}
      onChange={onChange}
      content={[
        { Icon: AlignStartHorizontal, alignment: 'start', label: 'Align Top' },
        { Icon: AlignCenterHorizontal, alignment: 'center', label: 'Align Center' },
        { Icon: AlignEndHorizontal, alignment: 'end', label: 'Align Bottom' },
      ]}
    />
  )
}

export const HorizontalAlignmentSelector = ({ onChange }: TProps) => {
  return (
    <AlignmentSelector
      storageKey={HAlignKey}
      defaultValue={HAlignDefault}
      onChange={onChange}
      content={[
        { Icon: AlignStartVertical, alignment: 'start', label: 'Align Left' },
        { Icon: AlignCenterVertical, alignment: 'center', label: 'Align Center' },
        { Icon: AlignEndVertical, alignment: 'end', label: 'Align Right' },
      ]}
    />
  )
}
