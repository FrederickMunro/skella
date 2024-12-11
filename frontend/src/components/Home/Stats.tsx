import { useContext, useEffect, useState } from "react";
import EditableComponent from "../Edit/EditableComponent";
import ItemContainer from "../ItemContainer";
import { InViewContext } from '../ItemContainer';
import { Item } from "../Edit/EditModal";
import axios from "axios";

interface PageDetail {
  id: string;
  tag: string;
  title: string;
  description: string;
  story: string;
  image: string;
}

interface Props {
  fetch: Function;
  stat: PageDetail;
  tag: string;
}

const Stats = ({ fetch, stat, tag }: Props) => {
  const [currentValue, setCurrentValue] = useState<number>(0);
  const inView = useContext(InViewContext);
  const apiUrl = import.meta.env.VITE_API_URL as string;

  useEffect(() => {
    if(inView) {
      let animationFrame: number;
      const duration = 1000; // total animation time in ms
      const startTime = performance.now();

      // Cubic ease-out easing function
      const easeOut = (t: number): number => 1 - Math.pow(1 - t, 3);

      const animate = (time: DOMHighResTimeStamp) => {
        const elapsedTime = time - startTime;
        const progress = Math.min(elapsedTime / duration, 1); // Normalize to [0, 1]
        const easedProgress = easeOut(progress);
        const newValue = Math.floor(easedProgress * parseInt(stat.title));

        setCurrentValue(newValue);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      console.log(inView)

      return () => cancelAnimationFrame(animationFrame); // Cleanup on unmount
    }
  }, [inView, stat.title]);

  const [pageDetail, setPageDetail] = useState<PageDetail>({
    id: stat.id,
    tag: stat.tag,
    title: stat.title,
    description: stat.description,
    image: stat.image,
    story: stat.story
  });

  const items: Item[] = [
    {
      label: 'Number',
      type: 'input',
      placeholder: '',
      value: pageDetail.title,
      setValue: (title: string) => setPageDetail(prev => ({ ...prev, title })),
    },
    {
      label: 'Symbol',
      type: 'input',
      placeholder: '',
      value: pageDetail.description,
      setValue: (description: string) => setPageDetail(prev => ({ ...prev, description })),
    },
    {
      label: 'Text',
      type: 'input',
      placeholder: '',
      value: pageDetail.story,
      setValue: (story: string) => setPageDetail(prev => ({ ...prev, story })),
    },
  ]
  
  const submit = async () => {
    console.log(pageDetail.id)
    const formData = new FormData();
    formData.append('id', pageDetail.id);
    formData.append('tag', pageDetail.tag);
    formData.append('title', pageDetail.title);
    formData.append('description', pageDetail.description);
    formData.append('story', pageDetail.story);
  
    if (pageDetail.image) {
        formData.append('image', pageDetail.image);
    }
  
    for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }
  
    try {
        const res = await axios.put(`${apiUrl}/modifyblogdetails`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(res.data);
        await fetch();
    } catch (err: any) {
        console.error(err);
    }
  };

  return(
    <EditableComponent items={items} submit={submit}>
      <div className='stat-container'>
        <div className='stat-number-container'>
          <p className='stat-number'>{currentValue}</p>
          <p className='stat-symbol'>{stat.description}</p>
        </div>
        <p className='stat-text'>{stat.story}</p>
      </div>
    </EditableComponent>
  );
}

export default Stats;