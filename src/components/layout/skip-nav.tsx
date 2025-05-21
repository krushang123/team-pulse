import { Button } from "@/components/ui/button"

const SkipNav = () => (
  <Button
    asChild
    variant='outline'
    className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 m-4 p-6!'
  >
    <a href='#main'>Skip to main content</a>
  </Button>
)

export default SkipNav
