import { PortableText as PT, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-display text-2xl font-extrabold text-text-primary mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-xl font-bold text-text-primary mt-8 mb-3">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="text-text-secondary leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gold pl-4 py-2 my-4 text-text-secondary italic"
        style={{ background: 'rgba(245,168,0,0.04)' }}>
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-text-primary">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer"
        className="text-gold underline underline-offset-2 hover:text-gold-light transition-colors">
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside text-text-secondary space-y-1 mb-4">{children}</ol>,
  },
  types: {
    image: ({ value }: any) => (
      <figure className="my-8">
        <Image src={value.asset?.url || ''} alt={value.alt || ''} width={800} height={450}
          className="rounded-xl w-full object-cover" style={{ maxHeight: 450 }} />
        {value.caption && (
          <figcaption className="text-center text-text-muted text-sm mt-2">{value.caption}</figcaption>
        )}
      </figure>
    ),
  },
}

export default function PortableText({ value }: { value: any }) {
  if (!value) return null
  return <PT value={value} components={components} />
}
