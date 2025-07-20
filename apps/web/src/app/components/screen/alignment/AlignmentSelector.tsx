import useLocalStorage from '@/app/hooks/useLocalStorage'
import { ToggleGroup, ToggleGroupItem } from '@screengeometry/lib-ui/togglegroup'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@screengeometry/lib-ui/tooltip'
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
  description: string
  content: Array<{
    Icon: ComponentType<SVGProps<SVGSVGElement>>
    alignment: Alignment
    label: string
  }>
}

const AlignmentSelector = ({ onChange, storageKey, defaultValue, description, content }: AlignmentSelectorProps) => {
  const [alignment, setAlignment] = useLocalStorage<string>(storageKey, defaultValue)

  useEffect(() => {
    onChange(alignment as Alignment)
  }, [alignment, onChange])

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <ToggleGroup type='single' mode='pill' value={alignment} onValueChange={setAlignment} className='shadow-md'>
            {content.map(({ Icon, alignment, label }) => (
              <ToggleGroupItem key={label} value={alignment} aria-label={label}>
                <Icon className='size-5' />
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </TooltipTrigger>
        <TooltipContent>
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export const VerticalAlignmentSelector = ({ onChange }: TProps) => {
  return (
    <AlignmentSelector
      storageKey={VAlignKey}
      defaultValue={VAlignDefault}
      onChange={onChange}
      description='Vertical Alignment'
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
      description='Horizontal Alignment'
      content={[
        { Icon: AlignStartVertical, alignment: 'start', label: 'Align Left' },
        { Icon: AlignCenterVertical, alignment: 'center', label: 'Align Center' },
        { Icon: AlignEndVertical, alignment: 'end', label: 'Align Right' },
      ]}
    />
  )
}
