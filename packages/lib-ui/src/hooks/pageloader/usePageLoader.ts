import { useContext } from 'react'
import { PageLoaderContext } from './PageLoaderContext'

export const usePageLoader = () => useContext(PageLoaderContext)
