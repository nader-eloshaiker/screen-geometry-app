import { type ScreenColor, type ScreenItem } from '@screengeometry/lib-api/spec'
import { ulid } from 'ulid'
import { StoresEnum } from '../DbConstants'

export const migrateV2toV3 = (db: IDBDatabase, openReq: IDBOpenDBRequest) => {
  if (!db.objectStoreNames.contains(StoresEnum.DeprecatedLocalForageTable)) {
    return
  }

  console.log('Migrating screens store')

  // get old table data\
  const tx = openReq.transaction
  if (!tx) {
    throw new Error('Unable to create transaction')
  }

  const newStore = tx.objectStore(StoresEnum.Screens)
  const oldStore = tx.objectStore(StoresEnum.DeprecatedLocalForageTable)
  const oldResponse = oldStore.get('screens')

  oldResponse.onsuccess = () => {
    for (const oldItem of oldResponse.result ?? []) {
      const newItem: ScreenItem = {
        id: ulid(),
        signature: `dSize=${oldItem.tag.diagonalSize}&aRatio=${oldItem.tag.aspectRatio}&hRes=${oldItem.spec.hRes}&vRes=${oldItem.spec.vRes}`,
        visible: oldItem.visible as boolean,
        data: {
          aspectRatio: oldItem.tag.aspectRatio as string,
          diagonalSize: oldItem.tag.diagonalSize as number,
          hRes: oldItem.spec.hRes as number,
          vRes: oldItem.spec.vRes as number,
        },
        specs: {
          hAspectRatio: oldItem.data.hAspectRatio as number,
          vAspectRatio: oldItem.data.vAspectRatio as number,
          ppi: oldItem.spec.ppi as number,
          hSize: oldItem.data.hSize as number,
          vSize: oldItem.data.vSize as number,
        },
        color: oldItem.color as ScreenColor,
      }
      newStore.add(newItem)
    }

    console.log('migration complete, removing old store')
    db.deleteObjectStore(StoresEnum.DeprecatedLocalForageTable)
    db.deleteObjectStore(StoresEnum.DeprecatedLocalForageBlob)
  }
}
