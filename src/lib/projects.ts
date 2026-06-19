export type Project = {
  id: string;
  title: string;
  location: string;
  type: "ic-mekan" | "dis-mekan" | "rental";
  typeLabel: string;
  sector: string;
  area: string;
  pitch: string;
  image: string;
  imageAlt: string;
};

export const projects: Project[] = [
  {
    id: "avm-atrium-istanbul",
    title: "AVM Atrium Dijital Reklam Ekranı",
    location: "İstanbul",
    type: "ic-mekan",
    typeLabel: "İç Mekân",
    sector: "AVM",
    area: "48 m²",
    pitch: "P2.5",
    image: "/images/ic-mekan-avm-led-ekran.png",
    imageAlt: "İstanbul'da bir AVM atriumunda kurulu iç mekân LED reklam ekranı",
  },
  {
    id: "meydan-dis-cephe-ankara",
    title: "Meydan Dış Cephe Video Wall",
    location: "Ankara",
    type: "dis-mekan",
    typeLabel: "Dış Mekân",
    sector: "Belediye",
    area: "120 m²",
    pitch: "P8",
    image: "/images/dis-mekan-led-video-wall.png",
    imageAlt: "Ankara'da bir meydanda dış mekân LED video wall reklam ekranı",
  },
  {
    id: "konser-sahne-izmir",
    title: "Konser Sahnesi Rental LED Kurulumu",
    location: "İzmir",
    type: "rental",
    typeLabel: "Rental",
    sector: "Etkinlik",
    area: "64 m²",
    pitch: "P3.9",
    image: "/images/led-kurulum-teknisyen.png",
    imageAlt: "İzmir'de bir konser sahnesinde rental LED ekran kurulumu",
  },
  {
    id: "vitrin-transparent-bursa",
    title: "Mağaza Vitrini Şeffaf LED Ekran",
    location: "Bursa",
    type: "ic-mekan",
    typeLabel: "İç Mekân",
    sector: "Perakende",
    area: "18 m²",
    pitch: "P3.9",
    image: "/images/led-ekran-3d-illustrasyon.png",
    imageAlt: "Bursa'da bir mağaza vitrininde şeffaf LED ekran uygulaması",
  },
  {
    id: "mobil-reklam-araci",
    title: "Mobil Reklam Aracı LED Ekranları",
    location: "İstanbul",
    type: "dis-mekan",
    typeLabel: "Dış Mekân",
    sector: "Reklam",
    area: "3 × 6 m²",
    pitch: "P5",
    image: "/images/mobil-reklam-led-arac.png",
    imageAlt: "İstanbul'da LED ekranlı mobil reklam aracı uygulaması",
  },
  {
    id: "kontrol-odasi-fine-pitch",
    title: "Kontrol Odası Fine Pitch Video Wall",
    location: "İstanbul",
    type: "ic-mekan",
    typeLabel: "İç Mekân",
    sector: "Kurumsal",
    area: "12 m²",
    pitch: "P1.2",
    image: "/images/led-pixel-makro-rgb.png",
    imageAlt: "Kontrol odası için fine pitch LED video wall yakın çekimi",
  },
  {
    id: "otel-lobi-karsilama",
    title: "Otel Lobi Karşılama Duvarı",
    location: "Antalya",
    type: "ic-mekan",
    typeLabel: "İç Mekân",
    sector: "Otel",
    area: "22 m²",
    pitch: "P1.5",
    image: "/images/led-is-ortakligi.png",
    imageAlt: "Antalya'da bir otel lobisinde LED karşılama duvarı",
  },
  {
    id: "stadyum-skorboard",
    title: "Stadyum Skorboard LED Ekranı",
    location: "İzmir",
    type: "dis-mekan",
    typeLabel: "Dış Mekân",
    sector: "Stadyum",
    area: "90 m²",
    pitch: "P10",
    image: "/images/dis-mekan-led-video-wall.png",
    imageAlt: "İzmir'de bir stadyumda dış mekân skorboard LED ekranı",
  },
];

export const projectFilters = [
  { value: "all", label: "Tümü" },
  { value: "ic-mekan", label: "İç Mekân" },
  { value: "dis-mekan", label: "Dış Mekân" },
  { value: "rental", label: "Rental" },
];
