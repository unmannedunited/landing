'use client';

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { getImageUrl, getLinkUrl } from "../../../lib/utils";
import SendButton from "../SendButton";
import { useCookieConsent } from "../../../hooks/useCookieConsent";

export default function DownloadModal({ isOpen, onClose, selectedDocument }) {
  const { hasConsent } = useCookieConsent();
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    company: '',
    phone: '',
    email: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar datos guardados del localStorage al montar (solo si hay consentimiento)
  useEffect(() => {
    if (hasConsent()) {
      const savedData = localStorage.getItem('downloadFormData');
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          setFormData(prev => ({ ...prev, ...parsed }));
        } catch (error) {
          console.error('Error parsing saved form data:', error);
        }
      }
    }
  }, [hasConsent]);

  // Prevenir scroll cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      // Guardar la posición actual del scroll
      const savedScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${savedScrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restaurar el scroll cuando se cierra el modal
        const scrollY = savedScrollY;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        
        // Esperar a que el DOM se actualice antes de restaurar el scroll
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            window.scrollTo({
              top: scrollY,
              behavior: 'instant'
            });
          });
        });
      };
    }
  }, [isOpen]);

  // Función para manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Función para validar el formulario
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone is required';
    } else {
      // Validar formato de teléfono (acepta números, espacios, guiones, paréntesis, +)
      const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        errors.phone = 'Invalid phone format';
      }
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.email = 'Invalid email format';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    onClose();
    setFormErrors({});
  };

  // Función para descargar PDF y enviar email
  const handleDownloadPDF = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Guardar datos en localStorage solo si hay consentimiento
      const dataToSave = {
        name: formData.name,
        lastName: formData.lastName,
        company: formData.company,
        phone: formData.phone,
        email: formData.email
      };
      
      if (hasConsent()) {
        localStorage.setItem('downloadFormData', JSON.stringify(dataToSave));
      }

      // Enviar email
      const link = getLinkUrl('/api/download');
      await fetch(link, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userData: dataToSave,
          documentName: selectedDocument.title
        }),
      });

      // Descargar el documento
      const downloadLink = document.createElement('a');
      downloadLink.href = getLinkUrl(selectedDocument.pdf);
      downloadLink.download = selectedDocument.pdf.split('/').pop();
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      // Cerrar el modal
      handleCloseModal();
    } catch (error) {
      console.error('Error downloading document:', error);
      // Aún así, intentar descargar el documento
      const downloadLink = document.createElement('a');
      downloadLink.href = getLinkUrl(selectedDocument.pdf);
      downloadLink.download = selectedDocument.pdf.split('/').pop();
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      handleCloseModal();
    } finally {
      setIsSubmitting(false);
    }
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !selectedDocument || !mounted) return null;

  const modalContent = (
    <>
      {/* Overlay blanco cuando el modal está abierto */}
      <div 
        className="fixed inset-0 opacity-80 bg-white transition-opacity duration-500 ease-out"
        style={{ top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh', zIndex: 2000 }}
        onClick={handleCloseModal}
      />

      {/* Modal */}
      <div 
        className="fixed inset-0 flex items-center justify-center p-12 overflow-y-auto"
        style={{ zIndex: 2001 }}
        onClick={handleCloseModal}
      >
        <div 
          className="relative w-full max-w-[600px] md:max-w-[700px] my-8"
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'linear-gradient(132.3deg, #4C80C0 -11.44%, #174F94 63.2%)',
            border: '1px solid #FFFFFF',
            boxShadow: '18.6489px 20.425px 26.819px -7.10436px rgba(0, 0, 0, 0.25)',
            zIndex: 2002
          }}
        >
          {/* Barra superior */}
          <div className="flex justify-between items-center px-10 md:px-8 py-1">
            <p className="text-white md:text-sm text-xs uppercase font-thabit" style={{ lineHeight: '26px' }}>
              UNMANNED UNITED INC.
            </p>
            <p className="text-white md:text-sm text-xs uppercase font-thabit hidden md:block" style={{ lineHeight: '26px' }}>
              # 001
            </p>
          </div>
          <div className="h-2 border-t border-b border-white border-dashed"></div>

          {/* Contenido del modal */}
          <div className="px-10 md:px-12 py-8">
            {/* Logo centrado */}
            <div className="flex justify-center mb-6">
              <img 
                src={getImageUrl("/about/about-logo.png")} 
                alt="Unmanned United Logo" 
                className="w-20 md:w-20 object-cover" 
              />
            </div>

            {/* Texto de instrucción */}
            <p className="text-white font-bold text-md md:text-base mb-8 font-thabit" style={{ lineHeight: '22px' }}>
              Please fill in your info to download the technical documentation
            </p>

            {/* Formulario */}
            <div className="space-y-4">
              {/* Primera fila: Name, Lastname, Company */}
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 relative mb-4 md:mb-0">
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Name..."
                      style={{ fontFamily: 'var(--font-nunito-sans)' }}
                      className={`w-full px-4 py-3 bg-white border border-blue md:border-r-0 text-blue placeholder-gray-300 text-lg md:text-base focus:outline-none focus:border-white ${formErrors.name ? 'border-red-300' : ''}`}
                    />
                    {!formData.name && (
                      <span className="absolute right-[10px] top-1/3 -translate-y-1/2 text-red-500 pointer-events-none text-lg" style={{ fontFamily: 'var(--font-nunito-sans)' }}>*</span>
                    )}
                  </div>
                  {formErrors.name && (
                    <p className="text-red-300 text-xs mt-1" style={{ fontFamily: 'var(--font-nunito-sans)' }}>{formErrors.name}</p>
                  )}
                </div>
                <div className="flex-1 relative mb-4 md:mb-0">
                  <div className="relative">
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name..."
                      style={{ fontFamily: 'var(--font-nunito-sans)' }}
                      className={`w-full px-4 py-3 bg-white border border-blue md:border-r-0 text-blue placeholder-gray-300 text-lg md:text-base focus:outline-none focus:border-white ${formErrors.lastName ? 'border-red-300' : ''}`}
                    />
                    {!formData.lastName && (
                      <span className="absolute right-[10px] top-1/3 -translate-y-1/2 text-red-500 pointer-events-none text-lg" style={{ fontFamily: 'var(--font-nunito-sans)' }}>*</span>
                    )}
                  </div>
                  {formErrors.lastName && (
                    <p className="text-red-300 text-xs mt-1" style={{ fontFamily: 'var(--font-nunito-sans)' }}>{formErrors.lastName}</p>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Company"
                    style={{ fontFamily: 'var(--font-nunito-sans)' }}
                    className="w-full px-4 py-3 bg-white border border-blue text-blue placeholder-gray-300 text-lg md:text-base focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              {/* Segunda fila: Phone, Email */}
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 relative mb-4 md:mb-0">
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Your phone..."
                      style={{ fontFamily: 'var(--font-nunito-sans)' }}
                      className={`w-full px-4 py-3 bg-white border border-blue md:border-r-0 text-blue placeholder-gray-300 text-lg md:text-base focus:outline-none focus:border-white ${formErrors.phone ? 'border-red-300' : ''}`}
                    />
                    {!formData.phone && (
                      <span className="absolute right-[10px] top-1/3 -translate-y-1/2 text-red-500 pointer-events-none text-lg" style={{ fontFamily: 'var(--font-nunito-sans)' }}>*</span>
                    )}
                  </div>
                  {formErrors.phone && (
                    <p className="text-red-300 text-xs mt-1" style={{ fontFamily: 'var(--font-nunito-sans)' }}>{formErrors.phone}</p>
                  )}
                </div>
                <div className="flex-1 relative">
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your email..."
                      style={{ fontFamily: 'var(--font-nunito-sans)' }}
                      className={`w-full px-4 py-3 bg-white border border-blue text-blue placeholder-gray-300 text-lg md:text-base focus:outline-none focus:border-white ${formErrors.email ? 'border-red-300' : ''}`}
                    />
                    {!formData.email && (
                      <span className="absolute right-[10px] top-1/3 -translate-y-1/2 text-red-500 pointer-events-none text-lg" style={{ fontFamily: 'var(--font-nunito-sans)' }}>*</span>
                    )}
                  </div>
                  {formErrors.email && (
                    <p className="text-red-300 text-xs mt-1" style={{ fontFamily: 'var(--font-nunito-sans)' }}>{formErrors.email}</p>
                  )}
                </div>
              </div>

              {/* Botón de descarga */}
              <div className="flex justify-center mt-8">
                <SendButton 
                  text={isSubmitting ? "PROCESSING..." : "DOWNLOAD"} 
                  className="w-full" 
                  onClick={handleDownloadPDF}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          <div className="h-2 border-t border-white border-dashed"></div>
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
}

