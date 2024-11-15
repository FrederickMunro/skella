
interface Pool {
    name: string;
    image: string;
}

const HomePoolContainer = ({ name, image } : Pool) => {
    return (
        <div className="home-pool-card">
            <h1>{name}</h1>
            <img
                src={typeof image === 'string' ? image : ''} 
                alt={'pool'}
                className="pools-pool-image"
            />
        </div>
    )
}

export default HomePoolContainer;