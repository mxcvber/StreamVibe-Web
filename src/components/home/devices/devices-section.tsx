import { DeviceCard } from '@/components/home/devices/device-card'
import { Container } from '@/components/layout/container'
import { SectionHeading } from '@/components/layout/section-heading'
import { devices } from '@/data/devices'

export function DevicesSection() {
  return (
    <section id='devices'>
      <Container className='flex flex-col gap-20'>
        <SectionHeading
          className='pr-75'
          title='We Provide you streaming experience across various devices.'
          description='With StreamVibe, you can enjoy your favorite movies anytime, anywhere. Our platform is designed to be compatible with a wide range of devices, ensuring that you never miss a moment of entertainment.'
        />
        <ul className='grid grid-cols-3 gap-7.5'>
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
