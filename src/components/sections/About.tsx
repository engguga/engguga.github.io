'use client'

import { useI18n } from '@/lib/i18n'
import SectionWrapper from '@/components/ui/SectionWrapper'

const SKILLS = [
  'Java', 'Spring Boot', 'Python', 'Flask', 'Django',
  'Go', 'TypeScript', 'React', 'JavaScript',
  'PostgreSQL', 'Docker', 'Linux',
  'Git / CI-CD', 'LLMs', 'Pentest',
  'SSL/TLS', 'OWASP', 'Shodan',
]

export default function About() {
  const { t } = useI18n()
  const a = t.about

  return (
    <SectionWrapper id="about" className="max-w-5xl mx-auto px-6 py-24">
      {/* Label */}
      <p className="text-xs font-mono text-[#3b82f6] uppercase tracking-widest mb-4">
        {a.label}
      </p>

      <div className="grid md:grid-cols-[1fr_300px] gap-16">
        {/* Text */}
        <div>
          <h2 className="text-3xl font-semibold text-[#fafafa] mb-8">{a.title}</h2>

          <div className="space-y-5 text-[#a1a1aa] leading-relaxed">
            <p>{a.body_1}</p>
            <p>{a.body_2}</p>
            <p>{a.body_3}</p>
            <p>{a.body_4}</p>
          </div>
        </div>

        {/* Sidebar: Skills + Education */}
        <div className="space-y-10">
          {/* Skills */}
          <div>
            <h3 className="text-xs font-mono text-[#52525b] uppercase tracking-widest mb-4">
              {a.skills_label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map(skill => (
                <span key={skill} className="tag">{skill}</span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xs font-mono text-[#52525b] uppercase tracking-widest mb-4">
              {a.education_label}
            </h3>
            <div className="border border-[#27272a] rounded-xl p-4 bg-[#111113]">
              <p className="text-sm font-medium text-[#fafafa]">{a.education_degree}</p>
              <p className="text-sm text-[#a1a1aa] mt-1">{a.education_institution}</p>
              <p className="text-xs font-mono text-[#52525b] mt-2">{a.education_period}</p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
