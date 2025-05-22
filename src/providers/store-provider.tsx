"use client"

import { ReactNode } from "react"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import { store, persistor } from "@/store"

type StoreProviderProps = {
  children: ReactNode
}

const StoreProvider = (props: StoreProviderProps) => {
  const { children } = props

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}

export default StoreProvider
