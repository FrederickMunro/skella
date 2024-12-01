import axios from "axios";
import { useEffect, useState } from "react";
import SoumissionPool from "./SoumissionPool";

interface Pool {
  id: string;
  tag: string;
  name: string;
  description: string;
  sizeDepth: [string, string][];
  image: string;
  model: string;
}

const Soumission = () => {
  const tag = 'soumission';

  const apiUrl = import.meta.env.VITE_API_URL as string;
  const isAdmin = import.meta.env.VITE_IS_ADMIN === 'true';

  const [pools, setPools] = useState<Pool[]>([]);
  const [selectedPool, setSelectedPool] = useState<Pool | null>(null)
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const fetchPools = async () => {
    try {
        const res = await axios.get<Pool[]>(`${apiUrl}/allpools`); 
        setPools(res.data);
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

  const handleChange = (e) => {
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

  return(
    <div className='soumission-container skella-light-blue-background'>
      {/* <TitleDesc tag={tag} /> */}
      <div className="form-container">
        <form className="nice-form" onSubmit={handleSubmit}>
          <h2>Obtenez une soumission</h2>

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

          {/* Submit Button */}
          <div className="form-group">
            <button type="submit" className="submit-button">
              Soumettre
            </button>
          </div>
        </form>
      </div>
      <div className='soumission-choix-box' onClick={() => toggleCollapse()}>
        <span className={`toggle-icon ${isCollapsed ? 'expanded' : 'collapsed'}`} />
        <h3 className='soumission-choix-piscines'>Choissisez votre modèle</h3>
        <p className='soumission-choix-choix'>{selectedPool && `Modèle: ${selectedPool.name}`}</p>
      </div>
      <div  className={`soumission-pools ${isCollapsed ? 'collapsed' : 'expanded'}`}>
        {pools.map((pool, index) => {
          return <SoumissionPool setSelectedPool={setSelectedPool} selectedPool={selectedPool} key={index} pool={pool} />
        })}
      </div>
    </div>
  );
}

export default Soumission;