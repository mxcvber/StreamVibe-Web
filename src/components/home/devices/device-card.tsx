import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import type { Device } from "@/data/devices";

/**
 * The red glow in the top-right corner is a Figma gradient whose export was
 * garbled (stops at 208% and 41%); this is a visual approximation of the
 * rendered design rather than the exported values.
 */
export function DeviceCard({ device }: { device: Device }) {
  const Icon = device.icon;

  return (
    <Card className="gap-5 bg-black-06 bg-[linear-gradient(206deg,rgba(229,0,0,0.14)_0%,rgba(229,0,0,0)_40%)] p-5.75 lg:gap-6 lg:p-9.75 2xl:gap-7.5 2xl:p-12.25">
      <div className="flex items-center gap-2.5 lg:gap-3 2xl:gap-4">
        <div className="rounded-lg border border-black-12 bg-background p-2.25 lg:p-2.75 2xl:p-3.75">
          <Icon className="size-6 text-red-45 lg:size-7.5 2xl:size-10" />
        </div>
        <CardTitle>{device.name}</CardTitle>
      </div>
      <CardDescription>{device.description}</CardDescription>
    </Card>
  );
}
