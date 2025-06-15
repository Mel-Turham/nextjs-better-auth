import { Button } from '@/components/ui/button';
import HeroVideoDialog from './hero-video-dialog';

export default function Hero() {
  return (
    <section className='pb-20 pt-36 md:pb-32 md:pt-48'>
      <div className='container mx-auto max-w-4xl sm:px-6 lg:px-8 text-center flex flex-col items-center '>
        <p className='text-lg text-muted-foreground'>
          Smart email campaign builder, made for Developers
        </p>
        <h1 className='mt-3 text-4xl tracking-tighter font-bold md:text-7xl'>
          Turn your visitors into profitable
          <span className='relative inline-flex sm:inline'>
            <span className='absolute inset-0 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg opacity-30'></span>
            <span className='relative'> customers</span>
          </span>
        </h1>

        <div className='flex flex-col items-center mt-8 space-y-4 sm:flex-row sm:space-x-5 sm:space-y-0'>
          <Button className='text-lg px-7 py-7'>Start exploring</Button>
        </div>

        <p className='mt-8 text-base text-muted-foreground'>
          60 Days free trial · No credit card required
        </p>
      </div>
      <div className='mt-12 container'>
        <div className='relative'>
          <div className='absolute inset-0 h-2/3'></div>
          <div className='relative mx-auto lg:max-w-6xl z-10'>
            {/* <div className="rounded-xl md:bg-muted/70 md:p-3.5 md:ring-1 md:ring-inset md:ring-border">
            <div className="relative aspect-video overflow-hidden rounded-xl border md:rounded-lg">
              <img
                alt="preview landing"
                src="/dummy-image.svg"
              />
            </div>
          </div> */}
            <HeroVideoDialog
              className='block'
              animationStyle='from-center'
              videoSrc='https://www.youtube.com/embed/kpy6QEAuLJw?si=4rb-zSdDkVK9qxxb'
              thumbnailSrc='https://starterkitpro.com/opengraph-image.png'
              thumbnailAlt='Hero Video'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
