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
import { type ComponentType, type SVGProps, useEffect } from 'react'
import { useIntl } from 'react-intl'

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
  const { formatMessage } = useIntl()
  return (
    <AlignmentSelector
      storageKey={VAlignKey}
      defaultValue={VAlignDefault}
      onChange={onChange}
      description={formatMessage({
        id: 'screens.panel.vertical',
        defaultMessage: 'Vertical Alignment',
      })}
      content={[
        {
          Icon: AlignStartHorizontal,
          alignment: 'start',
          label: formatMessage({
            id: 'screens.panel.verticalTop',
            defaultMessage: 'Align Top',
          }),
        },
        {
          Icon: AlignCenterHorizontal,
          alignment: 'center',
          label: formatMessage({
            id: 'screens.panel.verticalCenter',
            defaultMessage: 'Align Center',
          }),
        },
        {
          Icon: AlignEndHorizontal,
          alignment: 'end',
          label: formatMessage({
            id: 'screens.panel.verticalBottom',
            defaultMessage: 'Align Bottom',
          }),
        },
      ]}
    />
  )
}

export const HorizontalAlignmentSelector = ({ onChange }: TProps) => {
  const { formatMessage } = useIntl()

  return (
    <AlignmentSelector
      storageKey={HAlignKey}
      defaultValue={HAlignDefault}
      onChange={onChange}
      description={formatMessage({
        id: 'screens.panel.horizontal',
        defaultMessage: 'Horizontal Alignment',
      })}
      content={[
        {
          Icon: AlignStartVertical,
          alignment: 'start',
          label: formatMessage({
            id: 'screens.panel.horizontalLeft',
            defaultMessage: 'Align Left',
          }),
        },
        {
          Icon: AlignCenterVertical,
          alignment: 'center',
          label: formatMessage({
            id: 'screens.panel.horizontalCenter',
            defaultMessage: 'Align Center',
          }),
        },
        {
          Icon: AlignEndVertical,
          alignment: 'end',
          label: formatMessage({
            id: 'screens.panel.horizontalRight',
            defaultMessage: 'Align Right',
          }),
        },
      ]}
    />
  )
}
