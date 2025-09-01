import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Github, ExternalLink, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { useEffect, useMemo, useRef, useState } from "react";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  // Get related projects (same tags, excluding current)
  const relatedProjects = projects
    .filter(p => 
      p.id !== project.id && 
      p.tags.some(tag => project.tags.includes(tag))
    )
    .slice(0, 3);

    // --- Hover & in-view logic for banner ---
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const [canAnimate, setCanAnimate] = useState(true);

  // Respect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setCanAnimate(!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // Observe visibility (for mobile: play when visible)
  useEffect(() => {
    if (!bannerRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio > 0.6),
      { threshold: [0, 0.6, 1] }
    );
    obs.observe(bannerRef.current);
    return () => obs.disconnect();
  }, []);

  // Desktop vs Mobile rule: desktop only plays on hover; mobile plays when in view
  const isTouchDevice =
    typeof window !== "undefined" && matchMedia("(pointer: coarse)").matches;

  const shouldPlay = useMemo(() => {
    if (!project.video) return false;
    if (!canAnimate) return false;
    return isTouchDevice ? inView : hovered;
  }, [project.video, canAnimate, isTouchDevice, hovered, inView]);

  // Imperatively play/pause so iOS behaves
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (shouldPlay) {
      v.play().catch(() => {});
    } else {
      v.pause();
      // optional: v.currentTime = 0;
    }
  }, [shouldPlay]);
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Back Navigation */}
      <section className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/projects" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>
      </section>

      {/* Project Hero */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Banner Media (image + video with hover/mobile playback) */}
            <div
              ref={bannerRef}
              className="group aspect-video mb-8 rounded-2xl overflow-hidden border border-border relative"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onFocus={() => setHovered(true)}
              onBlur={() => setHovered(false)}
              tabIndex={0}
            >
              {/* Base image always rendered (cross-fades out when video should play) */}
              <img
                src={project.banner || project.thumbnail}
                alt={project.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300
                            ${project.video && shouldPlay ? "opacity-0" : "opacity-100"}`}
                loading="eager"
              />

              {/* Optional video preview — plays on hover (desktop) or when visible (mobile) */}
              {project.video && (
                <video
                  ref={videoRef}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300
                              ${shouldPlay ? "opacity-100" : "opacity-0"}`}
                  src={project.video}
                  poster={project.imagePoster ?? project.thumbnail}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  style={{ pointerEvents: "none" }}  // don’t block clicks on overlay/nav
                />
              )}
            </div>

            {/* Project Header */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-4 mb-4">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {project.year}
                  </Badge>
                  {project.featured && (
                    <Badge variant="secondary">Featured</Badge>
                  )}
                </div>

                <h1 className="font-space-grotesk font-bold text-4xl md:text-5xl mb-4">
                  {project.title}
                </h1>
                
                <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                  {project.shortDescription}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  {project.repoLink && (
                    <Button asChild size="lg" className="glow-effect">
                      <a
                        href={project.repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Github className="h-5 w-5" />
                        View Code
                      </a>
                    </Button>
                  )}
                  
                  {project.demoLink && (
                    <Button variant="outline" size="lg" asChild>
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-5 w-5" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Project Meta */}
              <div className="lg:col-span-1">
                <Card className="border-border">
                  <CardContent className="p-6 space-y-6">
                    
                    {/* Tech Stack */}
                    <div>
                      <h3 className="font-space-grotesk font-semibold mb-3 flex items-center gap-2">
                        <Tag className="h-4 w-4" />
                        Tech Stack
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Project Tags */}
                    <div>
                      <h3 className="font-space-grotesk font-semibold mb-3">
                        Categories
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Overview */}
            <div>
              <h2 className="font-space-grotesk font-bold text-3xl mb-6">
                Project Overview
              </h2>
              <div className="prose prose-lg max-w-none text-foreground">
                <p className="text-lg leading-relaxed">{project.overview}</p>
              </div>
            </div>

            {/* Solution */}
            <div>
              <h2 className="font-space-grotesk font-bold text-3xl mb-6">
                Technical Solution
              </h2>
              <div className="prose prose-lg max-w-none text-foreground">
                <p className="text-lg leading-relaxed">{project.solution}</p>
              </div>
            </div>

            {/* Results */}
            <div>
              <h2 className="font-space-grotesk font-bold text-3xl mb-6">
                Results & Impact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.results.map((result, index) => (
                  <Card key={index} className="border-border">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        </div>
                        <p className="text-sm leading-relaxed">{result}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-12 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-space-grotesk font-bold text-3xl mb-8 text-center">
                Related Projects
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProjects.map((relatedProject, index) => (
                  <div 
                    key={relatedProject.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProjectCard project={relatedProject} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ProjectDetail;