import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoveRightIcon, PhoneCallIcon } from 'lucide-react';
import Balancer from 'react-wrap-balancer';

export function Hero() {
  return (
    <section className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-8 py-20 lg:py-40">
          <div>
            <Badge variant="outline">We&apos;re live!</Badge>
          </div>
          <div className="flex flex-col items-center gap-4">
            <h1 className="max-w-2xl text-center font-regular text-5xl tracking-tighter md:text-7xl">
              <Balancer>S láskou ku kvásku</Balancer>
            </h1>
            <p className="max-w-2xl text-center text-lg text-muted-foreground leading-relaxed tracking-tight md:text-2xl">
              <Balancer>
                V Kromke to vonia čerstvým kváskovým chebom, koláčmi a kávou, a
                teraz sme aj <b className="text-primary">online</b>!
              </Balancer>
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Button size="lg" className="gap-4" variant="outline">
              Jump on a call <PhoneCallIcon className="size-4" />
            </Button>
            <Button size="lg" className="gap-4">
              Sign up here <MoveRightIcon className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
