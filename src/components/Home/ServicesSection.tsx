import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ServicesSection.module.css';

// Import existing service images
import hairTreatmentImg from '../images/OurServicesImages/FamilyImage.jpeg';
import hairServicesImg from '../images/OurServicesImages/HairService.jpeg';
// import hairSpaImg from '../images/OurServicesImages/Beauty1.jpeg';
import beautyServicesImg from '../images/OurServicesImages/Beauty1.jpeg';
import nailsImg from '../images/OurServicesImages/Nail.jpg';
import makeupImg from '../images/OurServicesImages/makeup.jpeg';

interface ServiceItem {
  id: string;
  title: string;
  image: string;
  link: string;
}

const services: ServiceItem[] = [
  {
    id: 'hair-treatment',
    title: 'Consultation',
    image: hairTreatmentImg,
    link: '/services#hair-treatment',
  },
  {
    id: 'hair-services',
    title: 'Hair',
    image: hairServicesImg,
    link: '/services#hair-services',
  },
  // {
  //   id: 'hair-spa',
  //   title: 'Hair Spa',
  //   image: hairSpaImg,
  //   link: '/services#hair-spa',
  // },
  {
    id: 'beauty-services',
    title: 'Beauty',
    image: beautyServicesImg,
    link: '/services#beauty-services',
  },
  {
    id: 'nails',
    title: 'Nails',
    image: nailsImg,
    link: '/services#nails',
  },
  {
    id: 'makeup',
    title: 'Makeup',
    image: makeupImg,
    link: '/services#makeup',
  }
];

const ServicesSection: React.FC = () => {
  const [activeService, setActiveService] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleServiceClick = (link: string) => {
    navigate(link);
  };

  return (
    <section className={styles.servicesSection}>
      <div className={styles.servicesGrid}>
        {services.map((service) => (
          <div
            key={service.id}
            className={`${styles.serviceItem} ${
              activeService === service.id ? styles.active : ''
            }`}
            style={{
              backgroundImage: `url(${service.image})`,
            }}
            onMouseEnter={() => setActiveService(service.id)}
            onMouseLeave={() => setActiveService(null)}
            onClick={() => handleServiceClick(service.link)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleServiceClick(service.link)}
          >
            <div className={styles.serviceTitleContainer}>
              <div className={styles.serviceTitle}>{service.title}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
