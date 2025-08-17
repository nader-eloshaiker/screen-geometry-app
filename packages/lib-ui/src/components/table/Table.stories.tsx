import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from '../checkbox'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './Table'

const meta = {
  // tags: ['autodocs'],
  argTypes: {},
  component: Table,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  title: 'Elements/Table',
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

const invoices = [
  {
    invoice: 'INV001',
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    selected: false,
    totalAmount: '$250.00',
  },
  {
    invoice: 'INV002',
    paymentMethod: 'PayPal',
    paymentStatus: 'Pending',
    selected: true,
    totalAmount: '$150.00',
  },
  {
    invoice: 'INV003',
    paymentMethod: 'Bank Transfer',
    paymentStatus: 'Unpaid',
    selected: false,
    totalAmount: '$350.00',
  },
  {
    invoice: 'INV004',
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    selected: false,
    totalAmount: '$450.00',
  },
  {
    invoice: 'INV005',
    paymentMethod: 'PayPal',
    paymentStatus: 'Paid',
    selected: false,
    totalAmount: '$550.00',
  },
  {
    invoice: 'INV006',
    paymentMethod: 'Bank Transfer',
    paymentStatus: 'Pending',
    selected: false,
    totalAmount: '$200.00',
  },
  {
    invoice: 'INV007',
    paymentMethod: 'Credit Card',
    paymentStatus: 'Unpaid',
    selected: false,
    totalAmount: '$300.00',
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
          <TableRow>
            <TableHead className='w-[100px]'>Select</TableHead>
            <TableHead className='w-[100px]'>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className='text-right'>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice} data-state={invoice.selected ? 'selected' : ''}>
              <TableCell>
                <Checkbox dimension='sm' defaultChecked={invoice.selected} />
              </TableCell>
              <TableCell className='font-medium'>{invoice.invoice}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell className='text-right'>{invoice.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className='text-right'>$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
  },
}
