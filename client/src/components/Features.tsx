export default function Features() {
  const features = [
    {
      title: "Triage Intelligently",
      description: "Prioritize and organize issues with AI-powered intelligence.",
      hoverBorder: "hover:border-primary/50",
    },
    {
      title: "Resolve Faster",
      description: "Fix bugs and implement solutions with unprecedented speed.",
      hoverBorder: "hover:border-secondary/50",
    },
    {
      title: "Capture Everywhere",
      description: "Collect issues from any source in your development workflow.",
      hoverBorder: "hover:border-accent/50",
    },
    {
      title: "Detect Proactively",
      description: "Identify potential issues before they impact your users.",
      hoverBorder: "hover:border-accent-alt/50",
    },
  ];
  
  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-6 py-16">
      <div className="flex flex-wrap justify-center gap-6 md:gap-10">
        {features.map((feature, index) => (
          <div 
            key={index}
            className={`bg-card/40 backdrop-blur-sm p-6 rounded-xl w-full md:w-[calc(50%-1.25rem)] lg:w-[calc(25%-1.25rem)] border border-gray-800 ${feature.hoverBorder} transition-all duration-300`}
          >
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
