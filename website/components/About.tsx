'use client';

import { motion } from 'motion/react';

export function About() {
  const education = [
    { school: 'Cardiff Metropolitan University, UK', degree: 'BSc (Hons) Software Engineering (First Class)', year: '2026' },
    { school: 'Cardiff Metropolitan University, UK', degree: 'Diploma in Computer Science & Software Engineering', year: '2024' },
  ];

  const certifications = [
    { title: 'AWS Cloud Practitioner', issuer: 'AWS', year: '2026' },
    { title: 'HashiCorp Certified: Terraform Associate (004)', issuer: 'HashiCorp', year: '2026' },
    { title: 'GitHub Foundations', issuer: 'GitHub', year: '2025' },
    { title: 'Introduction to Jenkins (LFS167)', issuer: 'The Linux Foundation', year: '2025' },
    { title: '100 Days of Cloud (AWS) / DevOps', issuer: 'KodeKloud', year: '2026' },
  ];

  const skills = [
    "AWS (EKS, ECS, EC2)", "Terraform", "Ansible", "Kubernetes", "Docker", "Istio", "ArgoCD", "Helm", "GitHub Actions", "Jenkins", "Python", "JavaScript/React", "Java", "SQL"
  ];

  return (
    <section id="about" className="py-[80px] md:py-[120px] px-6 md:px-11">
      <div className="flex justify-between items-center pb-5 border-b border-border mb-10 md:mb-16">
        <div>
          <p className="text-[10px] tracking-[0.14em] uppercase text-muted mb-2">My story</p>
          <h2 className="font-syne text-[14vw] min-[480px]:text-[clamp(52px,8vw,110px)] max-[480px]:hyphens-manual max-[480px]:break-words font-extrabold tracking-[-0.045em] leading-[0.88]">
            About
          </h2>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-12 md:gap-20 mt-12 md:mt-20 items-start">
        <div className="flex flex-col gap-6">
          <motion.p 
            className="text-[clamp(17px,1.7vw,22px)] leading-[1.62] font-light text-muted"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <strong className="font-light text-fg">DevOps Engineer Intern candidate</strong> with hands-on experience in CI/CD automation, cloud infrastructure, Docker, and Infrastructure as Code (Terraform).
          </motion.p>
          <motion.p 
            className="text-[clamp(17px,1.7vw,22px)] leading-[1.62] font-light text-muted"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
          >
            I am currently expanding my knowledge in <strong className="font-light text-fg">Kubernetes fundamentals</strong>, getting practical exposure through personal projects and certifications.
          </motion.p>
          <motion.p 
            className="text-[clamp(17px,1.7vw,22px)] leading-[1.62] font-light text-muted"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.16, ease: "easeOut" }}
          >
            With a background in Software Engineering, I bring a strong interest in <strong className="font-light text-fg">cloud-native technologies and DevOps practices</strong>, focused on bridging the gap between development and operations.
          </motion.p>
          
          <motion.a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-[7px] self-start bg-transparent border border-border rounded-full py-[7px] px-[15px] text-muted font-inter text-[11px] tracking-[0.08em] uppercase whitespace-nowrap transition-all duration-300 hover:bg-fg hover:text-bg hover:border-fg group mt-5"
            data-cursor
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.3, ease: "easeOut" }}
          >
            View Resume
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 transition-all duration-300 group-hover:translate-x-[3px]">
              <path d="M2 12L12 2M12 2H4M12 2V10" />
            </svg>
          </motion.a>
        </div>
        
        <div className="flex flex-col gap-11">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
          >
            <h3 className="text-[10px] tracking-[0.14em] uppercase text-muted mb-4">Education</h3>
            <ul className="flex flex-col">
              {education.map((e, i) => (
                <li key={i} className="flex justify-between items-baseline py-3.5 border-b border-border gap-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-syne text-[14px] font-bold tracking-[-0.01em]">{e.school}</span>
                    <span className="text-[12px] text-muted">{e.degree}</span>
                  </div>
                  <span className="text-[11px] text-muted whitespace-nowrap shrink-0">{e.year}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
          >
            <h3 className="text-[10px] tracking-[0.14em] uppercase text-muted mb-4">Certifications</h3>
            <ul className="flex flex-col">
              {certifications.map((a, i) => (
                <li key={i} className="flex justify-between items-baseline py-3.5 border-b border-border gap-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-syne text-[14px] font-bold tracking-[-0.01em]">{a.title}</span>
                    <span className="text-[12px] text-muted">{a.issuer}</span>
                  </div>
                  <span className="text-[11px] text-muted whitespace-nowrap shrink-0">{a.year}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.3, ease: "easeOut" }}
          >
            <h3 className="text-[10px] tracking-[0.14em] uppercase text-muted mb-4">Core Skills</h3>
            <div className="flex flex-wrap gap-[7px]">
              {skills.map((s, i) => (
                <span key={i} className="text-[11px] tracking-[0.06em] px-3.5 py-1.5 border border-border rounded-full text-muted">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

