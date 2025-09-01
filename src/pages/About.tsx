import { Download, MapPin, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const About = () => {
  const skills = [
    "Python", "C++", "JavaScript", "TypeScript", "React", "Node.js",
    "TensorFlow", "PyTorch", "ROS", "Docker", "AWS", "PostgreSQL",
    "Machine Learning", "Computer Vision", "Robotics", "IoT",
    "System Design", "Hardware Design", "3D Printing", "CAD"
  ];

  const timeline = [
    {
      year: "2028",
      title: "B.S. Mechanical Engineering",
      company: "University of Maryland",
      description: "4.00 GPA. Member of QUEST Program.",
      location: "College Park, MD"
    },
    {
      year: "2025",
      title: "Drone Software Intern",
      company: "Crossfire - UMD XPRIZE Wildfire Compeition Team", 
      description: "Developing a machine learning–powered wildfire detection and multi-drone coordination system.",
      location: "College Park, MD"
    },
    {
      year: "2025",
      title: "Mechanical Officer",
      company: "Robotics At Maryland - Testudog", 
      description: "Iterating Quadruped robot design for competition at ICRA 2026.",
      location: "College Park, MD"
    },
    {
    year: "2025",
    title: "Research Fellow",
    company: "National Institute of Standards and Technology (NIST)",
    description:
      "Created an ADMET test setup to measure human–robot contact pressure on seven cylindrical objects. Built a MATLAB closed-loop film-analysis tool that cut data-processing time from 30 min to 1 min",
    location: "Gaithersburg, MD"
    },
    {
    year: "2024",
    title: "Research Assistant",
    company: "National Institute of Standards and Technology (NIST)",
    description:
      "Redesigned the ICRA manipulation board into four modular quadrants, raising task complexity 1.5× and improving manufacturability",
    location: "Gaithersburg, MD"
    },
    {
    year: "2023",
    title: "Intern",
    company: "National Institute of Standards and Technology (NIST)",
    description:
      "Bench-marked grasp strength on three robotic hands to validate a new national standard. Reinforced the Yale OpenHand Model T, boosting durability 5× and grasp force from 11 N to 34 N",
    location: "Gaithersburg, MD"
    } 
  ];

  const achievements = [
    "Best Mission Award - OTV Project",
    "Best Constructed Vehicle Honorable Mention - OTV Project",
    "NIST Research featured in Research Journal"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              {/* Profile Image Placeholder */}
              <div className="lg:col-span-1">
                {/* Profile Image */}
                <div className="lg:col-span-1">
                  {/* gradient frame */}
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20
                                  rounded-2xl border border-border p-1">
                    <img
                      src="/headshot.jpg"                /* path in /public */
                      alt="Professional headshot"
                      className="w-full h-full rounded-2xl object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Bio Content */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h1 className="font-space-grotesk font-bold text-4xl md:text-5xl mb-4">
                    About Me
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    Engineer, Inventor, Problem Solver
                  </p>
                </div>

                <div className="space-y-4 text-lg leading-relaxed">
                  <p>
                    I’m a passionate engineer with experience spanning robotics, computer 
                    vision, machine learning, and mechanical design. From developing AI-powered 
                    wildfire detection and multi-drone coordination systems to leading the 
                    design of competition-grade robots, I enjoy building innovative solutions 
                    that merge hardware and software.

                  </p>
                  
                  <p>
                    Recently, I’ve contributed to national robotics research, competitive
                    engineering teams, and hands-on prototyping, with a focus on automation, 
                    sensing, and system integration. I thrive in multidisciplinary 
                    environments that challenge me to combine technical depth with creative 
                    problem-solving.
                  </p>
                </div>

                <Button asChild size="lg" className="glow-effect">
                  <a href="/Madyann_Saidi_Resume.pdf" download className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Download Full Resume
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-12 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-space-grotesk font-bold text-3xl mb-8 text-center">
              Technical Skills
            </h2>
            
            <div className="flex flex-wrap gap-3 justify-center">
              {skills.map((skill) => (
                <Badge 
                  key={skill} 
                  variant="secondary" 
                  className="px-4 py-2 text-sm hover:bg-primary/10 transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-space-grotesk font-bold text-3xl mb-12 text-center">
              Professional Timeline
            </h2>
            
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <Card 
                  key={index} 
                  className="border-border hover:border-primary/30 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="md:w-20 flex-shrink-0">
                        <Badge variant="outline" className="text-primary border-primary">
                          {item.year}
                        </Badge>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-space-grotesk font-semibold text-xl mb-1">
                          {item.title}
                        </h3>
                        <p className="text-primary font-medium mb-2">
                          {item.company}
                        </p>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                          <MapPin className="h-4 w-4" />
                          {item.location}
                        </div>
                        <p className="text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-12 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-space-grotesk font-bold text-3xl mb-8">
              Recognition & Achievements
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:border-primary/30 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Award className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-left">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;