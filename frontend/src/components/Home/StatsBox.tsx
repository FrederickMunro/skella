import axios from "axios";
import { useEffect, useState } from "react";
import { Item } from "../Edit/EditModal";
import Stats from "./Stats";
import ItemContainer from "../ItemContainer";

interface PageDetail {
  id: string;
  tag: string;
  title: string;
  description: string;
  story: string;
  image: string;
}

const StatsBox = () => {
  const tag = 'stat';
  const apiUrl = import.meta.env.VITE_API_URL as string;
  const isAdmin = import.meta.env.VITE_IS_ADMIN === 'true';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageDetails, setPageDetails] = useState<PageDetail[]>([]);
  

  const fetchPageDetails = async () => {
    try {
      const res = await axios.get<PageDetail[]>(`${apiUrl}/getblogdetails/${tag}`);
      setPageDetails(res.data);
    } catch (err: any) {
        console.error(err);
    }
  }


  useEffect(() => {
    fetchPageDetails();
  }, []);

  return(
    <>
      {pageDetails.map((stat, index) => {
        return <Stats
          fetch={fetchPageDetails}
          stat={stat}
          tag={tag}
          key={index}
        />
      })}
    </>
  );
}

export default StatsBox;