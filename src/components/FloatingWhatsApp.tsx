import React from 'react';

export default function FloatingWhatsApp() {
  const whatsappNumber = '+2347038205015'; // Update with your WhatsApp number
  const message = 'Hello! I would like to inquire about your interior design services.';

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{
        boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)'
      }}
    >
      <img
        src="https://www.vectorlogo.zone/logos/whatsapp/whatsapp-tile.svg"
        alt="WhatsApp"
        className="w-14 h-14 md:w-16 md:h-16"
      />
    </button>
  );
}
