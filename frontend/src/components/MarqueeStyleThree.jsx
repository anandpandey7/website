import { useEffect, useRef } from 'react'
import gsap from 'gsap'
// 1. Import your local asset
import marqueStart from '../assets/marque-start.png' 

const MarqueeStyleThree = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out'
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const items = [
    'Home Automation',
    'Industrial Automation',
    'Hospital Automation',
    'Agriculture Automation',
    'Custom Automation Solutions'
  ]

  // 2. Updated to wrap text and image together
  const renderGroup = () =>
    items.map((text, index) => (
      <div key={index} className="marquee-item">
        <h2 className="text">{text}</h2>
        <img src={marqueStart} alt="icon" className="marquee-separator" />
      </div>
    ))

  return (
    <section ref={sectionRef} className="marquee-section style-three">
      <div className="marquee dark-bg">
        <div className="marquee-group">{renderGroup()}</div>
        <div className="marquee-group" aria-hidden="true">{renderGroup()}</div>
      </div>

      <div className="marquee">
        <div className="marquee-group">{renderGroup()}</div>
        <div className="marquee-group" aria-hidden="true">{renderGroup()}</div>
      </div>
    </section>
  )
}

export default MarqueeStyleThree