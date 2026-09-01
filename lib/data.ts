export type ImageType = "main" | "front" | "fold" | "ruler" | "print"

export const imageTypeMeta: { type: ImageType; label: string }[] = [
  { type: "main", label: "大图" },
  { type: "front", label: "正面图" },
  { type: "fold", label: "折脚图" },
  { type: "ruler", label: "尺子图" },
  { type: "print", label: "印花图" },
]

export type ImageGroup = {
  type: ImageType
  images: string[]
}

export const colorFamilies = [
  { id: "neutral", name: "米白系", hex: "#e3d9c4" },
  { id: "green", name: "绿色系", hex: "#9caa93" },
  { id: "blue", name: "蓝色系", hex: "#37485f" },
  { id: "brown", name: "棕橙系", hex: "#b56a4b" },
  { id: "yellow", name: "黄色系", hex: "#c9922f" },
  { id: "pink", name: "粉色系", hex: "#e6c9cb" },
  { id: "gray", name: "灰黑系", hex: "#4a4a4d" },
]

export type Product = {
  id: string
  name: string
  code: string
  category: string
  family: string
  images: string[]
  imageGroups: ImageGroup[]
  composition: string
  weight: string
  width: string
  unit: string
  hangCode: string
  colorName: string
  colorHex: string
  price: string
  tags: string[]
}

export type SampleStatus = "pending" | "processing" | "done"

export type SampleRecord = {
  id: string
  productId: string
  productName: string
  productCode: string
  image: string
  color: string
  quantity: number
  remark: string
  contact: string
  phone: string
  stall: string
  createdAt: string
  status: SampleStatus
}

export const categories = [
  { id: "all", name: "全部" },
  { id: "cotton", name: "棉麻" },
  { id: "silk", name: "真丝" },
  { id: "wool", name: "毛呢" },
  { id: "denim", name: "牛仔" },
  { id: "chiffon", name: "雪纺" },
  { id: "corduroy", name: "灯芯绒" },
]

export const products: Product[] = [
  {
    id: "p1",
    name: "本色亚麻布",
    code: "LN-2401",
    category: "cotton",
    family: "neutral",
    images: ["/fabrics/linen-oat.png"],
    imageGroups: [
      { type: "main", images: ["/fabrics/linen-oat.png"] },
      { type: "front", images: ["/fabrics/linen-front.png"] },
      { type: "fold", images: ["/fabrics/linen-fold.png"] },
      { type: "ruler", images: ["/fabrics/linen-ruler.png"] },
      { type: "print", images: ["/fabrics/linen-print.png"] },
    ],
    composition: "100% 亚麻",
    weight: "220 g/m²",
    width: "145 cm",
    unit: "米",
    hangCode: "A-08",
    colorName: "燕麦色",
    colorHex: "#d8cbb0",
    price: "¥ 38.00 / 米",
    tags: ["透气", "亲肤", "夏季"],
  },
  {
    id: "p2",
    name: "鼠尾草纯棉",
    code: "CT-1088",
    category: "cotton",
    family: "green",
    images: ["/fabrics/sage-cotton.png"],
    imageGroups: [
      { type: "main", images: ["/fabrics/sage-cotton.png"] },
      { type: "front", images: ["/fabrics/sage-cotton.png"] },
    ],
    composition: "100% 精梳棉",
    weight: "180 g/m²",
    width: "150 cm",
    unit: "米",
    hangCode: "B-12",
    colorName: "鼠尾草绿",
    colorHex: "#9caa93",
    price: "¥ 26.50 / 米",
    tags: ["柔软", "四季", "亲肤"],
  },
  {
    id: "p3",
    name: "靛蓝水洗牛仔",
    code: "DN-3302",
    category: "denim",
    family: "blue",
    images: ["/fabrics/navy-denim.png"],
    imageGroups: [
      { type: "main", images: ["/fabrics/navy-denim.png"] },
      { type: "front", images: ["/fabrics/navy-denim.png"] },
    ],
    composition: "98% 棉 2% 氨纶",
    weight: "340 g/m²",
    width: "148 cm",
    unit: "米",
    hangCode: "C-05",
    colorName: "靛蓝色",
    colorHex: "#37485f",
    price: "¥ 45.00 / 米",
    tags: ["挺括", "耐磨", "微弹"],
  },
  {
    id: "p4",
    name: "陶土羊毛呢",
    code: "WL-5510",
    category: "wool",
    family: "brown",
    images: ["/fabrics/terracotta-wool.png"],
    imageGroups: [
      { type: "main", images: ["/fabrics/terracotta-wool.png"] },
      { type: "front", images: ["/fabrics/terracotta-wool.png"] },
    ],
    composition: "70% 羊毛 30% 涤纶",
    weight: "420 g/m²",
    width: "150 cm",
    unit: "米",
    hangCode: "D-21",
    colorName: "陶土棕",
    colorHex: "#b56a4b",
    price: "¥ 88.00 / 米",
    tags: ["保暖", "秋冬", "厚实"],
  },
  {
    id: "p5",
    name: "奶油真丝缎",
    code: "SK-2205",
    category: "silk",
    family: "neutral",
    images: ["/fabrics/cream-silk.png"],
    imageGroups: [
      { type: "main", images: ["/fabrics/cream-silk.png"] },
      { type: "front", images: ["/fabrics/cream-silk.png"] },
    ],
    composition: "100% 桑蚕丝",
    weight: "120 g/m²",
    width: "114 cm",
    unit: "米",
    hangCode: "E-03",
    colorName: "奶油白",
    colorHex: "#efe6d3",
    price: "¥ 128.00 / 米",
    tags: ["光泽", "垂顺", "高端"],
  },
  {
    id: "p6",
    name: "橄榄斜纹布",
    code: "TW-4417",
    category: "cotton",
    family: "green",
    images: ["/fabrics/olive-twill.png"],
    imageGroups: [
      { type: "main", images: ["/fabrics/olive-twill.png"] },
      { type: "front", images: ["/fabrics/olive-twill.png"] },
    ],
    composition: "100% 棉斜纹",
    weight: "260 g/m²",
    width: "150 cm",
    unit: "米",
    hangCode: "B-19",
    colorName: "橄榄绿",
    colorHex: "#6f7350",
    price: "¥ 34.00 / 米",
    tags: ["挺括", "工装", "耐穿"],
  },
  {
    id: "p7",
    name: "藕粉雪纺纱",
    code: "CF-7701",
    category: "chiffon",
    family: "pink",
    images: ["/fabrics/blush-chiffon.png"],
    imageGroups: [
      { type: "main", images: ["/fabrics/blush-chiffon.png"] },
      { type: "front", images: ["/fabrics/blush-chiffon.png"] },
    ],
    composition: "100% 聚酯纤维",
    weight: "75 g/m²",
    width: "150 cm",
    unit: "米",
    hangCode: "F-07",
    colorName: "藕粉色",
    colorHex: "#e6c9cb",
    price: "¥ 22.00 / 米",
    tags: ["轻薄", "飘逸", "夏季"],
  },
  {
    id: "p8",
    name: "炭灰精纺呢",
    code: "WL-5588",
    category: "wool",
    family: "gray",
    images: ["/fabrics/charcoal-wool.png"],
    imageGroups: [
      { type: "main", images: ["/fabrics/charcoal-wool.png"] },
      { type: "front", images: ["/fabrics/charcoal-wool.png"] },
    ],
    composition: "80% 羊毛 20% 涤纶",
    weight: "380 g/m²",
    width: "150 cm",
    unit: "米",
    hangCode: "D-33",
    colorName: "炭灰色",
    colorHex: "#4a4a4d",
    price: "¥ 96.00 / 米",
    tags: ["西装", "挺括", "商务"],
  },
  {
    id: "p9",
    name: "姜黄灯芯绒",
    code: "CD-6620",
    category: "corduroy",
    family: "yellow",
    images: ["/fabrics/mustard-corduroy.png"],
    imageGroups: [
      { type: "main", images: ["/fabrics/mustard-corduroy.png"] },
      { type: "front", images: ["/fabrics/mustard-corduroy.png"] },
    ],
    composition: "100% 棉",
    weight: "300 g/m²",
    width: "140 cm",
    unit: "米",
    hangCode: "G-02",
    colorName: "姜黄色",
    colorHex: "#c9922f",
    price: "¥ 42.00 / 米",
    tags: ["复古", "秋冬", "有肌理"],
  },
]

export const hotSearches = ["亚麻", "纯棉", "真丝", "牛仔", "雪纺", "灯芯绒"]

export const initialRecords: SampleRecord[] = [
  {
    id: "r1",
    productId: "p2",
    productName: "鼠尾草纯棉",
    productCode: "CT-1088",
    image: "/fabrics/sage-cotton.png",
    color: "鼠尾草绿",
    quantity: 3,
    remark: "需要在本周内寄出",
    contact: "陈女士",
    phone: "138****6621",
    stall: "东升面料 A12 档口",
    createdAt: "2026-08-28 14:32",
    status: "processing",
  },
  {
    id: "r2",
    productId: "p5",
    productName: "奶油真丝缎",
    productCode: "SK-2205",
    image: "/fabrics/cream-silk.png",
    color: "奶油白",
    quantity: 2,
    remark: "",
    contact: "陈女士",
    phone: "138****6621",
    stall: "东升面料 A12 档口",
    createdAt: "2026-08-20 09:15",
    status: "done",
  },
]

export const statusMeta: Record<SampleStatus, { label: string; className: string }> = {
  pending: { label: "待��理", className: "bg-secondary text-secondary-foreground" },
  processing: { label: "处理中", className: "bg-primary/15 text-primary" },
  done: { label: "已完成", className: "bg-muted text-muted-foreground" },
}
