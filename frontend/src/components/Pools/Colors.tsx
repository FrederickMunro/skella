import { useRef, useState } from "react";
import ImageSplit from "./ImageSplit";
import axios from "axios";
import { useEffect } from "react";
import EditModal from "../Edit/EditModal";

interface Pool {
    id: string;
    tag: string;
    name: string;
    description: string;
    sizeDepth: [string, string][];
    image: string;
    model: string;
    pdf: string;
}

interface newPool {
  tag: string;
  name: string;
  description: string;
  sizeDepth: [string, string][]
  image: string;
  model: string;
  pdf: string;
}

const Colors = () => {
    const tag = 'couleurs-piscines'
    const apiUrl = import.meta.env.VITE_API_URL as string;
    const isAdmin = import.meta.env.VITE_IS_ADMIN === 'true';
  
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
  
    const [pools, setPools] = useState<Pool[]>([]);
    const [newPool, setNewPool] = useState<newPool>({
      name: '',
      tag,
      description: '',
      sizeDepth: [],
      image: '',
      model: '',
      pdf: '',
    });

    const containerRef = useRef<HTMLDivElement | null>(null);

    const scrollLeft = () => {
        if (containerRef.current) {
        containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
        containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };
  
    const fetchPools = async () => {
      try {
        const res = await axios.get<Pool[]>(`${apiUrl}/poolsbytag/${tag}`); 
        setPools(res.data);
        console.log(res.data);
      } catch (err) {
          
      }
    };
  
    const addPoolItems = [
      {
        label: 'Nom',
        type: 'input',
        value: newPool.name,
        placeholder: 'Enter pool name...',
        setValue: (name: string) => setNewPool(prev => ({ ...prev, name }))
      },
      {
        label: 'Description',
        type: 'input',
        value: newPool.description,
        placeholder: 'Enter pool description...',
        setValue: (description: string) => setNewPool(prev => ({ ...prev, description }))
      },
      {
        label: 'Dry Image',
        type: 'image',
        value: newPool.image,
        setValue: (image: string) => setNewPool(prev => ({ ...prev, image }))
      },
      {
        label: 'Water Image',
        type: 'image',
        value: newPool.model,
        setValue: (model: string) => setNewPool(prev => ({ ...prev, model }))
      },
    ]
  
    const submit = async () => {
      const formData = new FormData();
      formData.append('tag', tag);
      formData.append('name', newPool.name);
      formData.append('description', newPool.description);
      if (newPool.sizeDepth) {
        formData.append('sizedepth', JSON.stringify(newPool.sizeDepth));
      }
      if (newPool.image) {
        formData.append('image', newPool.image);
      }
      if (newPool.model) {
        formData.append('model', newPool.model);
      }
  
      try {
        await axios.post(`${apiUrl}/addpool`, formData);
        fetchPools();
        console.log('Successfully updated');
      } catch (err) {
        console.error('Error updating pool', err);
      }
      return;
    }

    const handleScroll = () => {
        if (containerRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      
          setShowLeftArrow(scrollLeft > 0);
          setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
        }
      };
  
    useEffect(() => {
        fetchPools();
        const container = containerRef.current;
        if (container) {
          container.addEventListener("scroll", handleScroll);
          handleScroll(); // Initial check
        }
        return () => {
          if (container) {
            container.removeEventListener("scroll", handleScroll);
          }
        };
    }, [])

    return (
        <div className='colors-full-container'>
            <h2 className='colors-title'>Nos couleurs</h2>
            <div className="carousel-wrapper">
                <button
                    className="carousel-button left"
                    onClick={scrollLeft}
                    style={{ color: showLeftArrow ? "black" : "transparent" }}
                >
                &lt;
                </button>
                <div
                    className="colors-container"
                    ref={containerRef}
                >
                    {pools.map((color, index) => (
                        <ImageSplit key={index} fetch={fetchPools} color={color} />
                    ))}
                </div>
                <button
                    className="carousel-button right"
                    onClick={scrollRight}
                    style={{ color: showRightArrow ? "black" : "transparent" }}
                >
                &gt;
                </button>
            </div>
            <p className='colors-fineprint'>* La collection Fluvia est disponible uniquement en blanc</p>
            {isAdmin && (
                <button
                className="color-add-button"
                onClick={() => setIsModalOpen(true)}
                >
                Add new pool
                </button>
            )}
            {isAdmin && isModalOpen && (
                <EditModal
                items={addPoolItems}
                submit={submit}
                close={() => setIsModalOpen(false)}
                />
            )}
        </div>
      );
}

export default Colors;