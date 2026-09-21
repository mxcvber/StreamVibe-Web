import { DeviceCard } from '@/components/home/devices/device-card'
import { Container } from '@/components/layout/container'
import { SectionHeading } from '@/components/layout/section-heading'
import { devices } from '@/data/devices'

export function DevicesSection() {
  return (
    <section id='devices'>
      <Container className='flex flex-col gap-section-mobile lg:gap-section-laptop 2xl:gap-section-desktop'>
        <SectionHeading
          className='lg:pr-37.5 2xl:pr-75'
          titleClassName='max-lg:text-20'
          title='We Provide you streaming experience across various devices.'
          description='With StreamVibe, you can enjoy your favorite movies anytime, anywhere. Our platform is designed to be compatible with a wide range of devices, ensuring that you never miss a moment of entertainment.'
        />
        <ul className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:gap-7.5'>
          {devices.map((device) => (
            <li key={device.name}>
              <DeviceCard device={device} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
