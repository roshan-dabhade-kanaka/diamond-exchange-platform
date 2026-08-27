import octahedron from "@/assets/rough/rough-octahedron.png";
import macle from "@/assets/rough/rough-macle.png";
import dodecahedron from "@/assets/rough/rough-dodecahedron.png";
import cube from "@/assets/rough/rough-cube.png";
import cleavage from "@/assets/rough/rough-cleavage.png";
import irregular from "@/assets/rough/rough-irregular.png";
import roughHero from "@/assets/rough/rough-hero.jpg";
import roughSalon from "@/assets/rough/rough-salon.jpg";
import roughParcel from "@/assets/rough/rough-parcel.jpg";
import roughInspection from "@/assets/rough/rough-inspection.jpg";
import roughBacklit from "@/assets/rough/rough-backlit.jpg";

/** Natural crystal forms of rough diamond — the trade's equivalent of "shape". */
export const roughForms = [
  { name: "Octahedron", image: octahedron },
  { name: "Macle", image: macle },
  { name: "Dodecahedron", image: dodecahedron },
  { name: "Cube", image: cube },
  { name: "Cleavage", image: cleavage },
  { name: "Irregular", image: irregular },
] as const;

export const roughImages = {
  hero: roughHero,
  salon: roughSalon,
  parcel: roughParcel,
  inspection: roughInspection,
  backlit: roughBacklit,
};
