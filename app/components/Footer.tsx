'use client'

interface SocialLink {
  platform?: string
  url?: string
}

interface Props {
  copyrightText?: string
  footerTagline?: string
  socialLinks?: SocialLink[]
}

function TikTokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.16 8.16 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07z" />
    </svg>
  )
}
function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  )
}
function YouTubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

const iconMap: Record<string, React.FC> = {
  TikTok: TikTokIcon,
  Facebook: FacebookIcon,
  YouTube: YouTubeIcon,
}

export default function Footer({ copyrightText, footerTagline, socialLinks }: Props) {
  const links = (socialLinks && socialLinks.length > 0)
    ? socialLinks
    : [
        { platform: 'TikTok', url: 'https://www.tiktok.com/@physics.scout' },
        { platform: 'Facebook', url: 'https://www.facebook.com/share/1J7aAipsN9/' },
        { platform: 'YouTube', url: 'https://youtube.com/@physics-scout' },
      ]

  return (
    <footer className="py-8 px-6 lg:px-16"
      style={{ backgroundColor: '#0D1117', borderTop: '1px solid rgba(245,168,0,0.08)' }}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-center sm:text-left">
          <p className="text-text-muted text-sm">
              &copy; 2025{' '}
            <span className="text-gold font-medium">{copyrightText || 'Physics Scout Academy'}</span>
            {' '}&middot; Parachinar, District Kurram, Pakistan
          </p>
          <p className="text-text-muted text-xs mt-1">{footerTagline || 'Crafting better physics education'}</p>
        </div>
        <div className="flex items-center gap-3">
          {links.map((s) => {
            const Icon = iconMap[s.platform || ''] || TikTokIcon
            return (
              <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer"
                aria-label={s.platform}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-text-muted transition-all duration-200 hover:text-gold"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,168,0,0.3)'; (e.currentTarget as HTMLElement).style.background = 'rgba(245,168,0,0.08)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)' }}>
                <Icon />
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
