import { useState, useEffect, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Tilt from "@/components/Tilt";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  showLinks?: boolean;

  // Optional: control the effect per-place if you want
  tilt?: boolean;                 // default: true
  glare?: boolean;                // default: false (subtle)
  maxTiltDeg?: number;            // default: 5
  scale?: number;                 // default: 1.02
  glareMaxOpacity?: number;       // default: 0.10 (used if glare=true)
}

const ProjectCard = ({
  project,
  showLinks = false,
  tilt = true,
  glare = true,
  maxTiltDeg = 5,
  scale = 1.02,
  glareMaxOpacity = 0.10,
}: ProjectCardProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();

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

  // Visibility for mobile autoplay
  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio > 0.6),
      { threshold: [0, 0.6, 1] }
    );
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const isTouchDevice =
    typeof window !== "undefined" && matchMedia("(pointer: coarse)").matches;

  const shouldPlay = useMemo(() => {
    if (!project.video) return false;
    if (!canAnimate) return false;
    return isTouchDevice ? inView : hovered;
  }, [project.video, hovered, inView, canAnimate, isTouchDevice]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (shouldPlay) v.play().catch(() => {});
    else v.pause();
  }, [shouldPlay]);

  // Click-anywhere card navigation, but don't hijack inner controls
  const handleRootClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const t = e.target as HTMLElement;
    if (t.closest("a, button, [role='button'], input, textarea, select")) return;
    navigate(`/projects/${project.slug}`);
  };

  // The actual card markup
  const CardBody = (
    <div
      ref={containerRef}
      className="project-card group flex flex-col h-full rounded-2xl border border-border bg-card shadow-sm cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={handleRootClick}
      tabIndex={0}
      aria-label={project.title}
    >
      {/* Media */}
      <div className="relative overflow-hidden aspect-[16/9]">
        <img
          src={project.thumbnail}
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            project.video && shouldPlay ? "opacity-0" : "opacity-100"
          }`}
          loading="lazy"
        />
        {project.video && (
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              shouldPlay ? "opacity-100" : "opacity-0"
            }`}
            src={project.video}
            poster={project.imagePoster ?? project.thumbnail}
            muted
            loop
            playsInline
            preload="metadata"
            style={{ pointerEvents: "none" }}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-muted-foreground">{project.year}</span>
          {project.featured && (
            <Badge variant="secondary" className="text-xs">
              Featured
            </Badge>
          )}
        </div>

        <h3 className="font-space-grotesk font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
          <Link to={`/projects/${project.slug}`} onClick={(e) => e.stopPropagation()}>
            {project.title}
          </Link>
        </h3>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.shortDescription}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className="tech-badge">
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="tech-badge text-muted-foreground">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Action Links */}
        {showLinks && (
          <div className="flex gap-2">
            {project.repoLink && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={project.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="h-4 w-4" />
                  Code
                </a>
              </Button>
            )}
            {project.demoLink && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="h-4 w-4" />
                  Demo
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );

  // If tilt is requested, wrap; otherwise just render the card
  return tilt ? (
    <Tilt
      className="h-full rounded-2xl overflow-hidden"
      maxTiltDeg={0}
      scale={1.12}
      glare={glare}
      glareMaxOpacity={glareMaxOpacity}
    >
      <div className="h-full" style={{ transformStyle: "preserve-3d" }}>
        {CardBody}
      </div>
    </Tilt>
  ) : (
    CardBody
  );
};

export default ProjectCard;