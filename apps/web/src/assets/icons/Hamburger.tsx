export default function HamburgerIcon({ ...rest }: TRestProps) {
  // Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.
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
