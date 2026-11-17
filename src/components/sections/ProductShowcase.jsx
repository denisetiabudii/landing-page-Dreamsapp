import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'

import {
  rfmHealthComparison,
  rfmSegmentComparison,
  rfmDistributionComparison,
  rfmHeatmapMatrix,
  donorProfileDetail,
  donationProgramAnalytics,
  buktiDonasi,
} from '../../assets/assets'

// =========================================
// DATA TAMPILAN PRODUK
// =========================================

const showcaseItems = [
  {
    category: 'MANAJEMEN DONATUR',
    title: 'Perbandingan Kesehatan Donatur',
    description:
      'Pantau kesehatan database donatur melalui analisis RFM untuk memahami kondisi, loyalitas, dan potensi donatur.',
    image: rfmHealthComparison,
    imageAlt: 'Dasbor perbandingan kesehatan donatur DREAMS',
    footerLabel: 'ANALISIS KESEHATAN DONATUR',
    accent: '#087bee',
    tint: '#e5f2ff',
  },
  {
    category: 'SEGMENTASI DONATUR',
    title: 'Perbandingan Segmen RFM',
    description:
      'Kelompokkan donatur berdasarkan perilaku donasi untuk menentukan pendekatan komunikasi yang lebih relevan dan tepat sasaran.',
    image: rfmSegmentComparison,
    imageAlt: 'Dasbor perbandingan segmen RFM DREAMS',
    footerLabel: 'SEGMENTASI DONATUR',
    accent: '#7856d8',
    tint: '#f0eaff',
  },
  {
    category: 'ANALITIK DONATUR',
    title: 'Distribusi Donasi',
    description:
      'Analisis distribusi donasi untuk memperoleh gambaran kontribusi donatur dan perkembangan penggalangan dana.',
    image: rfmDistributionComparison,
    imageAlt: 'Dasbor distribusi donasi DREAMS',
    footerLabel: 'DISTRIBUSI DONASI',
    accent: '#00a6a6',
    tint: '#e2f8f5',
  },
  {
    category: 'VISUALISASI DATA',
    title: 'Matriks Peta Panas RFM',
    description:
      'Visualisasikan segmentasi donatur melalui matriks yang memudahkan identifikasi pola dan perilaku donasi.',
    image: rfmHeatmapMatrix,
    imageAlt: 'Dasbor matriks peta panas RFM DREAMS',
    footerLabel: 'VISUALISASI DATA RFM',
    accent: '#3975d5',
    tint: '#e8efff',
  },
  {
    category: 'WAWASAN DONATUR',
    title: 'Detail Profil Donatur',
    description:
      'Kenali profil dan riwayat donatur melalui informasi yang terstruktur untuk mendukung pengelolaan hubungan donatur.',
    image: donorProfileDetail,
    imageAlt: 'Dasbor detail profil donatur DREAMS',
    footerLabel: 'PROFIL DONATUR',
    accent: '#d16b9c',
    tint: '#fff0f6',
  },
  {
    category: 'ANALITIK PROGRAM',
    title: 'Analitik Program Donasi',
    description:
      'Dapatkan wawasan mengenai kinerja program donasi untuk membantu organisasi mengevaluasi program dan mengambil keputusan.',
    image: donationProgramAnalytics,
    imageAlt: 'Dasbor analitik program donasi DREAMS',
    footerLabel: 'KINERJA PROGRAM',
    accent: '#e39a35',
    tint: '#fff5e5',
  },
  {
    category: 'TRANSPARANSI DONASI',
    title: 'Bukti Donasi Digital',
    description:
      'Buat bukti donasi dengan desain yang dapat disesuaikan dan dihasilkan secara otomatis dalam format PDF sebagai bentuk transparansi serta dokumentasi donasi bagi donatur.',
    image: buktiDonasi,
    imageAlt:
      'Tampilan bukti donasi digital DREAMS yang dapat dicetak dalam format PDF',
    footerLabel: 'BUKTI DONASI • PDF',
    accent: '#278c68',
    tint: '#e6f7ef',
  },
]

// =========================================
// KOMPONEN TAMPILAN PRODUK
// =========================================

// false di server dan saat hydrate, true sesudahnya.
// Dipakai agar salinan kartu untuk animasi loop tidak ikut di HTML prerender.
const subscribeNothing = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

function ProductShowcase() {
  const hasHydrated = useSyncExternalStore(
    subscribeNothing,
    getClientSnapshot,
    getServerSnapshot,
  )

  const viewportRef = useRef(null)
  const trackRef = useRef(null)

  const [isDragging, setIsDragging] = useState(false)
  const [activeItem, setActiveItem] = useState(null)

  const positionRef = useRef(0)
  const animationFrameRef = useRef(null)
  const lastTimeRef = useRef(null)

  const dragRef = useRef({
    startX: 0,
    startPosition: 0,
    pointerId: null,
    moved: false,
  })

  const SPEED = 35

  // =========================================
  // MENDAPATKAN LEBAR GRUP
  // =========================================

  const getGroupWidth = useCallback(() => {
    const track = trackRef.current

    if (!track) return 0

    const firstGroup = track.children[0]

    if (!firstGroup) return 0

    return firstGroup.getBoundingClientRect().width
  }, [])

  // =========================================
  // MENYESUAIKAN POSISI KARUSEL
  // =========================================

  const normalizePosition = useCallback(() => {
    const groupWidth = getGroupWidth()

    if (!groupWidth) return

    positionRef.current =
      ((positionRef.current % groupWidth) + groupWidth) % groupWidth
  }, [getGroupWidth])

  // =========================================
  // MEMPERBARUI POSISI TRACK
  // =========================================

  const updateTrackPosition = useCallback(() => {
    const track = trackRef.current

    if (!track) return

    track.style.transform = `translate3d(${-positionRef.current}px, 0, 0)`
  }, [])

  // =========================================
  // ANIMASI GULIR OTOMATIS
  // =========================================

  useEffect(() => {
    const animate = (timestamp) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp
      }

      const deltaTime = timestamp - lastTimeRef.current

      lastTimeRef.current = timestamp

      if (!isDragging && !activeItem) {
        positionRef.current += (SPEED * deltaTime) / 1000

        normalizePosition()
        updateTrackPosition()
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameRef.current)
      lastTimeRef.current = null
    }
  }, [isDragging, activeItem, normalizePosition, updateTrackPosition])

  // =========================================
  // MENGUNCI GULIR HALAMAN SAAT MODAL TERBUKA
  // =========================================

  useEffect(() => {
    if (!activeItem) return

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [activeItem])

  // =========================================
  // MEMBUKA MODAL
  // =========================================

  const handleOpenModal = useCallback((item) => {
    if (dragRef.current.moved) return

    setActiveItem(item)
  }, [])

  // =========================================
  // MENUTUP MODAL
  // =========================================

  const handleCloseModal = useCallback(() => {
    setActiveItem(null)
  }, [])

  // =========================================
  // MEMULAI DRAG
  // =========================================

  const handleDragStart = useCallback(
    (event) => {
      if (activeItem) return

      if (event.pointerType === 'mouse' && event.button !== 0) {
        return
      }

      dragRef.current = {
        startX: event.clientX,
        startPosition: positionRef.current,
        pointerId: event.pointerId,
        moved: false,
      }

      setIsDragging(true)
    },
    [activeItem],
  )

  // =========================================
  // MENGGERAKKAN KARUSEL SAAT DRAG
  // =========================================

  const handleDragMove = useCallback(
    (event) => {
      const drag = dragRef.current

      if (drag.pointerId !== event.pointerId) {
        return
      }

      const deltaX = event.clientX - drag.startX

      if (Math.abs(deltaX) > 5) {
        drag.moved = true
      }

      positionRef.current = drag.startPosition - deltaX

      normalizePosition()
      updateTrackPosition()
    },
    [normalizePosition, updateTrackPosition],
  )

  // =========================================
  // MENGAKHIRI DRAG
  // =========================================

  const handleDragEnd = useCallback(
    (event) => {
      const drag = dragRef.current

      if (drag.pointerId !== event.pointerId) {
        return
      }

      normalizePosition()
      updateTrackPosition()

      setIsDragging(false)

      dragRef.current = {
        startX: 0,
        startPosition: positionRef.current,
        pointerId: null,
        moved: drag.moved,
      }
    },
    [normalizePosition, updateTrackPosition],
  )

  // =========================================
  // MENCEGAH KLIK SETELAH DRAG
  // =========================================

  const handleClickCapture = useCallback((event) => {
    if (!dragRef.current.moved) return

    event.preventDefault()
    event.stopPropagation()

    dragRef.current.moved = false
  }, [])

  // =========================================
  // MENYESUAIKAN POSISI SAAT RESIZE
  // =========================================

  useEffect(() => {
    const handleResize = () => {
      normalizePosition()
      updateTrackPosition()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [normalizePosition, updateTrackPosition])

  // =========================================
  // MENAMPILKAN KARTU PRODUK
  // =========================================

  const renderShowcaseCard = (item, index, isDuplicate = false) => (
    <article
      className="showcase-item"
      key={`${isDuplicate ? 'duplicate-' : ''}${index}`}
      style={{
        '--card-accent': item.accent,
        '--card-tint': item.tint,
      }}
      onClick={() => {
        if (!isDuplicate) {
          handleOpenModal(item)
        }
      }}
    >
      <div className="showcase-item__content">
        <span className="showcase-item__category">{item.category}</span>

        <h3 className="showcase-item__title">{item.title}</h3>

        <p className="showcase-item__description">{item.description}</p>
      </div>

      <div className="showcase-item__visual">
        <div className="showcase-window">
          <div className="showcase-window__header">
            <div className="showcase-window__dots">
              <span />
              <span />
              <span />
            </div>

            <span className="showcase-window__label">Dasbor DREAMS</span>
          </div>

          <div className="showcase-window__body">
            <img
              className="showcase-window__image"
              src={item.image}
              alt={isDuplicate ? '' : item.imageAlt}
              loading="lazy"
              draggable="false"
            />
          </div>
        </div>
      </div>

      <div className="showcase-item__footer">
        <span className="showcase-item__footer-label">{item.footerLabel}</span>
      </div>
    </article>
  )

  // =========================================
  // TAMPILAN KOMPONEN
  // =========================================

  return (
    <section className="showcase">
      <style>{`
        /* =========================================
           PRODUCT SHOWCASE
        ========================================= */

        .showcase {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 120px 0;
          background: var(--color-white, #ffffff);
        }

        .showcase .showcase__container {
          width: min(calc(100% - 80px), 1200px);
          margin: 0 auto;
        }

        .showcase .showcase__header {
          max-width: 760px;
          margin: 0 auto;
          text-align: center;
        }

        .showcase .showcase__eyebrow {
          display: inline-block;
          margin-bottom: 20px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--color-primary, #087bee);
        }

        .showcase .showcase__title {
          margin: 0;
          font-size: clamp(36px, 4.5vw, 60px);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -1.8px;
          color: var(--color-heading, #102d50);
        }

        .showcase .showcase__description {
          max-width: 620px;
          margin: 24px auto 0;
          font-size: 16px;
          line-height: 1.8;
          color: var(--color-text, #64748b);
        }

        /* =========================================
           CAROUSEL
        ========================================= */

        .showcase .showcase__viewport {
          position: relative;
          width: 100%;
          margin-top: 70px;
          overflow: hidden;
          cursor: grab;
          touch-action: pan-y;
          padding: 56px;
          background: #e8ecf3;
          box-sizing: border-box;
        }

        .showcase .showcase__viewport::before,
        .showcase .showcase__viewport::after {
          content: '';
          position: absolute;
          left: 0;
          width: 100%;
          height: 15px;
          z-index: 5;
          pointer-events: none;
          background: linear-gradient(
            90deg,
            #0649b8 0%,
            #087bee 30%,
            #4fc3e0 50%,
            #087bee 70%,
            #0649b8 100%
          );
          background-size: 200% 100%;
          animation: showcase-border-flow 16s ease-in-out infinite;
        }

        .showcase .showcase__viewport::before {
          top: 0;
        }

        .showcase .showcase__viewport::after {
          bottom: 0;
        }

        @keyframes showcase-border-flow {
          0% {
            background-position: 0% 50%;
          }

          50% {
            background-position: 100% 50%;
          }

          100% {
            background-position: 0% 50%;
          }
        }

        .showcase .showcase__viewport--dragging {
          cursor: grabbing;
        }

        .showcase .showcase__track {
          display: flex;
          align-items: stretch;
          width: max-content;
          will-change: transform;
          transform: translate3d(0, 0, 0);
        }

        .showcase .showcase__group {
          display: flex;
          align-items: stretch;
          flex: 0 0 auto;
          width: max-content;
          gap: 32px;
          padding-right: 32px;
          box-sizing: content-box;
        }

        /* =========================================
           PRODUCT CARD
        ========================================= */

        .showcase .showcase-item {
          --card-accent: #087bee;
          --card-tint: #eaf4ff;

          position: relative;
          display: flex;
          flex-direction: column;
          flex: 0 0 420px;
          width: 420px;
          min-width: 0;
          padding: 28px;
          border: 1px solid
            color-mix(in srgb, var(--card-accent) 22%, white);
          border-radius: 20px;
          background: linear-gradient(
            145deg,
            var(--card-tint) 0%,
            #ffffff 55%,
            color-mix(in srgb, var(--card-accent) 8%, white) 100%
          );
          box-shadow: 0 10px 32px
            color-mix(in srgb, var(--card-accent) 10%, transparent);
          box-sizing: border-box;
          transition:
            border-color 0.3s ease,
            box-shadow 0.3s ease,
            transform 0.3s ease;
        }

        .showcase .showcase-item:hover {
          border-color:
            color-mix(in srgb, var(--card-accent) 40%, white);
          box-shadow: 0 20px 44px
            color-mix(in srgb, var(--card-accent) 18%, transparent);
          transform: translateY(-6px);
        }

        .showcase .showcase-item__content {
          display: flex;
          flex-direction: column;
          min-height: 190px;
        }

        .showcase .showcase-item__category {
          display: inline-block;
          width: fit-content;
          margin-bottom: 16px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--card-accent);
        }

        .showcase .showcase-item__title {
          margin: 0;
          font-size: 25px;
          font-weight: 700;
          line-height: 1.35;
          letter-spacing: -0.5px;
          color: var(--color-heading, #102d50);
        }

        .showcase .showcase-item__description {
          margin: 14px 0 0;
          font-size: 14px;
          line-height: 1.8;
          color: var(--color-text, #64748b);
        }

        .showcase .showcase-item__visual {
          position: relative;
          width: 100%;
          margin-top: 24px;
          padding: 12px;
          border: 1px solid
            color-mix(in srgb, var(--card-accent) 18%, white);
          border-radius: 14px;
          background:
            color-mix(in srgb, var(--card-accent) 8%, white);
          overflow: hidden;
          box-sizing: border-box;
        }

        /* =========================================
           DASHBOARD WINDOW
        ========================================= */

        .showcase .showcase-window {
          position: relative;
          width: 100%;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          background: #ffffff;
          box-shadow: 0 4px 16px rgba(16, 45, 80, 0.06);
          box-sizing: border-box;
        }

        .showcase .showcase-window__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 38px;
          padding: 0 12px;
          border-bottom: 1px solid #e9eef4;
          background: #ffffff;
        }

        .showcase .showcase-window__dots {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .showcase .showcase-window__dots span {
          display: block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #d8e0e8;
        }

        .showcase .showcase-window__dots span:first-child {
          background: #fca5a5;
        }

        .showcase .showcase-window__dots span:nth-child(2) {
          background: #fcd34d;
        }

        .showcase .showcase-window__dots span:nth-child(3) {
          background: #86efac;
        }

        .showcase .showcase-window__label {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.4px;
          color: #94a3b8;
        }

        .showcase .showcase-window__body {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: #ffffff;
        }

        .showcase .showcase-window__image {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
          object-position: center;
          user-select: none;
          -webkit-user-select: none;
          -webkit-user-drag: none;
          pointer-events: none;
        }

        /* =========================================
           CARD FOOTER
        ========================================= */

        .showcase .showcase-item__footer {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-top: 22px;
          padding-top: 18px;
          border-top: 1px solid
            color-mix(in srgb, var(--card-accent) 15%, white);
        }

        .showcase .showcase-item__footer-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 1.2px;
          color: var(--card-accent);
        }

        /* =========================================
           MODAL
        ========================================= */

        .showcase .showcase-modal {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px;
          background: rgba(8, 20, 38, 0.72);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          animation: showcase-modal-fade-in 0.3s ease;
          box-sizing: border-box;
        }

        .showcase .showcase-modal__content {
          position: relative;
          width: 100%;
          max-width: 1100px;
          max-height: 90vh;
          overflow-x: hidden;
          overflow-y: auto;
          padding: 32px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 24px;
          background: #ffffff;
          box-shadow: 0 30px 100px rgba(0, 0, 0, 0.3);
          box-sizing: border-box;
          animation: showcase-modal-scale-in 0.35s ease;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .showcase .showcase-modal__content::-webkit-scrollbar {
          display: none;
        }

        .showcase .showcase-modal__close {
          position: sticky;
          top: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          margin-left: auto;
          margin-bottom: -44px;
          flex-shrink: 0;
          color: #102d50;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 50%;
          cursor: pointer;
          transition:
            background 0.25s ease,
            color 0.25s ease,
            border-color 0.25s ease,
            transform 0.25s ease;
        }

        .showcase .showcase-modal__close svg {
          display: block;
          width: 20px;
          height: 20px;
        }

        .showcase .showcase-modal__close:hover {
          color: #ffffff;
          background: #087bee;
          border-color: #087bee;
          transform: rotate(90deg);
        }

        .showcase .showcase-modal__close:active {
          transform: scale(0.92);
        }

        .showcase .showcase-modal__card {
          --card-accent: #087bee;
          --card-tint: #eaf4ff;

          display: flex;
          flex-direction: column;
          width: 100%;
          min-width: 0;
          gap: 28px;
        }

        .showcase .showcase-modal__card .showcase-item__content {
          min-height: auto;
          padding-right: 40px;
        }

        .showcase .showcase-modal__card .showcase-item__category {
          margin-bottom: 16px;
          font-size: 12px;
        }

        .showcase .showcase-modal__card .showcase-item__title {
          font-size: clamp(24px, 3vw, 36px);
          line-height: 1.3;
          letter-spacing: -0.8px;
        }

        .showcase .showcase-modal__card .showcase-item__description {
          max-width: 760px;
          margin-top: 16px;
          font-size: 15px;
          line-height: 1.8;
        }

        .showcase .showcase-modal__card .showcase-item__visual {
          margin-top: 0;
          padding: 16px;
          border-radius: 16px;
        }

        .showcase .showcase-modal__card .showcase-window {
          border-radius: 12px;
        }

        .showcase .showcase-modal__card .showcase-window__header {
          min-height: 44px;
          padding: 0 16px;
        }

        .showcase .showcase-modal__card .showcase-window__dots {
          gap: 7px;
        }

        .showcase .showcase-modal__card .showcase-window__dots span {
          width: 9px;
          height: 9px;
        }

        .showcase .showcase-modal__card .showcase-window__label {
          font-size: 11px;
        }

        .showcase .showcase-modal__card .showcase-window__image {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
          object-position: center;
        }

        .showcase .showcase-modal__card .showcase-item__footer {
          margin-top: 0;
          padding-top: 20px;
        }

        .showcase .showcase-modal__card .showcase-item__visual {
          background:
            color-mix(in srgb, var(--card-accent) 8%, white);
          border-color:
            color-mix(in srgb, var(--card-accent) 20%, white);
        }

        .showcase .showcase-modal__card .showcase-item__category,
        .showcase .showcase-modal__card .showcase-item__footer-label {
          color: var(--card-accent);
        }

        .showcase .showcase-modal__card .showcase-item__footer {
          border-top-color:
            color-mix(in srgb, var(--card-accent) 15%, white);
        }

        @keyframes showcase-modal-fade-in {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes showcase-modal-scale-in {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.97);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* =========================================
           TABLET
        ========================================= */

        @media (max-width: 1024px) {
          .showcase {
            padding: 100px 0;
          }

          .showcase .showcase__container {
            width: min(calc(100% - 48px), 1200px);
          }

          .showcase .showcase__viewport {
            margin-top: 56px;
          }

          .showcase .showcase__group {
            gap: 24px;
            padding-right: 24px;
          }

          .showcase .showcase-item {
            flex-basis: 360px;
            width: 360px;
            padding: 24px;
            border-radius: 18px;
          }

          .showcase .showcase-item__content {
            min-height: 185px;
          }

          .showcase .showcase-item__title {
            font-size: 23px;
          }

          .showcase .showcase-item__description {
            font-size: 13px;
          }

          .showcase .showcase-item__visual {
            padding: 10px;
          }
        }

        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 768px) {
          .showcase {
            padding: 80px 0;
          }

          .showcase .showcase__container {
            width: calc(100% - 40px);
          }

          .showcase .showcase__title {
            font-size: clamp(32px, 7vw, 44px);
            letter-spacing: -1px;
          }

          .showcase .showcase__description {
            margin-top: 18px;
            font-size: 14px;
            line-height: 1.75;
          }

          .showcase .showcase__viewport {
            margin-top: 44px;
            -webkit-mask-image: linear-gradient(
              to right,
              transparent 0%,
              #000 3%,
              #000 97%,
              transparent 100%
            );
            mask-image: linear-gradient(
              to right,
              transparent 0%,
              #000 3%,
              #000 97%,
              transparent 100%
            );
          }

          .showcase .showcase__group {
            gap: 16px;
            padding-right: 16px;
          }

          .showcase .showcase-item {
            flex-basis: 300px;
            width: 300px;
            padding: 20px;
            border-radius: 16px;
          }

          .showcase .showcase-item__content {
            min-height: 185px;
          }

          .showcase .showcase-item__category {
            margin-bottom: 12px;
            font-size: 10px;
          }

          .showcase .showcase-item__title {
            font-size: 21px;
          }

          .showcase .showcase-item__description {
            margin-top: 12px;
            font-size: 12px;
            line-height: 1.7;
          }

          .showcase .showcase-item__visual {
            margin-top: 20px;
            padding: 8px;
            border-radius: 11px;
          }

          .showcase .showcase-window__header {
            min-height: 32px;
            padding: 0 9px;
          }

          .showcase .showcase-window__label {
            font-size: 8px;
          }

          .showcase .showcase-item__footer {
            margin-top: 18px;
            padding-top: 14px;
          }

          .showcase .showcase-modal {
            padding: 24px;
          }

          .showcase .showcase-modal__content {
            max-height: 88vh;
            padding: 24px;
            border-radius: 20px;
          }

          .showcase .showcase-modal__close {
            width: 40px;
            height: 40px;
            margin-bottom: -40px;
          }

          .showcase .showcase-modal__close svg {
            width: 18px;
            height: 18px;
          }

          .showcase .showcase-modal__card {
            gap: 22px;
          }

          .showcase .showcase-modal__card .showcase-item__visual {
            padding: 10px;
          }

          .showcase .showcase-modal__card .showcase-item__content {
            padding-right: 34px;
          }

          .showcase .showcase-modal__card .showcase-item__description {
            font-size: 14px;
          }
        }

        /* =========================================
           SMALL MOBILE
        ========================================= */

        @media (max-width: 480px) {
          .showcase {
            padding: 64px 0;
          }

          .showcase .showcase__container {
            width: calc(100% - 32px);
          }

          .showcase .showcase__eyebrow {
            margin-bottom: 14px;
            font-size: 10px;
            letter-spacing: 2px;
          }

          .showcase .showcase__title {
            font-size: 30px;
            line-height: 1.2;
          }

          .showcase .showcase__description {
            font-size: 13px;
          }

          .showcase .showcase__viewport {
            margin-top: 36px;
          }

          .showcase .showcase__group {
            gap: 16px;
            padding-right: 16px;
          }

          .showcase .showcase-item {
            flex-basis: 280px;
            width: 280px;
            padding: 18px;
          }

          .showcase .showcase-item__content {
            min-height: 190px;
          }

          .showcase .showcase-item__title {
            font-size: 19px;
          }

          .showcase .showcase-item__description {
            font-size: 12px;
          }

          .showcase .showcase-modal {
            padding: 14px;
          }

          .showcase .showcase-modal__content {
            max-height: 90vh;
            max-height: 90dvh;
            padding: 18px;
            border-radius: 16px;
          }

          .showcase .showcase-modal__close {
            width: 36px;
            height: 36px;
            margin-bottom: -36px;
            background: #f1f5f9;
          }

          .showcase .showcase-modal__close svg {
            width: 18px;
            height: 18px;
          }

          .showcase .showcase-modal__card {
            gap: 18px;
          }

          .showcase .showcase-modal__card .showcase-item__content {
            padding-right: 30px;
          }

          .showcase .showcase-modal__card .showcase-item__category {
            margin-bottom: 12px;
            font-size: 10px;
          }

          .showcase .showcase-modal__card .showcase-item__title {
            font-size: 22px;
            letter-spacing: -0.4px;
          }

          .showcase .showcase-modal__card .showcase-item__description {
            margin-top: 12px;
            font-size: 12px;
            line-height: 1.75;
          }

          .showcase .showcase-modal__card .showcase-item__visual {
            padding: 8px;
            border-radius: 10px;
          }

          .showcase .showcase-modal__card .showcase-window__header {
            min-height: 32px;
            padding: 0 9px;
          }

          .showcase .showcase-modal__card .showcase-window__label {
            font-size: 8px;
          }

          .showcase .showcase-modal__card .showcase-item__footer {
            padding-top: 14px;
          }
        }

        /* =========================================
           EXTRA SMALL MOBILE
        ========================================= */

        @media (max-width: 360px) {
          .showcase .showcase-modal {
            padding: 10px;
          }

          .showcase .showcase-modal__content {
            padding: 14px;
            border-radius: 14px;
          }

          .showcase .showcase-modal__close {
            width: 34px;
            height: 34px;
            margin-bottom: -34px;
          }

          .showcase .showcase-modal__close svg {
            width: 16px;
            height: 16px;
          }

          .showcase .showcase-modal__card .showcase-item__content {
            padding-right: 26px;
          }

          .showcase .showcase-modal__card .showcase-item__title {
            font-size: 20px;
          }
        }

        /* =========================================
           REDUCED MOTION
        ========================================= */

        @media (prefers-reduced-motion: reduce) {
          .showcase .showcase__viewport::before,
          .showcase .showcase__viewport::after {
            animation: none;
            background: #087bee;
          }

          .showcase .showcase-item {
            transition: none;
          }

          .showcase .showcase-modal,
          .showcase .showcase-modal__content {
            animation: none;
          }

          .showcase .showcase-modal__close {
            transition: none;
          }
        }
      `}</style>

      {/* BAGIAN HEADER */}
      <div className="showcase__container" id="produk">
        <div className="showcase__header">
          <span className="showcase__eyebrow">APLIKASI DREAMS</span>

          <h2 className="showcase__title">
            Semua yang Anda Butuhkan
            <br />
            untuk Memahami Donatur
          </h2>

          <p className="showcase__description">
            Jelajahi berbagai tampilan analitik, pengelolaan donatur, dan
            transparansi donasi yang dirancang untuk membantu organisasi
            memahami data dan mengambil keputusan yang lebih baik.
          </p>
        </div>
      </div>

      {/* AREA KARUSEL */}
      <div
        ref={viewportRef}
        className={[
          'showcase__viewport',
          isDragging ? 'showcase__viewport--dragging' : '',
        ].join(' ')}
        role="region"
        aria-label="Karusel produk DREAMS"
        onPointerDown={handleDragStart}
        onPointerMove={handleDragMove}
        onPointerUp={handleDragEnd}
        onPointerCancel={handleDragEnd}
        onClickCapture={handleClickCapture}
      >
        <div ref={trackRef} className="showcase__track">
          {/* GRUP KARTU ASLI */}
          <div className="showcase__group">
            {showcaseItems.map((item, index) =>
              renderShowcaseCard(item, index),
            )}
          </div>

          {/* GRUP KARTU DUPLIKAT (hanya di browser, untuk animasi loop) */}
          {hasHydrated && (
            <div className="showcase__group" aria-hidden="true">
              {showcaseItems.map((item, index) =>
                renderShowcaseCard(item, index, true),
              )}
            </div>
          )}
        </div>
      </div>

      {/* MODAL PRATINJAU PRODUK */}
      {activeItem && (
        <div className="showcase-modal" onClick={handleCloseModal}>
          <div
            className="showcase-modal__content"
            onClick={(event) => event.stopPropagation()}
          >
            {/* TOMBOL TUTUP */}
            <button
              type="button"
              className="showcase-modal__close"
              onClick={handleCloseModal}
              aria-label="Tutup pratinjau produk"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 6L18 18M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* KARTU MODAL */}
            <article
              className="showcase-modal__card"
              style={{
                '--card-accent': activeItem.accent,
                '--card-tint': activeItem.tint,
              }}
            >
              <div className="showcase-item__content">
                <span className="showcase-item__category">
                  {activeItem.category}
                </span>

                <h3 className="showcase-item__title">{activeItem.title}</h3>

                <p className="showcase-item__description">
                  {activeItem.description}
                </p>
              </div>

              {/* PRATINJAU PRODUK */}
              <div className="showcase-item__visual">
                <div className="showcase-window">
                  <div className="showcase-window__header">
                    <div className="showcase-window__dots">
                      <span />
                      <span />
                      <span />
                    </div>

                    <span className="showcase-window__label">
                      Pratinjau Produk DREAMS
                    </span>
                  </div>

                  <div className="showcase-window__body">
                    <img
                      className="showcase-window__image"
                      src={activeItem.image}
                      alt={activeItem.imageAlt}
                      draggable="false"
                    />
                  </div>
                </div>
              </div>

              {/* BAGIAN BAWAH MODAL */}
              <div className="showcase-item__footer">
                <span className="showcase-item__footer-label">
                  {activeItem.footerLabel}
                </span>
              </div>
            </article>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductShowcase
