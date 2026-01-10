import React, { useRef, useState, useEffect } from "react";
import { TrendingUp, Target, Award, Users } from "lucide-react";

const AboutSection = () => {
  // ------------------ Typing Animation Hooks ------------------
  const textRef = useRef(null);
  const [visibleText, setVisibleText] = useState("");
  const fullText = "A Click Is Enough";

  useEffect(() => {
    window.scrollTo(0,0);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let index = 0;
          const interval = setInterval(() => {
            setVisibleText(fullText.substring(0, index + 1));
            index++;
            if (index === fullText.length) clearInterval(interval);
          }, 100);
        }
      },
      { threshold: 0.5 }
    );

    if (textRef.current) observer.observe(textRef.current);
  }, []);

  // ------------------ Feature List ------------------
  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Our Mission",
      description:
        "To revolutionize industrial automation with innovative solutions that empower businesses to achieve peak efficiency.",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Growth Focused",
      description:
        "Committed to continuous innovation and staying ahead of industry trends to deliver cutting-edge automation technology.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Quality Assured",
      description:
        "Delivering excellence through rigorous testing and quality control measures in every automation solution we provide.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Customer First",
      description:
        "Building lasting partnerships through dedicated support and customized solutions tailored to your unique needs.",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--primary)] from-slate-50 to-blue-50">
      {/* ------------------ Hero Section ------------------ */}
      <div className="relative py-20 px-4 overflow-hidden transition-all duration-700"
      style={{
    /* We create a gradient using color-mix:
       1. color-mix(in srgb, var(--primary), white 20%) -> 80% primary, 20% white (lighter)
       2. color-mix(in srgb, var(--primary), transparent 10%) -> slight transparency for depth
    */
    background: `linear-gradient(to right, 
      color-mix(in srgb, var(--primary), white 10%), 
      var(--primary), 
      color-mix(in srgb, var(--primary), white 10%)
    )`,
    color: 'var(--secondary)' 
  }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10 text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            About <span className="text-green-400">Dharti Automation</span>
          </h1>

          {/* Typing Animation Line */}
          <p
            ref={textRef}
            className="
              text-xl md:text-2xl 
              text-blue-100 
              font-serif 
              italic 
              tracking-wide 
              drop-shadow 
              text-center
            "
          >
            {visibleText}
          </p>
        </div>
      </div>

      {/* ------------------ Main Content ------------------ */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Story Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
            Who We Are
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
            <p>
              Dharti Automation is a leading provider of industrial automation
              solutions, dedicated to transforming businesses through innovative
              technology.
            </p>
            <p>
              Our commitment to excellence drives us to stay at the forefront of
              automation technology.
            </p>
            <p>
              At Dharti Automation, we believe automation shouldn't be
              complicated. That’s why our tagline is{" "}
              <span className="font-semibold text-green-600">
                "A Click Is Enough"
              </span>
              .
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-green-500"
            >
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center text-cyan-300">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl shadow-xl p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 text-2xl font-bold flex items-center justify-center">
                1
              </div>
              <h3 className="text-xl font-bold mb-2 text-green-400">
                Innovation
              </h3>
              <p className="text-blue-100">
                Constantly pushing boundaries to deliver cutting-edge solutions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-400 rounded-full mx-auto mb-4 text-2xl font-bold flex items-center justify-center text-blue-900">
                2
              </div>
              <h3 className="text-xl font-bold mb-2 text-cyan-300">
                Reliability
              </h3>
              <p className="text-blue-100">
                Consistent performance you can depend on.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 text-2xl font-bold flex items-center justify-center">
                3
              </div>
              <h3 className="text-xl font-bold mb-2 text-green-400">
                Partnership
              </h3>
              <p className="text-blue-100">
                Working alongside clients as trusted partners.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            Ready to Automate Your Business?
          </h2>
          <p className="text-gray-200 text-lg mb-8">
            Let's discuss how we can transform your operations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
