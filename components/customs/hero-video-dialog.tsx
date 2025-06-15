'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, XIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface HeroVideoDialogProps {
  animationStyle?: keyof typeof animationVariants;
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt?: string;
  className?: string;
}

const animationVariants = {
  'from-bottom': {
    initial: { y: '120%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '120%', opacity: 0 },
  },
  'from-center': {
    initial: { scale: 0.3, opacity: 0, rotate: -10 },
    animate: { scale: 1, opacity: 1, rotate: 0 },
    exit: { scale: 0.3, opacity: 0, rotate: 10 },
  },
  'from-top': {
    initial: { y: '-120%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '-120%', opacity: 0 },
  },
  'from-left': {
    initial: { x: '-120%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-120%', opacity: 0 },
  },
  'from-right': {
    initial: { x: '120%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '120%', opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  'top-in-bottom-out': {
    initial: { y: '-120%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '120%', opacity: 0 },
  },
  'left-in-right-out': {
    initial: { x: '-120%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '120%', opacity: 0 },
  },
};

const playButtonVariants = {
  initial: { scale: 1, rotate: 0 },
  hover: { scale: 1.15, rotate: [0, -5, 5, 0], transition: { duration: 0.6 } },
};

const HeroVideoDialog: React.FC<HeroVideoDialogProps> = ({
  animationStyle = 'from-center',
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = 'Video thumbnail',
  className,
}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const selectedAnimation = animationVariants[animationStyle];

  return (
    <div className={cn('relative', className)}>
      {/* Thumbnail with no hover animation on the image */}
      <div
        className='relative cursor-pointer group overflow-hidden'
        onClick={() => setIsVideoOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={thumbnailSrc}
          alt={thumbnailAlt}
          width={1920}
          height={1080}
          className='w-full transition-all duration-200 group-hover:brightness-[0.8] ease-out rounded-md shadow-lg border'
        />
        {/* Play button animates on hover over the entire image */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <motion.div
            variants={playButtonVariants}
            animate={isHovered ? 'hover' : 'initial'}
            className='p-4 rounded-full bg-gradient-to-r from-primary to-secondary shadow-[0_0_20px_rgba(59,130,246,0.6)]'
          >
            <Play
              className='w-10 h-10 text-white'
              fill='currentColor'
              style={{ filter: 'drop-shadow(0 0 10px rgba(59,130,246,0.8))' }}
            />
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsVideoOpen(false)}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary to-secondary bg-opacity-75 backdrop-blur-lg'
          >
            <motion.div
              {...selectedAnimation}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className='relative w-full max-w-4xl aspect-video mx-4 md:mx-0 rounded-xl border-4 border-dashed border-primary shadow-2xl'
            >
              {/* Redesigned Close Button */}
              <motion.button
                whileHover={{ scale: 1.2, rotate: [0, 15, -15, 0] }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsVideoOpen(false);
                }}
                className='absolute -top-10 right-0 text-primary text-2xl bg-muted/70 ring-2 ring-primary backdrop-blur-sm rounded-full p-3 z-10'
              >
                <XIcon className='w-6 h-6' />
              </motion.button>
              <div className='relative w-full h-full rounded-xl overflow-hidden'>
                <iframe
                  src={videoSrc}
                  className='w-full h-full rounded-xl'
                  allowFullScreen
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                ></iframe>
                {/* Animated Gradient Overlay */}
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className='absolute inset-0 bg-gradient-to-r from-transparent via-muted/10 to-transparent pointer-events-none'
                ></motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroVideoDialog;
