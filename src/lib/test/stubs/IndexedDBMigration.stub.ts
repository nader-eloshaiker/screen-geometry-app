import { Stores } from '@/lib/server/db/DbConstants'

export const setupV2DB = () =>
  new Promise((resolve) => {
    const openReq = indexedDB.open('Testv2Tov3', 2)
    openReq.onupgradeneeded = () => {
      const db = openReq.result
      db.createObjectStore(Stores.DeprecatedLocalForageBlob)
      db.createObjectStore(Stores.DeprecatedLocalForageTable)

      const tx = openReq.transaction
      const oldStore = tx!.objectStore(Stores.DeprecatedLocalForageTable)
      oldStore.add(
        [
          {
            id: 'I0WBgxI_',
            tag: { aspectRatio: '21:9', diagonalSize: 34 },
            spec: { hRes: 3440, vRes: 1440, ppi: 109.683 },
            data: { hAspectRatio: 21, vAspectRatio: 9, hSize: 31.251, vSize: 13.393 },
            color: { lightColor: '#FCDF50', darkColor: '#967E03' },
            visible: true,
          },
          {
            id: 'bxRKJe0g',
            tag: { aspectRatio: '21:9', diagonalSize: 38 },
            spec: { hRes: 3840, vRes: 1600, ppi: 109.474 },
            data: { hAspectRatio: 21, vAspectRatio: 9, hSize: 34.927, vSize: 14.969 },
            color: { lightColor: '#F6693C', darkColor: '#C33609' },
            visible: true,
          },
        ],
        'screens',
      )
    }
    openReq.onsuccess = () => {
      openReq.result.close()
      resolve(true)
    }

    openReq.onerror = () => {
      openReq.result.close()
      resolve(false)
    }
  })
