import './Pools.css';

import ExtLink from '../../assets/external-link.svg';

interface Props {
  title: string;
  description: string;
  image: string;
  sizes: string[];
  blueprints: string[];
  depth: string;
}

const Model = ({ title, description, image, sizes, blueprints, depth }: Props) => {

  const openPdf = (pdf: string) => {
    window.open(pdf, '_blank');
  }

  return(
    <div className='model-container'>
      <h3 className='model-title'>{title}</h3>
      <p className='model-description'>{description}</p>
      <img className='model-image' src={image} />
      <p className='model-size-title'>Available sizes:</p>
      <ul className='model-size-list'>
        {
          sizes.map((size, index) => {
            return(
              <div
                className='size-and-pdf-container'
                onClick={() => openPdf(blueprints[index])}
                key={index}
              >
                <li className='model-sizes' key={index}>
                  {size.length < 9 && '\u00A0\u00A0'}
                  {size}
                </li>
                <img className='pdf-logo' src={ExtLink} />
              </div>
            )
          })
        }
      </ul>
      <p className='model-depth'>{`Depth: ${depth}`}</p>
    </div>
  );
}

export default Model;