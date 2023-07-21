export default function HamburgerIcon({ ...rest }: TRestProps) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' {...rest}>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='3'
        stroke='currentColor'
        d='M4 6h16M4 12h16M4 18h16'
        fill='currentColor'
        display='inline-block'
      ></path>
    </svg>
  )
}
