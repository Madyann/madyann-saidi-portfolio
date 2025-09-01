import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import Tilt from "@/components/Tilt";              // ← added
import { projects, allTags } from "@/data/projects";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        project.title.toLowerCase().includes(q) ||
        project.shortDescription.toLowerCase().includes(q) ||
        project.tags.some(tag => tag.toLowerCase().includes(q));

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every(tag => project.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [searchTerm, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-space-grotesk font-bold text-4xl md:text-5xl mb-4">
              Engineering Projects
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A comprehensive collection of my engineering work, from robotics and AI
              to IoT systems and research projects.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search projects by title, description, or technology..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
                {selectedTags.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {selectedTags.length}
                  </Badge>
                )}
              </Button>

              {(searchTerm || selectedTags.length > 0) && (
                <Button variant="ghost" onClick={clearFilters}>
                  Clear All
                </Button>
              )}
            </div>

            {/* Tag Filters */}
            {showFilters && (
              <div className="bg-card border border-border rounded-lg p-4 animate-fade-in">
                <h3 className="font-medium mb-3">Filter by Technology</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <Button
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleTag(tag)}
                      className="transition-all"
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredProjects.length > 0 ? (
            <>
              <div className="mb-8">
                <p className="text-muted-foreground">
                  Showing {filteredProjects.length} of {projects.length} projects
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                {filteredProjects.map((project, index) => (
                  <Tilt
                    key={project.id}
                    className="animate-fade-in h-full"
                    style={{ animationDelay: `${index * 0.05}s` as any }}
                    maxTiltDeg={0}
                    scale={1}
                    glare={true}               // turn glare on
                    glareMaxOpacity={0.08}     // subtle, can tweak
                  >
                    <div className="h-full" style={{ transformStyle: "preserve-3d" }}>
                      <ProjectCard project={project} showLinks />
                    </div>
                  </Tilt>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <h3 className="font-space-grotesk font-semibold text-xl mb-2">
                  No projects found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <Button onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;


// VERSION 2
// import { useState, useMemo } from "react";
// import { Search, Filter } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import Navigation from "@/components/Navigation";
// import Footer from "@/components/Footer";
// import ProjectCard from "@/components/ProjectCard";
// import { projects, allTags } from "@/data/projects";

// const Projects = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedTags, setSelectedTags] = useState<string[]>([]);
//   const [showFilters, setShowFilters] = useState(false);

//   const filteredProjects = useMemo(() => {
//     return projects.filter((project) => {
//       const matchesSearch = 
//         project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         project.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
//       const matchesTags = 
//         selectedTags.length === 0 ||
//         selectedTags.every(tag => project.tags.includes(tag));
      
//       return matchesSearch && matchesTags;
//     });
//   }, [searchTerm, selectedTags]);

//   const toggleTag = (tag: string) => {
//     setSelectedTags(prev => 
//       prev.includes(tag) 
//         ? prev.filter(t => t !== tag)
//         : [...prev, tag]
//     );
//   };

//   const clearFilters = () => {
//     setSelectedTags([]);
//     setSearchTerm("");
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Navigation />
      
//       {/* Header */}
//       <section className="pt-24 pb-12 bg-gradient-to-b from-muted/30 to-background">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <h1 className="font-space-grotesk font-bold text-4xl md:text-5xl mb-4">
//               Engineering Projects
//             </h1>
//             <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
//               A comprehensive collection of my engineering work, from robotics and AI 
//               to IoT systems and research projects.
//             </p>
//           </div>

//           {/* Search and Filters */}
//           <div className="max-w-4xl mx-auto space-y-4">
//             {/* Search Bar */}
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
//               <Input
//                 placeholder="Search projects by title, description, or technology..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 h-12"
//               />
//             </div>

//             {/* Filter Toggle */}
//             <div className="flex items-center justify-between">
//               <Button
//                 variant="outline"
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="flex items-center gap-2"
//               >
//                 <Filter className="h-4 w-4" />
//                 Filters
//                 {selectedTags.length > 0 && (
//                   <Badge variant="secondary" className="ml-2">
//                     {selectedTags.length}
//                   </Badge>
//                 )}
//               </Button>

//               {(searchTerm || selectedTags.length > 0) && (
//                 <Button variant="ghost" onClick={clearFilters}>
//                   Clear All
//                 </Button>
//               )}
//             </div>

//             {/* Tag Filters */}
//             {showFilters && (
//               <div className="bg-card border border-border rounded-lg p-4 animate-fade-in">
//                 <h3 className="font-medium mb-3">Filter by Technology</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {allTags.map((tag) => (
//                     <Button
//                       key={tag}
//                       variant={selectedTags.includes(tag) ? "default" : "outline"}
//                       size="sm"
//                       onClick={() => toggleTag(tag)}
//                       className="transition-all"
//                     >
//                       {tag}
//                     </Button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Projects Grid */}
//       <section className="py-12">
//         <div className="container mx-auto px-4">
//           {filteredProjects.length > 0 ? (
//             <>
//               <div className="mb-8">
//                 <p className="text-muted-foreground">
//                   Showing {filteredProjects.length} of {projects.length} projects
//                 </p>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {filteredProjects.map((project, index) => (
//                   <div 
//                     key={project.id}
//                     className="animate-fade-in"
//                     style={{ animationDelay: `${index * 0.05}s` }}
//                   >
//                     <ProjectCard project={project} showLinks />
//                   </div>
//                 ))}
//               </div>
//             </>
//           ) : (
//             <div className="text-center py-20">
//               <div className="max-w-md mx-auto">
//                 <h3 className="font-space-grotesk font-semibold text-xl mb-2">
//                   No projects found
//                 </h3>
//                 <p className="text-muted-foreground mb-6">
//                   Try adjusting your search terms or filters to find what you're looking for.
//                 </p>
//                 <Button onClick={clearFilters}>
//                   Clear Filters
//                 </Button>
//               </div>
//             </div>
//           )}
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default Projects;







// ORIGIINAL

// import { useEffect, useMemo, useRef, useState } from "react";
// import type { Project } from "@/data/projects";

// type Props = { project: Project; showLinks?: boolean };

// // TIP: if your card already has specific hover/outline classes, keep them.
// // Replace only the media block + small logic below.
// export default function ProjectCard({ project, showLinks }: Props) {
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const videoRef = useRef<HTMLVideoElement | null>(null);

//   const [hovered, setHovered] = useState(false);   // mouse/keyboard
//   const [inView, setInView] = useState(false);     // mobile/scroll
//   const [canAnimate, setCanAnimate] = useState(true);

//   // Respect user motion preference
//   useEffect(() => {
//     const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
//     const update = () => setCanAnimate(!mq.matches);
//     update();
//     mq.addEventListener?.("change", update);
//     return () => mq.removeEventListener?.("change", update);
//   }, []);

//   // Observe visibility so mobile can autoplay
//   useEffect(() => {
//     if (!containerRef.current) return;
//     const obs = new IntersectionObserver(
//       ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio > 0.6),
//       { threshold: [0, 0.6, 1] }
//     );
//     obs.observe(containerRef.current);
//     return () => obs.disconnect();
//   }, []);

//   const shouldPlay = useMemo(() => {
//     if (!project.video) return false;
//     if (!canAnimate) return false;
//     return hovered || inView; // desktop interaction OR visible on mobile
//   }, [project.video, hovered, inView, canAnimate]);

//   // Play / pause imperatively (required for mobile)
//   useEffect(() => {
//     const v = videoRef.current;
//     if (!v) return;
//     if (shouldPlay) {
//       v.play().catch(() => {/* autoplay may be blocked in rare cases */});
//     } else {
//       v.pause();
//       // optional reset: v.currentTime = 0;
//     }
//   }, [shouldPlay]);

//   return (
//     <article
//       ref={containerRef}
//       className="group rounded-2xl border border-border bg-card overflow-hidden shadow-sm transition
//                  hover:shadow-md hover:border-primary/50 focus-within:border-primary/60"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       onFocus={() => setHovered(true)}
//       onBlur={() => setHovered(false)}
//       tabIndex={0}
//       aria-label={project.title}
//     >
//       {/* === MEDIA AREA (image + optional video stacked) === */}
//       <div className="relative aspect-[16/10] w-full">
//         {/* Base thumbnail (always rendered) */}
//         <img
//           src={project.thumbnail}
//           alt=""
//           className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300
//                       ${project.video && shouldPlay ? "opacity-0" : "opacity-100"}`}
//           loading="lazy"
//         />

//         {/* Preview video (only if provided) */}
//         {project.video && (
//           <video
//             ref={videoRef}
//             className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300
//                         ${shouldPlay ? "opacity-100" : "opacity-0"}`}
//             src={project.video}
//             poster={project.imagePoster ?? project.thumbnail}  // no black frame
//             muted
//             loop
//             playsInline
//             preload="metadata"
//             // avoid capturing pointer events over links in the card
//             style={{ pointerEvents: "none" }}
//           />
//         )}

//         {/* REMOVE your bottom fade overlay component/div here.
//            If you had something like:
//            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50" />
//            delete it to stop the fade effect. */}
//       </div>

//       {/* === BODY (unchanged) === */}
//       <div className="p-4">
//         {/* ...title, description, tags, links just like before... */}
//       </div>
//     </article>
//   );
// }