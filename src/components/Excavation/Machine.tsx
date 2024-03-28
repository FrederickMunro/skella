import './Excavation.css';

interface Props {
  title: string;
  image: string;
  text: string;
}

const Machine = ({ title, image, text }: Props) => {
  return(
    <div className='machine-container'>
      <h2 className='machine-title'>{title}</h2>
      <img className='machine-image' src={image} />
      <p className='machine-text'>{text}</p>
    </div>
  );
}

export default Machine;