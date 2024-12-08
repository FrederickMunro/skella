import axios from "axios";
import { useEffect, useState } from "react";
import SoumissionPool from "./SoumissionPool";
import MenuOption from "./MenuOption";
import SoumissionColor from "./SoumissionColor";

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

const Soumission = () => {
  const apiUrl = import.meta.env.VITE_API_URL as string;

  const [pools, setPools] = useState<Pool[]>([]);
  const [selectedPool, setSelectedPool] = useState<Pool | null>(null);
  const [isCollapsedPools, setIsCollapsedPools] = useState(true);
  const [colors, setColors] = useState<Pool[]>([]);
  const [selectedColor, setSelectedColor] = useState<Pool | null>(null);
  const [isCollapsedColors, setIsCollapsedColors] = useState(true);

  const toggleCollapsePools = () => {
    setIsCollapsedPools(!isCollapsedPools);
  };

  const toggleCollapseColors = () => {
    setIsCollapsedColors(!isCollapsedColors);
  };

  const fetchPools = async () => {
    try {
        const resPools = await axios.get<Pool[]>(`${apiUrl}/poolsbytag/piscines-altea`); 
        setPools(resPools.data);
        const resColors = await axios.get<Pool[]>(`${apiUrl}/poolsbytag/couleurs-piscines`); 
        setColors(resColors.data);
    } catch (err) {
        
    }
  };

  useEffect(() => {
    fetchPools();
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    phone: "",
    email: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  const checkOptions = [
    'Térrassement',
    'Pavé-uni',
    'Services de designer',
    'Installation de clôture',
    'Cuisine extérieure',
    'Pergola',
    'Plantation',
    'Fontaine d\'eau',
    'Terrasse de bois',
    'Terrasse en composite',
    'Muret',
    'Systeme d\'irrigation'
  ]

  return(
    <div className='soumission-container skella-light-blue-background'>
      {/* <TitleDesc tag={tag} /> */}
      <div className="form-container">
      <h1 className='soumission-title'>Obtenez une soumission</h1>
        <form className="nice-form" onSubmit={handleSubmit}>
          <h2>Entrez vos informations</h2>

          {/* Name Section */}
          <div className="form-group">
            <label htmlFor="first-name">Nom *</label>
            <div className="flex-row">
              <input
                type="text"
                id="first-name"
                name="firstName"
                placeholder="Prénom"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                id="last-name"
                name="lastName"
                placeholder="Nom"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Address Section */}
          <div className="form-group">
            <label htmlFor="address">Addresse *</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Adresse"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <div className="flex-row">
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Ville"
                value={formData.city}
                onChange={handleChange}
                required
              />
              <select
                id="province"
                name="province"
                value={formData.province}
                onChange={handleChange}
                required
              >
                <option value="">Province</option>
                <option value="QC">Québec</option>
                <option value="ON">Ontario</option>
                {/* Add more provinces here */}
              </select>
              <input
                type="text"
                id="postal-code"
                name="postalCode"
                placeholder="Code postal"
                value={formData.postalCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="form-group">
            <div className="flex-row">
              <div className="flex-column">
                <label htmlFor="phone">Téléphone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Numéro de téléphone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex-column">
                <label htmlFor="email">E-mail *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Adresse courriel"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className='soumission-choix-box' onClick={() => toggleCollapsePools()}>
        {/* <span className={`toggle-icon ${isCollapsed ? 'expanded' : 'collapsed'}`} /> */}
        <h3 className='soumission-choix-piscines'>Choissisez votre modèle</h3>
        {/* <p className='soumission-choix-choix'>{selectedPool && `Modèle: ${selectedPool.name}`}</p> */}
      </div>
      <div  className={`soumission-pools ${isCollapsedPools ? 'collapsed' : 'expanded'}`}>
        {pools.map((pool, index) => {
          return <SoumissionPool setSelectedPool={setSelectedPool} selectedPool={selectedPool} key={index} pool={pool} />
        })}
      </div>

      <div className='soumission-choix-box' onClick={() => toggleCollapseColors()}>
        {/* <span className={`toggle-icon ${isCollapsed ? 'expanded' : 'collapsed'}`} /> */}
        <h3 className='soumission-choix-piscines'>Choissisez votre couleure</h3>
        {/* <p className='soumission-choix-choix'>{selectedPool && `Modèle: ${selectedPool.name}`}</p> */}
      </div>
      <div  className={`soumission-pools ${isCollapsedColors ? 'collapsed' : 'expanded'}`}>
        {colors.map((color, index) => {
          return <SoumissionColor setSelectedPool={setSelectedColor} selectedPool={selectedColor} key={index} color={color} />
        })}
      </div>

      <div className="form-container">
        <h2 className='checkbox-title'>Cochez les services qui vous intéressent</h2>
        <p className='checkbox-disclaimer'>*Les options cochées sont uniquement pour explorer vos besoins et ne constituent pas une offre officielle.</p>
        <div className="checkbox-list">
          {checkOptions.map((option, index) => {
            return <MenuOption title={option} key={index} />
          })}
        </div>
        {/* Submit Button */}
        <div className="form-group">
          <button type="submit" className="submit-button">
            Soumettre
          </button>
        </div>
      </div>
    </div>
  );
}

export default Soumission;