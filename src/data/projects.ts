// Engineering Portfolio Projects Data
// This is your template data structure - easily customize by updating this file

import otvThumbnail from './assets/project-otv.jpg';
import otvVideo from './assets/project-otv.mp4';
import otvPoster from './assets/project-otv-poster.jpg';
import yumiThumbnail from './assets/project-yumi.jpg';
import yumiVideo from './assets/project-yumi.mp4';
import yumiPoster from './assets/project-yumi-poster.jpg';
import frcThumbnail from './assets/project-frc.jpg';
import frcVideo from './assets/project-frc.mp4';
import frcPoster from './assets/project-frc-poster.jpg';
import quadrupedThumbnail from './assets/project-quadruped.jpg';
import prostheticThumbnail from './assets/project-prosthetic.jpg';
import icraThumbnail from './assets/project-icra.jpg';
import matlabThumbnail from './assets/project-matlab.jpg';

export interface Project {
  id: string;
  title: string;
  slug: string;
  year: number;
  tags: string[];
  thumbnail: string;
  banner?: string;
  shortDescription: string;
  overview: string;
  solution: string;
  results: string[];
  techStack: string[];
  repoLink?: string;
  demoLink?: string;
  featured?: boolean;

  // trying to add a video
  video?: string;
  imagePoster?: string;
}

export const projects: Project[] = [
  

  /* ——— NIST Research/Intern Projects ——— */

  /* ——— University / Club Projects ——— */
  {
    id: "seed-planting-otv",
    title: "Autonomous Seed-Planting OTV",
    slug: "seed-planting-otv",
    year: 2025,
    tags: ["Design", "Software"],
    thumbnail: otvThumbnail,
    shortDescription:
      "Eight-person project: an Arduino-based over-terrain vehicle that autonomously plants seeds and retrieves rocks.",
    overview:
      "Developed full autonomy pipeline using ArUco marker localization, tuned PID controls, and calibrated color-sensor classification.",
    solution:
      "Managed team with Trello & weekly sprints; integrated CV, control, and hardware subsystems to meet mission specs.",
    results: [
      "100 % mission success — collected 200 % payload in < 3 min",
      "Won Best Mission Award & Honorable Mention for Construction"
    ],
    techStack: ["Arduino", "OpenCV", "PID", "Trello"],
    repoLink: "",
    demoLink: "",
    featured: true,
    video: otvVideo,
    imagePoster: otvPoster
  },
  {
    id: "yumi-rubiks-cube-solver",
    title: "ABB YuMi 2×2 Rubik’s Cube Solver",
    slug: "yumi-rubiks-cube-solver",
    year: 2025,
    tags: ["Design", "Software"],
    thumbnail: yumiThumbnail, // update path or name as needed
    shortDescription:
      "Vision-guided ABB YuMi system that inspects and solves a 2×2×2 Rubik’s cube autonomously.",
    overview:
      "Built a Python server that streams camera images, classifies cube colors, calculates an optimal solve sequence, and sends move commands one at a time to the ABB YuMi client controller.",
    solution:
      "Integrated OpenCV color detection with a two-phase Kociemba-based solver. Implemented a TCP server-client protocol; YuMi grasps and rotates the cube after each instruction while the vision loop verifies state convergence.",
    results: [
      "Achieved 100 % solve rate on scrambled cubes",
      "Average solve time: 55 s, including vision checks",
      "Codebase packaged for plug-and-play lab demos"
    ],
    techStack: ["Python", "OpenCV", "Socket", "ABB RAPID", "RobotStudio"],
    repoLink: "",   // add URL if the code is public
    demoLink: "",   // add video/demo link if available
    featured: true,
    video: yumiVideo,
    imagePoster: yumiPoster
  },

  {
    id: "frc-1389-robot",
    title: "FRC 1389 Robot",
    slug: "frc-1389-robot",
    year: 2024,
    tags: ["Design", "Software"],
    thumbnail: frcThumbnail,
    shortDescription:
      "Four-roller shooter with ArUco-based autonomous aiming and a redesigned durable chassis.",
    overview:
      "Led CAD training for 15+ teammates; improved design-for-manufacturing workflow and reduced on-site repairs.",
    solution:
      "Integrated autonomous vision alignment, reinforced structure, and optimized manufacturing tolerances.",
    results: [
      "Accuracy ↑ 85 %, durability ↑ 150 %",
      "Awarded Best Autonomous Award (FIRST Chesapeake District)"
    ],
    techStack: ["SolidWorks", "C++", "OpenCV", "ArUco"],
    repoLink: "",
    demoLink: "",
    featured: true,
    video: frcVideo,
    imagePoster: frcPoster
  },
  {
    id: "testudog-quadruped",
    title: "Testudog Quadruped Robot",
    slug: "testudog-quadruped",
    year: 2025,
    tags: ["Design"],
    thumbnail: quadrupedThumbnail,
    shortDescription:
      "Competition-grade quadruped robot with zero-gravity integration test rig.",
    overview:
      "Led mechanical team to develop hardware-software integration tests that refine balance and dynamics ahead of ICRA 2026.",
    solution:
      "Designed modular frame, custom actuators, and a suspended rig enabling off-ground gait tuning.",
    results: [
      "Enhanced hardware–software collaboration workflow",
      "Prepared robot for autonomous field trials"
    ],
    techStack: ["SolidWorks", "Arduino", "ROS2", "PID"],
    repoLink: "",
    demoLink: "",
    featured: false
  },

  {
    id: "prosthetic-hand-m2",
    title: "Pulley-Driven Prosthetic Hand (Project M²)",
    slug: "prosthetic-hand-m2",
    year: 2024,
    tags: ["Design"],
    thumbnail: prostheticThumbnail,
    shortDescription:
      "Single-motor prosthetic hand with 20+ modular 3-D-printed parts and 32 grasp modes.",
    overview:
      "Iterated three prototypes, achieving ~90 % dexterity while reducing actuator count by 80 %.",
    solution:
      "Used pulley routing and differential tendon system, simulated finger kinematics in SolidWorks.",
    results: [
      "Demonstrated 32 unique configurations on bench tests",
      "Showcase model for low-cost prosthetics research"
    ],
    techStack: ["SolidWorks", "3D Printing", "Python"],
    repoLink: "",
    demoLink: "",
    featured: false
  },
  {
    id: "icra-modular-board",
    title: "ICRA Modular Manipulation Board",
    slug: "icra-modular-board",
    year: 2024,
    tags: ["Design"],
    thumbnail: icraThumbnail,
    shortDescription:
      "Redesigned ICRA manipulation board into four modular quadrants for higher task complexity.",
    overview:
      "Optimized layout and manufacturability, raising task difficulty 1.5× and simplifying assembly.",
    solution:
      "Re-engineered CAD in SolidWorks, authored a revised 12-page user manual for university teams.",
    results: [
      "Improved ease of manufacture and shipping",
      "Adopted by multiple collegiate robotics teams"
    ],
    techStack: ["SolidWorks", "Technical Writing"],
    repoLink: "",
    demoLink: "",
    featured: false
  },
  {
    id: "pressure-sensor-analysis",
    title: "MATLAB Pressure Sensitive Film Analysis Tool",
    slug: "pressure-sensor-analysis",
    year: 2025,
    tags: ["Software"],
    thumbnail: matlabThumbnail,
    shortDescription:
      "Automated test rig that quantifies pressure distribution in human-robot contact scenarios.",
    overview:
      "Created a full ADMET setup to measure contact pressure on seven cylindrical fixtures, providing cross-validation data for FEA simulations.",
    solution:
      "Integrated pressure-sensitive film, custom MATLAB closed-loop analysis (100+ tunable parameters) and automated report generation.",
    results: [
      "Cut analysis time 30× (30 min → 1 min)",
      "Enabled precise refinement of FEA models for robotic safety standards"
    ],
    techStack: ["MATLAB", "SolidWorks", "ADMET", "Pressure Film"],
    repoLink: "",
    demoLink: "",
    featured: false
  }
];

export const featuredProjects = projects.filter(p => p.featured);
export const allTags = [...new Set(projects.flatMap(p => p.tags))];