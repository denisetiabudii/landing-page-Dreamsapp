// =========================================
// LOGO MITRA
// Logo diterima dari Deft (20 Nov 2026).
// Selama array ini kosong, section mitra tidak ditampilkan di halaman.
//
// Tambah mitra baru: taruh logo di src/assets/images/partners/, lalu
// import dan tambahkan satu entri di array.
// Opsional: url: 'https://situs-lembaga.org' (link ke situs mitra)
// =========================================

import logoJmk from '../assets/images/partners/jmk.webp'
import logoYukPeduli from '../assets/images/partners/yuk-peduli.webp'
import logoSalingBerbagi from '../assets/images/partners/saling-berbagi.webp'
import logoNiatbaik from '../assets/images/partners/niatbaik.webp'
import logoAbata from '../assets/images/partners/abata.webp'
import logoAlFatih from '../assets/images/partners/al-fatih.webp'

export const partners = [
  { name: 'JMK', logo: logoJmk },
  { name: 'Yuk Peduli', logo: logoYukPeduli },
  { name: 'Saling Berbagi', logo: logoSalingBerbagi },
  { name: 'Niatbaik', logo: logoNiatbaik },
  { name: 'Abata Pesantren Tunarungu', logo: logoAbata },
  { name: 'Rumah Singgah Al Fatih', logo: logoAlFatih },
]
