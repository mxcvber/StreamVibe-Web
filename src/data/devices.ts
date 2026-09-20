import type { ComponentType, SVGProps } from "react";

import { GamepadIcon } from "@/components/icons/gaming";
import { LaptopIcon } from "@/components/icons/laptop";
import { SmartTvIcon } from "@/components/icons/smart-tv";
import { SmartphoneIcon } from "@/components/icons/smartphone";
import { TabletIcon } from "@/components/icons/tablet";
import { VrHeadsetIcon } from "@/components/icons/vr";

export type Device = {
  name: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

// The design repeats the same body copy on all six cards; kept as-is.
const description =
  "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store";

export const devices: Device[] = [
  { name: "Smartphones", description, icon: SmartphoneIcon },
  { name: "Tablet", description, icon: TabletIcon },
  { name: "Smart TV", description, icon: SmartTvIcon },
  { name: "Laptops", description, icon: LaptopIcon },
  { name: "Gaming Consoles", description, icon: GamepadIcon },
  { name: "VR Headsets", description, icon: VrHeadsetIcon },
];
