import styles from './foodGallery.module.css'
import Image from 'next/image'

function FoodGalleryCard(){
    return(
        <div className={styles.foodGallery__card}>
            <div className={styles.foodGallery__image}>
                <Image 
                    src="/juicysteak.jpg"
                    width={325}
                    height={200}
                    alt="Meat Image"
                />
            </div>
            <div className={styles.foodGallery__title}>Delicious Meat Title</div>
            <div className={styles.foodGallery__resto}>Resto Name</div>
            <div className={styles.foodGallery__starRate}>Stars</div>
            <div className={styles.foodGallery__priceAndParts}>
                <div className={styles.foodGallery__price}>$$$</div>
                <div className={styles.foodGallery__parts}>Parts of Beef</div>
            </div>
        </div>
    )
}

export default function FoodGallery(){
    return(
        <>
            {FoodGalleryCard()}
            {FoodGalleryCard()}
            {FoodGalleryCard()}
            {FoodGalleryCard()}
            {FoodGalleryCard()}
            {FoodGalleryCard()}
        </>
    )
}