import { Platform, TextStyle } from 'react-native';

// ═══════════════════════════════════════════════════════════
// DARK MODE PALETTE
// Extracted from HolyBook design reference screenshots
// ═══════════════════════════════════════════════════════════
export const DARK = {
  // ── Backgrounds ──────────────────────────────────────────
  bg:               '#0A0A0F',
  surface:          '#12121A',
  surfaceHigh:      '#1A1A26',
  card:             '#14141E',
  overlay:          'rgba(10,10,15,0.94)',

  // ── Borders ──────────────────────────────────────────────
  border:           '#1E1E2E',
  borderSubtle:     'rgba(255,255,255,0.06)',
  borderGold:       'rgba(201,168,76,0.40)',

  // ── Gold — Brand Accent ───────────────────────────────────
  gold:             '#C9A84C',
  goldLight:        '#E8C878',
  goldDark:         '#A07C2A',
  goldMuted:        'rgba(201,168,76,0.14)',
  goldGlow:         'rgba(201,168,76,0.28)',

  // ── Text ─────────────────────────────────────────────────
  textPrimary:      '#FFFFFF',
  textSecondary:    '#8888AA',
  textMuted:        '#44445A',
  textGold:         '#C9A84C',
  textOnGold:       '#0A0A0F',
  textVerse:        '#E8E8F0',

  // ── Glassmorphism ─────────────────────────────────────────
  glassBg:          'rgba(18,18,26,0.75)',
  glassStroke:      'rgba(201,168,76,0.18)',
  glassTint:        'rgba(201,168,76,0.04)',

  // ── Book Categories ───────────────────────────────────────
  law:              '#C9A84C',
  history:          '#6B8CFF',
  poetry:           '#E87040',
  prophecy:         '#A855F7',
  gospel:           '#22C55E',
  epistle:          '#F43F5E',
  apocalypse:       '#EC4899',

  // ── Status ───────────────────────────────────────────────
  success:          '#22C55E',
  error:            '#EF4444',
  warning:          '#F59E0B',
  info:             '#3B82F6',

  // ── Tab Bar ──────────────────────────────────────────────
  tabActive:        '#C9A84C',
  tabInactive:      '#44445A',
  tabBg:            '#0E0E18',
  tabBorder:        'rgba(201,168,76,0.15)',

  // ── Highlights (verse marking colors) ────────────────────
  hlYellow:         'rgba(201,168,76,0.30)',
  hlBlue:           'rgba(107,140,255,0.28)',
  hlGreen:          'rgba(34,197,94,0.28)',
  hlPink:           'rgba(244,63,94,0.28)',

  // ── Skeleton Loading ─────────────────────────────────────
  skeletonBase:     '#1A1A26',
  skeletonShimmer:  '#24243A',

  // ── Chapter Navigator strip ───────────────────────────────
  navStrip:         '#0E0E18',
  navStripBorder:   'rgba(201,168,76,0.20)',
} as const;

// ═══════════════════════════════════════════════════════════
// LIGHT MODE PALETTE
// ═══════════════════════════════════════════════════════════
export const LIGHT = {
  // ── Backgrounds ──────────────────────────────────────────
  bg:               '#F5F2EB',
  surface:          '#FFFFFF',
  surfaceHigh:      '#FAF8F3',
  card:             '#FFFFFF',
  overlay:          'rgba(245,242,235,0.96)',

  // ── Borders ──────────────────────────────────────────────
  border:           '#E5E1D5',
  borderSubtle:     'rgba(0,0,0,0.07)',
  borderGold:       'rgba(160,124,16,0.40)',

  // ── Gold ─────────────────────────────────────────────────
  gold:             '#A07C10',
  goldLight:        '#C9A84C',
  goldDark:         '#7A5E08',
  goldMuted:        'rgba(160,124,16,0.10)',
  goldGlow:         'rgba(160,124,16,0.16)',

  // ── Text ─────────────────────────────────────────────────
  textPrimary:      '#1A1825',
  textSecondary:    '#6A6880',
  textMuted:        '#B0ADBC',
  textGold:         '#A07C10',
  textOnGold:       '#FFFFFF',
  textVerse:        '#2A2835',

  // ── Glassmorphism ─────────────────────────────────────────
  glassBg:          'rgba(255,252,245,0.80)',
  glassStroke:      'rgba(160,124,16,0.22)',
  glassTint:        'rgba(160,124,16,0.03)',

  // ── Book Categories ───────────────────────────────────────
  law:              '#A07C10',
  history:          '#2563EB',
  poetry:           '#C0570A',
  prophecy:         '#7C3AED',
  gospel:           '#15803D',
  epistle:          '#BE123C',
  apocalypse:       '#BE185D',

  // ── Status ───────────────────────────────────────────────
  success:          '#15803D',
  error:            '#DC2626',
  warning:          '#D97706',
  info:             '#2563EB',

  // ── Tab Bar ──────────────────────────────────────────────
  tabActive:        '#A07C10',
  tabInactive:      '#B0ADBC',
  tabBg:            '#FFFFFF',
  tabBorder:        'rgba(160,124,16,0.12)',

  // ── Highlights ───────────────────────────────────────────
  hlYellow:         'rgba(160,124,16,0.22)',
  hlBlue:           'rgba(37,99,235,0.18)',
  hlGreen:          'rgba(21,128,61,0.18)',
  hlPink:           'rgba(190,18,60,0.18)',

  // ── Skeleton Loading ─────────────────────────────────────
  skeletonBase:     '#EDE9DF',
  skeletonShimmer:  '#F5F2EB',

  // ── Chapter Navigator strip ───────────────────────────────
  navStrip:         '#FFFFFF',
  navStripBorder:   'rgba(160,124,16,0.18)',
} as const;

// ═══════════════════════════════════════════════════════════
// TYPOGRAPHY
// ═══════════════════════════════════════════════════════════
export const FONT = {
  size: {
    xs:   11,
    sm:   13,
    base: 15,
    md:   17,
    lg:   20,
    xl:   24,
    xxl:  30,
    hero: 38,
  },
  weight: {
    regular:  '400' as TextStyle['fontWeight'],
    medium:   '500' as TextStyle['fontWeight'],
    semiBold: '600' as TextStyle['fontWeight'],
    bold:     '700' as TextStyle['fontWeight'],
  },
  lineHeight: {
    tight:   1.25,
    normal:  1.55,
    relaxed: 1.80,
    verse:   2.00,
  },
  family: {
    sans: Platform.OS === 'ios' ? 'System' : 'Roboto',
    mono: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
} as const;

// ═══════════════════════════════════════════════════════════
// SPACING
// ═══════════════════════════════════════════════════════════
export const SPACE = {
  xs:   4,
  sm:   8,
  md:   12,
  lg:   16,
  xl:   20,
  xxl:  28,
  xxxl: 40,
  huge: 64,
} as const;

// ═══════════════════════════════════════════════════════════
// BORDER RADIUS
// ═══════════════════════════════════════════════════════════
export const RADIUS = {
  xs:   6,
  sm:   10,
  md:   14,
  lg:   20,
  xl:   28,
  full: 9999,
} as const;

// ═══════════════════════════════════════════════════════════
// SHADOWS
// ═══════════════════════════════════════════════════════════
export const SHADOW = {
  none: {},
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 3,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 14,
    elevation: 8,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 28,
    elevation: 16,
  },
  gold: {
    shadowColor: '#C9A84C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
} as const;

// ═══════════════════════════════════════════════════════════
// GRADIENTS (arrays for LinearGradient)
// ═══════════════════════════════════════════════════════════
export const GRADIENT = {
  gold:       ['#C9A84C', '#A07C2A'] as const,
  goldSubtle: ['rgba(201,168,76,0.18)', 'rgba(201,168,76,0.04)'] as const,
  darkBg:     ['#0A0A0F', '#12121A'] as const,
  darkCard:   ['#1A1A26', '#12121A'] as const,
  lightCard:  ['#FFFFFF', '#FAF8F3'] as const,
  dailyVerse: ['#1C1505', '#2A1F08'] as const,
  navStrip:   ['rgba(14,14,24,0.0)', '#0E0E18'] as const,
} as const;

// ═══════════════════════════════════════════════════════════
// ANIMATION DURATIONS
// ═══════════════════════════════════════════════════════════
export const ANIM = {
  fast:    150,
  normal:  250,
  slow:    400,
  skeleton:1200,
} as const;

// ═══════════════════════════════════════════════════════════
// TYPE EXPORTS
// ═══════════════════════════════════════════════════════════
export type ThemeColors = typeof DARK;
export type FontSizeKey = 'sm' | 'md' | 'lg' | 'xl';

export const VERSE_FONT_SIZE: Record<FontSizeKey, number> = {
  sm: 15,
  md: 17,
  lg: 20,
  xl: 24,
};