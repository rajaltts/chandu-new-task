import { openDB } from 'idb'

const DB = 'UI_Error_Log'
const OBJECT_STORE_NAME = 'UI_Errors'

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    )
}

export const logError = async (error) => {
    //Logs error to console
    console.error('Error: ', error)

    //Logs error to IndexDB
    let db = await openDB(DB)
    if (!db.objectStoreNames.contains(OBJECT_STORE_NAME)) {
        const version = db.version + 1
        db.close()
        db = await openDB(DB, version, {
            upgrade(db) {
                db.createObjectStore(OBJECT_STORE_NAME, {
                    keyPath: 'key',
                    autoIncrement: true,
                })
            },
        })
    }
    db.put(OBJECT_STORE_NAME, { key: uuidv4(), value: { error, date: new Date() } })
}

//Retrieves error form IndexDB
export const readLoggedError = async () => {
    let db = await openDB('UI_Error_Log')

    let tx = db.transaction(OBJECT_STORE_NAME, 'readonly')
    let store = tx.objectStore(OBJECT_STORE_NAME)

    // add, clear, count, delete, get, getAll, getAllKeys, getKey, put
    let allSavedItems = await store.getAll()

    console.info(allSavedItems)

    db.close()
}
