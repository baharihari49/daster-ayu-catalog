export type Tier = 'Premium' | 'Standard';
export type Status = 'Ready' | 'Sold';
export type Model = 'Payung' | 'Kimono' | 'Kelelawar' | 'Lengan Panjang';

export interface Product {
  id: string;
  name: string;
  model: Model;
  tier: Tier;
  price: number;
  status: Status;
  imageUrl: string;
  sizes: string[];
  description: string;
}

export const DUMMY_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Bunga Mawar',
    model: 'Payung',
    tier: 'Premium',
    price: 95000,
    status: 'Ready',
    imageUrl: 'https://images.unsplash.com/photo-1702588209601-6c0b7c0df702?auto=format&fit=crop&q=80&w=400&h=400',
    sizes: ['All Size', 'XL'],
    description: 'Bahan rayon premium yang super sejuk dan jatuh. Motif bunga mawar klasik cocok untuk bersantai seharian.'
  },
  {
    id: '2',
    name: 'Batik Pekalongan',
    model: 'Kimono',
    tier: 'Premium',
    price: 110000,
    status: 'Ready',
    imageUrl: 'https://images.unsplash.com/photo-1761516659902-2994696b362e?auto=format&fit=crop&q=80&w=400&h=400',
    sizes: ['M', 'L', 'XL'],
    description: 'Batik cap asli Pekalongan dengan pewarnaan alami. Ada saku di kanan dan kiri.'
  },
  {
    id: '3',
    name: 'Daun Tropis',
    model: 'Kelelawar',
    tier: 'Standard',
    price: 65000,
    status: 'Ready',
    imageUrl: 'https://images.unsplash.com/photo-1617173945092-1c6622e5b651?auto=format&fit=crop&q=80&w=400&h=400',
    sizes: ['All Size'],
    description: 'Potongan longgar ala kelelawar, leluasa bergerak. Motif daun tropis bikin suasana jadi sejuk.'
  },
  {
    id: '4',
    name: 'Polkadot Pastel',
    model: 'Payung',
    tier: 'Standard',
    price: 55000,
    status: 'Sold',
    imageUrl: 'https://images.unsplash.com/photo-1536351425844-145ebdae32d8?auto=format&fit=crop&q=80&w=400&h=400',
    sizes: ['All Size'],
    description: 'Manis banget dengan motif polkadot berwarna pastel. Bahan katun rayon standar yang nyaman.'
  },
  {
    id: '5',
    name: 'Bunga Melati',
    model: 'Lengan Panjang',
    tier: 'Premium',
    price: 105000,
    status: 'Ready',
    imageUrl: 'https://images.unsplash.com/photo-1685467367532-d5473a46ad1b?auto=format&fit=crop&q=80&w=400&h=400',
    sizes: ['M', 'L', 'XL'],
    description: 'Model lengan panjang dengan kancing depan penuh, busui friendly. Motif bunga melati yang anggun.'
  },
  {
    id: '6',
    name: 'Garis Salur',
    model: 'Kimono',
    tier: 'Standard',
    price: 70000,
    status: 'Ready',
    imageUrl: 'https://images.unsplash.com/photo-1762111908716-4e42d554e9ce?auto=format&fit=crop&q=80&w=400&h=400',
    sizes: ['All Size'],
    description: 'Motif salur vertikal memberi kesan lebih ramping. Bahan jatuh dan anti kusut.'
  },
  {
    id: '7',
    name: 'Floral Vintage',
    model: 'Payung',
    tier: 'Premium',
    price: 95000,
    status: 'Sold',
    imageUrl: 'https://images.unsplash.com/photo-1702588209630-6822195552ca?auto=format&fit=crop&q=80&w=400&h=400',
    sizes: ['M', 'L'],
    description: 'Bunga-bunga vintage yang ngingetin sama daster nenek, tapi versi lebih modern dan bahan premium.'
  },
  {
    id: '8',
    name: 'Anggrek Ungu',
    model: 'Kelelawar',
    tier: 'Standard',
    price: 65000,
    status: 'Ready',
    imageUrl: 'https://images.unsplash.com/photo-1727771317219-1dd7e39d1b4c?auto=format&fit=crop&q=80&w=400&h=400',
    sizes: ['All Size'],
    description: 'Daster kelelawar super leluasa warna ungu anggrek yang manis. Nyaman banget buat rebahan cantik.'
  },
  {
    id: '9',
    name: 'Kembang Sepatu',
    model: 'Lengan Panjang',
    tier: 'Standard',
    price: 75000,
    status: 'Ready',
    imageUrl: 'https://images.unsplash.com/photo-1502368188434-0d1ff692629f?auto=format&fit=crop&q=80&w=400&h=400',
    sizes: ['L', 'XL'],
    description: 'Nyaman dipakai untuk cuaca agak dingin atau bagi yang berhijab. Motif kembang sepatu besar yang cerah.'
  },
  {
    id: '10',
    name: 'Daun Sirih',
    model: 'Kimono',
    tier: 'Premium',
    price: 110000,
    status: 'Sold',
    imageUrl: 'https://images.unsplash.com/photo-1710324395443-1383f0348ba7?auto=format&fit=crop&q=80&w=400&h=400',
    sizes: ['All Size'],
    description: 'Bahan rayon viscose premium, daster kerah kimono dengan tali di pinggang.'
  },
  {
    id: '11',
    name: 'Motif Lawasan',
    model: 'Payung',
    tier: 'Standard',
    price: 55000,
    status: 'Ready',
    imageUrl: 'https://images.unsplash.com/photo-1762111908723-bad60c26415f?auto=format&fit=crop&q=80&w=400&h=400',
    sizes: ['All Size'],
    description: 'Motif tradisional yang selalu jadi favorit. Simpel, adem, dan murah meriah.'
  },
  {
    id: '12',
    name: 'Pucuk Rebung',
    model: 'Kelelawar',
    tier: 'Premium',
    price: 105000,
    status: 'Ready',
    imageUrl: 'https://images.unsplash.com/photo-1675765765869-dcf7da360fd1?auto=format&fit=crop&q=80&w=400&h=400',
    sizes: ['All Size'],
    description: 'Terinspirasi dari tenun tradisional, dicetak di atas bahan rayon twill yang tebal tapi super sejuk.'
  },
  {
    id: '13',
    name: 'Kupu-kupu',
    model: 'Kimono',
    tier: 'Standard',
    price: 70000,
    status: 'Ready',
    imageUrl: 'https://images.unsplash.com/photo-1599065157038-f1e69ecab3a1?auto=format&fit=crop&q=80&w=400&h=400',
    sizes: ['M', 'L'],
    description: 'Motif kupu-kupu lucu bertebaran di seluruh bahan. Potongan kimono yang santai.'
  },
  {
    id: '14',
    name: 'Mawar Tosca',
    model: 'Payung',
    tier: 'Premium',
    price: 95000,
    status: 'Sold',
    imageUrl: 'https://images.unsplash.com/photo-1779383921773-4bdd4df967da?auto=format&fit=crop&q=80&w=400&h=400',
    sizes: ['XL'],
    description: 'Warna dasar tosca segar dengan taburan mawar putih. Langsung habis dalam hitungan jam.'
  },
  {
    id: '15',
    name: 'Tulip Merah',
    model: 'Lengan Panjang',
    tier: 'Standard',
    price: 75000,
    status: 'Ready',
    imageUrl: 'https://images.unsplash.com/photo-1775530031180-b5e2dd2968f0?auto=format&fit=crop&q=80&w=400&h=400',
    sizes: ['M', 'L', 'XL'],
    description: 'Katun rayon standar yang nyaman dan busui friendly berkat ritsleting di bagian dada.'
  },
  {
    id: '16',
    name: 'Awan Senja',
    model: 'Kelelawar',
    tier: 'Premium',
    price: 105000,
    status: 'Ready',
    imageUrl: 'https://images.unsplash.com/photo-1741918073752-6b4169093123?auto=format&fit=crop&q=80&w=400&h=400',
    sizes: ['All Size'],
    description: 'Warna pastel menyerupai awan senja, gradasi cantik di atas bahan premium. Nyaman banget dipakai tidur.'
  }
];
