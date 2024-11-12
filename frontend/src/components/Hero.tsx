import { motion } from 'framer-motion';
import { Button } from './ui/button';

const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="bg-neutral-400 w-full h-[90vh] flex items-center justify-center p-6 mb-4"
    >
      <div className="flex flex-col gap-6 max-w-2xl ">
         <h1 className='text-4xl font-bold leading-relaxed '>
          Supercharge your restaurant's order, invoices, and management 
        </h1>
        <Button className='max-w-fit'> Get Started for Free</Button>
      </div>
     
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className='w-full h-full bg-neutral-200 rounded-md px-6'
      />
    </motion.div>
  );
};

export default Hero