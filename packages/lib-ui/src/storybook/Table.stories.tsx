import { Checkbox } from '@lib/components/checkbox'
import {
  Table,
  TableBody,
  TableBodyCell,
  TableBodyRow,
  TableCaption,
  TableFooter,
  TableFooterCell,
  TableFooterRow,
  TableHeader,
  TableHeaderCell,
  TableHeaderRow,
} from '@lib/components/table'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Elements/Table',
  component: Table,
  // tags: ['autodocs'],
  argTypes: {},
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
    selected: false,
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
    selected: false,
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
    selected: false,
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
    selected: false,
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
    selected: false,
  },
  {
    invoice: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
    selected: false,
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
    selected: false,
  },
]

export const Component: Story = {
  args: {},
  parameters: {},
  render: () => {
    return (
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableHeaderRow>
            <TableHeaderCell className='w-[100px]'>Select</TableHeaderCell>
            <TableHeaderCell className='w-[100px]'>Invoice</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Method</TableHeaderCell>
            <TableHeaderCell className='text-right'>Amount</TableHeaderCell>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableBodyRow key={invoice.invoice}>
              <TableBodyCell>
                <Checkbox dimension='sm' defaultChecked={invoice.selected} />
              </TableBodyCell>
              <TableBodyCell className='font-medium'>{invoice.invoice}</TableBodyCell>
              <TableBodyCell>{invoice.paymentStatus}</TableBodyCell>
              <TableBodyCell>{invoice.paymentMethod}</TableBodyCell>
              <TableBodyCell className='text-right'>{invoice.totalAmount}</TableBodyCell>
            </TableBodyRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableFooterRow>
            <TableFooterCell colSpan={3}>Total</TableFooterCell>
            <TableFooterCell className='text-right'>$2,500.00</TableFooterCell>
          </TableFooterRow>
        </TableFooter>
      </Table>
    )
  },
}
