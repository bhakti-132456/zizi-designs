import React from 'react';
import { products, getProductBySlug } from '../data/products';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface FullCollectionProps {
  onNavigateProduct?: (slug: string) => void;
}

// Section Configuration: Backgrounds, Alignment, and Theme
const SECTION_CONFIG: Record<string, {
  desktop: string;
  mobile: string;
  alignment: 'left' | 'right';
  theme: 'dark' | 'light';
}> = {
  'dior-eloise': {
    desktop: '/zizi-webp/eloise.webp',
    mobile: '/zizi-webp/eloise-mobile.webp',
    alignment: 'left',
    theme: 'dark'
  },
  'fendi-vittoria': {
    desktop: '/zizi-webp/vittoria.webp',
    mobile: '/zizi-webp/vittoria-mobile.webp',
    alignment: 'right',
    theme: 'light'
  },
  'lv-aurele': {
    desktop: '/zizi-webp/aurele.webp',
    mobile: '/zizi-webp/aurele-mobile.webp',
    alignment: 'left',
    theme: 'dark'
  },
  'lv-benoit': {
    desktop: '/zizi-webp/benoit.webp',
    mobile: '/zizi-webp/benoit-mobile.webp',
    alignment: 'right',
    theme: 'dark'
  },
  'hermes-henrietta': {
    desktop: '/zizi-webp/henrietta.webp',
    mobile: '/zizi-webp/henrietta-mobile.webp',
    alignment: 'right',
    theme: 'light'
  },
  'harrods-william': {
    desktop: '/zizi-webp/william.webp',
    mobile: '/zizi-webp/william-mobile.webp',
    alignment: 'left',
    theme: 'light'
  },
  'fortnum-reginald': {
    desktop: '/zizi-webp/reginald.webp',
    mobile: '/zizi-webp/reginald-mobile.webp',
    alignment: 'right',
    theme: 'light'
  }
};

// Product descriptions for editorial feel
const PRODUCT_DESCRIPTIONS: Record<string, string> = {
  'dior-eloise': 'A sculptural homage to Parisian elegance, rendered in signature Toile de Jouy.',
  'fendi-vittoria': 'Bold geometry meets Italian craftsmanship in verdant monogram.',
  'lv-aurele': 'The quiet confidence of Maison heritage, elevated in gold.',
  'lv-benoit': 'A statement of refined luxury, accented with timeless marquetry.',
  'hermes-henrietta': 'The spirit of the saddle, reimagined for the modern collector.',
  'harrods-william': 'British elegance, distilled into an iconic silhouette.',
  'fortnum-reginald': 'London heritage embodied in the crown jewel of the collection.'
};

// Animation variants for staggered reveals
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

// Slide from side animation variants
const slideFromLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const slideFromRight = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const FullCollection: React.FC<FullCollectionProps> = ({ onNavigateProduct }) => {
  const { addItem } = useCart();

  const handleNavigate = (slug: string) => {
    if (onNavigateProduct) onNavigateProduct(slug);
  };

  const handleAddToCart = (e: React.MouseEvent, slug: string) => {
    e.stopPropagation();
    const productData = getProductBySlug(slug);
    if (productData) {
      const priceNumber = parseInt(productData.price.replace(/[^0-9]/g, ''), 10);
      addItem({
        id: productData.id.toString(),
        name: productData.title,
        price: priceNumber,
        image: productData.images[0],
        quantity: 1
      });
    }
  };

  return (
    <div className="bg-black relative">

      {/* === HERO SECTION: COLLECTION === */}
      <motion.section
        className="relative h-[100dvh] w-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0">
          <img
            src="/zizi-webp/collection_hero_bg_symbolic_turtle_16x9.webp"
            alt="Collection"
            className="w-full h-full object-cover opacity-90"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </div>
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-white text-center px-6">
          <motion.p
            className="text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-8 text-white/90 drop-shadow-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            The Complete Archive
          </motion.p>
          <motion.h1
            className="text-[12vw] md:text-[15vw] font-serif leading-none tracking-tighter text-white drop-shadow-2xl"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            COLLECTION
          </motion.h1>
          <motion.div
            className="absolute bottom-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <ArrowDown className="text-white/70 w-8 h-8 animate-bounce" />
          </motion.div>
        </div>
      </motion.section>

      {/* === PRODUCT SECTIONS - Card Scroll with Parallax === */}
      {products.map((product, index) => {
        const description = PRODUCT_DESCRIPTIONS[product.slug] || 'A masterpiece of craftsmanship.';
        const config = SECTION_CONFIG[product.slug];
        const isRightAligned = config?.alignment === 'right';
        const isLightMode = config?.theme === 'light';
        const textColorClass = isLightMode ? 'text-black' : 'text-white';

        // Alternate animation direction for visual interest
        const slideVariant = isRightAligned ? slideFromRight : slideFromLeft;

        return (
          <motion.section
            key={product.id}
            className="relative min-h-[100dvh] w-full overflow-hidden bg-black"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {/* Background Images with Parallax Effect */}
            <motion.div
              className="absolute inset-0 z-0 overflow-hidden"
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {config && (
                <>
                  <motion.img
                    src={config.desktop}
                    alt={`${product.title} Background`}
                    className="hidden md:block w-full h-full object-cover origin-center"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.img
                    src={config.mobile}
                    alt={`${product.title} Background`}
                    className="block md:hidden w-full h-full object-cover object-top origin-top"
                  />
                </>
              )}
            </motion.div>

            {/* Content Layout */}
            <div className={`relative z-10 w-full min-h-[100dvh] flex flex-col md:flex-row p-6 md:p-12 lg:p-16 ${isRightAligned ? 'md:justify-end' : 'md:justify-start'} justify-center`}>

              {/* Text Container - Animate from sides */}
              <motion.div
                className="md:w-1/3 flex flex-col justify-center mt-20 md:mt-0"
                variants={slideVariant}
              >
                <motion.div
                  className="max-w-lg"
                  variants={itemVariants}
                >
                  <motion.h2
                    className={`text-5xl md:text-6xl lg:text-7xl font-serif mb-4 leading-[0.9] ${textColorClass}`}
                    variants={itemVariants}
                  >
                    {product.title}
                  </motion.h2>

                  <motion.p
                    className={`text-2xl md:text-3xl font-serif italic mb-4 ${textColorClass} opacity-80`}
                    variants={itemVariants}
                  >
                    {product.price}
                  </motion.p>

                  <motion.p
                    className={`text-sm md:text-base font-sans leading-relaxed mb-6 max-w-md ${textColorClass} opacity-70`}
                    variants={itemVariants}
                  >
                    {description}
                  </motion.p>

                  <motion.button
                    onClick={() => handleNavigate(product.slug)}
                    className={`block w-fit mb-8 text-[10px] font-bold uppercase tracking-[0.2em] border-b pb-1 transition-all ${isLightMode ? 'border-black/30 hover:border-black text-black' : 'border-white/30 hover:border-white text-white'}`}
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    More Details
                  </motion.button>

                  <motion.div
                    className="flex flex-wrap items-center gap-6"
                    variants={itemVariants}
                  >
                    <motion.button
                      onClick={(e) => handleAddToCart(e, product.slug)}
                      className={`px-8 py-3 text-xs font-bold tracking-[0.15em] uppercase transition-colors rounded-full shadow-lg ${isLightMode ? 'bg-black text-white hover:bg-gray-800' : 'bg-white text-black hover:bg-gray-200'}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Add to Cart
                    </motion.button>
                    <motion.button
                      onClick={() => handleNavigate(product.slug)}
                      className={`transition-colors uppercase text-xs font-bold tracking-[0.15em] flex items-center gap-2 ${textColorClass} hover:opacity-100 opacity-60`}
                      whileHover={{ x: 5 }}
                    >
                      Buy Now <ArrowUpRight className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                </motion.div>
              </motion.div>

            </div>
          </motion.section>
        );
      })}

    </div>
  );
};

export default FullCollection;