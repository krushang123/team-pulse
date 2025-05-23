import { ReactNode } from "react"

import SkipNav from "@/components/layout/skip-nav"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import ClientToaster from "@/components/layout/client-toaster"

type PrimaryLayoutProps = {
  children: ReactNode
}

const PrimaryLayout = (props: PrimaryLayoutProps) => {
  const { children } = props

  return (
    <>
      <SkipNav />
      <Header />

      <main id='main' className='flex-1 max-w-6xl mx-auto w-full px-4 py-6'>
        {children}
        <ClientToaster />
      </main>

      <Footer />
    </>
  )
}

export default PrimaryLayout
