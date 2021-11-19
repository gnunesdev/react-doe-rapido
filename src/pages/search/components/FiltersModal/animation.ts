export const fadeRight = {
  hidden: {
    x: '100%',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
      type: 'spring',
      damping: 60,
      stiffness: 500,
    },
  },
  exit: {
    x: '100%',
    opacity: 0,
  },
};

export const overlayShow = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
  },
};
