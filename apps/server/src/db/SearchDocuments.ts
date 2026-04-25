import { type SearchItem } from '@screengeometry/lib-api/spec'

export const SearchDocuments: Array<SearchItem> = [
  // ─── Standard 16:9 ────────────────────────────────────────────────────────

  // HD (720p) – budget/entry-level
  {
    id: 'HD2416:9',
    name: 'HD',
    label: 'HD 24" 1366x768 16:9',
    diagonalSize: 24,
    aspectRatio: '16:9',
    vRes: 768,
    hRes: 1366,
  },

  // Full HD (1080p) – most common mainstream size
  {
    id: 'FHD2416:9',
    name: 'FHD',
    label: 'FHD 24" 1920x1080 16:9',
    diagonalSize: 24,
    aspectRatio: '16:9',
    vRes: 1080,
    hRes: 1920,
  },
  {
    id: 'FHD2716:9',
    name: 'FHD',
    label: 'FHD 27" 1920x1080 16:9',
    diagonalSize: 27,
    aspectRatio: '16:9',
    vRes: 1080,
    hRes: 1920,
  },
  {
    id: 'FHD3216:9',
    name: 'FHD',
    label: 'FHD 32" 1920x1080 16:9',
    diagonalSize: 32,
    aspectRatio: '16:9',
    vRes: 1080,
    hRes: 1920,
  },

  // QHD / 2K (1440p) – sweet spot for gaming and productivity
  {
    id: 'QHD2716:9',
    name: 'QHD',
    label: 'QHD 27" 2560x1440 16:9',
    diagonalSize: 27,
    aspectRatio: '16:9',
    vRes: 1440,
    hRes: 2560,
  },
  {
    id: 'QHD3216:9',
    name: 'QHD',
    label: 'QHD 32" 2560x1440 16:9',
    diagonalSize: 32,
    aspectRatio: '16:9',
    vRes: 1440,
    hRes: 2560,
  },

  // 4K UHD (2160p) – Dell U2723QE, U3223QE, U4324QW, LG 27UK850, Samsung U32J590
  {
    id: '4K2716:9',
    name: '4K',
    label: '4K UHD 27" 3840x2160 16:9',
    diagonalSize: 27,
    aspectRatio: '16:9',
    vRes: 2160,
    hRes: 3840,
  },
  {
    id: '4K3216:9',
    name: '4K',
    label: '4K UHD 32" 3840x2160 16:9',
    diagonalSize: 32,
    aspectRatio: '16:9',
    vRes: 2160,
    hRes: 3840,
  },
  {
    id: '4K4216:9',
    name: '4K',
    label: '4K UHD 42" 3840x2160 16:9',
    diagonalSize: 42,
    aspectRatio: '16:9',
    vRes: 2160,
    hRes: 3840,
  },
  {
    id: '4K4316:9',
    name: '4K',
    label: '4K UHD 43" 3840x2160 16:9',
    diagonalSize: 43,
    aspectRatio: '16:9',
    vRes: 2160,
    hRes: 3840,
  },
  {
    id: '4K5516:9',
    name: '4K',
    label: '4K UHD 55" 3840x2160 16:9',
    diagonalSize: 55,
    aspectRatio: '16:9',
    vRes: 2160,
    hRes: 3840,
  },

  // 5K – Apple Studio Display (27"), Dell UltraSharp 27 5K (UP2715K)
  {
    id: '5K2716:9',
    name: '5K',
    label: '5K 27" 5120x2880 16:9',
    diagonalSize: 27,
    aspectRatio: '16:9',
    vRes: 2880,
    hRes: 5120,
  },

  // 6K – Apple Pro Display XDR (32")
  {
    id: '6K3216:9',
    name: '6K',
    label: '6K 32" 6016x3384 16:9',
    diagonalSize: 32,
    aspectRatio: '16:9',
    vRes: 3384,
    hRes: 6016,
  },

  // 8K – Dell UP3218K, Samsung 8K
  {
    id: '8K3216:9',
    name: '8K',
    label: '8K 32" 7680x4320 16:9',
    diagonalSize: 32,
    aspectRatio: '16:9',
    vRes: 4320,
    hRes: 7680,
  },

  // ─── Ultrawide 21:9 ───────────────────────────────────────────────────────

  // UWFHD (2560x1080) – LG 29WP500, Dell U2922DE
  {
    id: 'UWFHD2921:9',
    name: 'UWFHD',
    label: 'UWFHD 29" 2560x1080 21:9',
    diagonalSize: 29,
    aspectRatio: '21:9',
    vRes: 1080,
    hRes: 2560,
  },
  {
    id: 'UWFHD3421:9',
    name: 'UWFHD',
    label: 'UWFHD 34" 2560x1080 21:9',
    diagonalSize: 34,
    aspectRatio: '21:9',
    vRes: 1080,
    hRes: 2560,
  },

  // UWQHD (3440x1440) – LG 34GP950G, Dell AW3423DWF, Samsung Odyssey G5 34"
  {
    id: 'UWQHD3421:9',
    name: 'UWQHD',
    label: 'UWQHD 34" 3440x1440 21:9',
    diagonalSize: 34,
    aspectRatio: '21:9',
    vRes: 1440,
    hRes: 3440,
  },
  // LG 45GR95QE, Samsung Odyssey OLED G8 – 45" curved UWQHD
  {
    id: 'UWQHD4521:9',
    name: 'UWQHD',
    label: 'UWQHD 45" 3440x1440 21:9',
    diagonalSize: 45,
    aspectRatio: '21:9',
    vRes: 1440,
    hRes: 3440,
  },

  // UWQHD+ (3840x1600) – LG 38WN95C, Dell U3821DW; marketed as 21:9 (actual 12:5)
  {
    id: 'UWQHD+3821:9',
    name: 'UWQHD+',
    label: 'UWQHD+ 38" 3840x1600 21:9',
    diagonalSize: 38,
    aspectRatio: '21:9',
    vRes: 1600,
    hRes: 3840,
  },

  // UW5K2K (5120x2160) – LG 40WP95C, Dell U4025QW 40"
  {
    id: 'UW5K2K4021:9',
    name: 'UW5K2K',
    label: 'UW5K2K 40" 5120x2160 21:9',
    diagonalSize: 40,
    aspectRatio: '21:9',
    vRes: 2160,
    hRes: 5120,
  },

  // UW6K (6144x2560) – Dell UltraSharp 52 Thunderbolt Hub Monitor U5226KW
  // World's first 52" 6K ultrawide curved monitor (IPS Black, 120Hz, 129 PPI)
  {
    id: 'UW6K5221:9',
    name: 'UW6K',
    label: 'UW6K 52" 6144x2560 21:9',
    diagonalSize: 52,
    aspectRatio: '21:9',
    vRes: 2560,
    hRes: 6144,
  },

  // ─── Super Ultrawide 32:9 ─────────────────────────────────────────────────

  // DQHD / Dual QHD (5120x1440) – Samsung Odyssey G9 49", LG 49WQ95C
  {
    id: 'DQHD4932:9',
    name: 'DQHD',
    label: 'DQHD 49" 5120x1440 32:9',
    diagonalSize: 49,
    aspectRatio: '32:9',
    vRes: 1440,
    hRes: 5120,
  },

  // Dual 4K / 8K2K (7680x2160) – Samsung Odyssey Neo G9 57"
  {
    id: 'D4K5732:9',
    name: 'D4K',
    label: 'Dual 4K 57" 7680x2160 32:9',
    diagonalSize: 57,
    aspectRatio: '32:9',
    vRes: 2160,
    hRes: 7680,
  },

  // ─── 16:10 (productivity / creative) ─────────────────────────────────────

  // WUXGA – Dell U2422H, older pro monitors
  {
    id: 'WUXGA2416:10',
    name: 'WUXGA',
    label: 'WUXGA 24" 1920x1200 16:10',
    diagonalSize: 24,
    aspectRatio: '16:10',
    vRes: 1200,
    hRes: 1920,
  },
  {
    id: 'WUXGA2716:10',
    name: 'WUXGA',
    label: 'WUXGA 27" 1920x1200 16:10',
    diagonalSize: 27,
    aspectRatio: '16:10',
    vRes: 1200,
    hRes: 1920,
  },

  // WQXGA (2560x1600) – Dell UltraSharp 30" U3011, Apple older 30"
  {
    id: 'WQXGA3016:10',
    name: 'WQXGA',
    label: 'WQXGA 30" 2560x1600 16:10',
    diagonalSize: 30,
    aspectRatio: '16:10',
    vRes: 1600,
    hRes: 2560,
  },
  // Dell U2724D uses 16:10 at 27"
  {
    id: 'WQXGA2716:10',
    name: 'WQXGA',
    label: 'WQXGA 27" 2560x1600 16:10',
    diagonalSize: 27,
    aspectRatio: '16:10',
    vRes: 1600,
    hRes: 2560,
  },

  // 4K 16:10 (3840x2400) – Dell UP3221Q adjacent, HP Z32k G3
  {
    id: '4K3216:10',
    name: '4K',
    label: '4K 32" 3840x2400 16:10',
    diagonalSize: 32,
    aspectRatio: '16:10',
    vRes: 2400,
    hRes: 3840,
  },
]
