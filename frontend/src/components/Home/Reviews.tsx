import ItemContainer from "../ItemContainer";
import Review from "./Review";


const Reviews = () => {

    const reviews = [
        'Nous avons refait l\'aménagement paysager de notre cour arrière. Le résultat est éblouissant. Non seulement le visuel est extraordinaire, mais la qualité du travail et l\'attention portée aux détails sont inégalées dans le domaine. Un grand merci à Skella !',
        'Really satisfied, as promised installation of the pool in one day and with a date respected as planned, I fully recommend',
        'Wow thank you for the excellent, fast and efficient installation service. I am very satisfied!!'
    ]

    const dates = [
        'Nov 2024'
    ]

    return(
        <div className='reviews'>
            <ItemContainer>
                <h2 className='reviews-title'>Une expérience inégalée</h2>
            </ItemContainer>
            {reviews.map((review, index) => {
                return <Review key={index} reviewText={review} date={dates[index]}/>
            })}
        </div>
    );
}

export default Reviews;