import './Excavation.css';

import Shovel39 from '../../assets/machines/shovel-39.jpg';
import Shovel80 from '../../assets/machines/shovel-80.jpg';
import Hammer from '../../assets/machines/hammer.jpg';
import Truck from '../../assets/machines/truck.jpg';
import Machine from './Machine';

const Machines = () => {

  const machines = [
    {
      title: '39\" Mini Excavator',
      image: Shovel39,
      text: 'Do you need to access challenging areas? Whether hindered by obstacles ' +
            'like fences or confined spaces, this machine offers a solution. With a ' +
            'width of just 39 inches, it effortlessly navigates tight spots, from ' +
            'gardens to basements. Versatile and adaptable, there are no inaccessible ' +
            'locations for this equipment.',
    },
    {
      title: '80\" Mini Excavator',
      image: Shovel80,
      text: 'For your daily excavation requirements, this machine provides an ' +
            'effective solution. Its versatility enables it to tackle a wide range ' +
            'of digging tasks, while its compact size—6 1/2 feet wide—allows it to ' +
            'maneuver efficiently in tight spaces. Whether for backyard endeavors ' +
            'such as pool and terrace installations or larger-scale projects like ' +
            'driveway construction and home renovations, this machine is well-equipped ' +
            'to meet the demands.',
    },
    {
      title: 'Hydraulic Hammer',
      image: Hammer,
      text: 'For concrete breaking tasks of any size, this tool is ideal. No project ' +
      'is beyond its capabilities, whether large or small. Let us handle the breaking ' +
      'and removal of your concrete with precision and efficiency.',
    },
    {
      title: 'Haul Truck',
      image: Truck,
      text: 'In addition, we provide a range of transportation services, including ' +
            'pick-up and delivery for various materials: soil, stone, asphalt, snow, and waste.',
    },
  ]

  return(
    <>
      {
        machines.map((machine, index) => {
          return(
            <Machine
              title={machine.title}
              image={machine.image}
              text={machine.text}
              key={index}
            />
          )
        })
      }
    </>
  );
}

export default Machines;