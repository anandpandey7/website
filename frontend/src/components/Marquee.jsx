import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const Marquee = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.marquee-animate', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const items = [
    { type: 'icon' },
    { type: 'text', value: 'Project', className: 'title' },
    { type: 'icon' },
    { type: 'text', value: 'App Development', className: 'stroke-text' },
    { type: 'icon' },
    { type: 'text', value: 'Web Agency', className: 'title' },
    { type: 'icon' },
    { type: 'text', value: 'Web App', className: 'title' }
  ]

  return (
    <section
      ref={sectionRef}
      className="marquee-area marquee-animate pt-110"
    >
      <div className="marquee__wrp">
        <div className="marquee__slide">
          <div className="marquee__item-wrp">

            {items.map((item, index) => (
              <div className="marquee__item" key={index}>
                {item.type === 'icon' ? (
                  <svg
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M48.6657 1.18531C48.8534 -0.395103 51.1466 -0.395103 51.3343 1.18531L52.9075 14.4435C54.9388 31.5634 68.4366 45.0612 85.5563 47.0925L98.8146 48.6657C100.395 48.8534 100.395 51.1466 98.8146 51.3343L85.5563 52.9075C68.4366 54.9388 54.9388 68.4366 52.9075 85.5563L51.3343 98.8146C51.1466 100.395 48.8534 100.395 48.6657 98.8146L47.0925 85.5563C45.0612 68.4366 31.5634 54.9388 14.4435 52.9075L1.18531 51.3343C-0.395103 51.1466 -0.395103 48.8534 1.18531 48.6657L14.4435 47.0925C31.5634 45.0612 45.0612 31.5634 47.0925 14.4435L48.6657 1.18531Z"
                      fill="#5966EC"
                    />
                  </svg>
                ) : (
                  <h2 className={item.className}>{item.value}</h2>
                )}
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  )
}

export default Marquee