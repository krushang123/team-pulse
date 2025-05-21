"use client"

import { ReactNode, useRef } from "react"
import { Provider } from "react-redux"

import { makeStore, AppStore } from "@/store"

type StoreProviderProps = {
  children: ReactNode
}

const StoreProvider = (props: StoreProviderProps) => {
  const { children } = props

  const storeRef = useRef<AppStore>(undefined)
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}

export default StoreProvider
