import styles from './foodGallery.module.css'
import Image from 'next/image'

function FoodGalleryCard(){
    return(
        <div className={styles.foodGallery__card}>
            <div className={styles.foodGallery__image}>
                <Image 
                    src="/steak.png"
                    width={30}
                    height={200}
                    alt="Meat Image"
                />
            </div>
            <div className={styles.foodGallery__title}>Delicious Meat Title</div>
            <div className={styles.foodGallery__resto}>Resto Name</div>
            <div className={styles.foodGallery__starRate}>Stars</div>
            <div className={styles.foodGallery__priceAndType}>
                <div className={styles.foodGallery__price}>$$$</div>
                <div className={styles.foodGallery__foodType}>Food Type</div>
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