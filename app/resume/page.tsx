"use client";

import { motion } from "framer-motion";
import { Download, ExternalLink, Briefcase, GraduationCap, Award, BookOpen } from "lucide-react";
import { SectionTitle } from "@/components/ios/SectionTitle";
import { GlassCard } from "@/components/ios/GlassCard";
import { Button } from "@/components/ui/button";
import { resumeData } from "@/lib/resume";

export default function ResumePage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <SectionTitle>Resume</SectionTitle>
          <a href="/assets/PrithviSaranSathyasaran_Resume.pdf" download>
            <Button size="lg" className="gap-2 rounded-full" variant="glass">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </a>
        </div>

        <div className="space-y-12">
          {/* Education - Moved to Top */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold">Education</h2>
            </div>
            <div className="space-y-6">
              {resumeData.education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <GlassCard elevation={2} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{edu.degree}</h3>
                        <p className="text-primary font-medium">{edu.school}</p>
                        {edu.gpa && (
                          <p className="text-sm font-semibold text-muted-foreground mt-1">GPA: {edu.gpa}</p>
                        )}
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <p>{edu.grad}</p>
                        {edu.location && <p>{edu.location}</p>}
                      </div>
                    </div>
                    {edu.coursework && edu.coursework.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-2 mb-3">
                          <BookOpen className="w-4 h-4 text-primary" />
                          <p className="text-sm font-semibold text-foreground">Relevant Coursework:</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {edu.coursework.map((course, i) => (
                            <span
                              key={i}
                              className="px-3 py-1.5 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold">Experience</h2>
            </div>
            <div className="space-y-6">
              {resumeData.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <GlassCard elevation={2} className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold">{exp.role}</h3>
                        <p className="text-primary font-medium">{exp.company}</p>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <p>
                          {exp.start} – {exp.end}
                        </p>
                        {exp.location && <p>{exp.location}</p>}
                      </div>
                    </div>
                    <ul className="space-y-2 mb-4">
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    {exp.stack && (
                      <div className="flex flex-wrap gap-2">
                        {exp.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <ExternalLink className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold">Projects</h2>
            </div>
            <div className="space-y-6">
              {resumeData.projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <GlassCard elevation={2} className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold">{project.name}</h3>
                      {project.timeframe && (
                        <p className="text-sm text-muted-foreground">{project.timeframe}</p>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                    {project.highlights && (
                      <ul className="space-y-2 mb-4">
                        {project.highlights.map((highlight, i) => (
                          <li
                            key={i}
                            className="text-sm text-muted-foreground flex items-start gap-2"
                          >
                            <span className="text-primary mt-1">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {project.stack && (
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          {resumeData.certifications && resumeData.certifications.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-6 h-6 text-primary" />
                <h2 className="text-3xl font-bold">Certifications</h2>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <GlassCard elevation={2} className="p-6">
                  <ul className="space-y-2">
                    {resumeData.certifications.map((cert, index) => (
                      <li
                        key={index}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-primary mt-1">•</span>
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
