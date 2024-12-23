import { motion } from 'framer-motion';
import { ArrowRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { HeroIllustration } from '@/components/illustrations/HeroIllustration';
import { AnimatedTitle } from '@/components/AnimatedTitle';

interface HomeProps {
  onEnterApp: () => void;
}

export default function Home({ onEnterApp }: HomeProps) {
  const { openAuthDialog } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <section className="container mx-auto px-4 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-black">
              List your firm to{' '}
              <AnimatedTitle />
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Join the Premier Platform for Accounting Firms and Future Accountants. 
              Sign up now and shape the future of accounting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => openAuthDialog()}
                className="bg-black hover:bg-black/90 text-white"
              >
                Connect Your Firm
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={onEnterApp}
              >
                Find Accountants
                <Users className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <HeroIllustration />
          </motion.div>
        </div>
      </section>
    </div>
  );
}