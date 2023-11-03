import styles from './collection.module.css'
import MyCollection from '../../../components/myCollection/myCollection'

function CollectorList(){
    <>
        <MyCollection />
        <div></div>
    </>
}

export default function Collection(){
    return(
        <div className={styles.collectionPageContainer}>
            <div className={styles.collectorList}>
                <CollectorList />
            </div>
            <div className={styles.collectionGallery}>
                <h1>Hello</h1>
            </div>
        </div>
    )
}