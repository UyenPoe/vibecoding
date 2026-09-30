export interface InspectionItem {
  name: string;
  status: "Passed" | "Warning";
}

export interface InspectionCategory {
  name: string;
  icon: string;
  score: string;
  items: InspectionItem[];
  note: string;
}

export interface InspectionReport {
  technician: string;
  technicianId: string;
  technicianTitle: string;
  date: string;
  totalPassed: string;
  overallScore: number;
  categories: InspectionCategory[];
}

export interface StoreStock {
  storeId: string;
  storeName: string;
  province: string;
  district: string;
  address: string;
  phone: string;
  status: "Còn hàng" | "Đang giữ" | "Tạm hết";
  stockCount: number;
}

export interface ProductVariantStorage {
  size: string;
  price: number;
  originalPrice: number;
}

export interface ProductVariantColor {
  name: string;
  colorCode: string;
  inStock: boolean;
}

export interface ProductVariantCondition {
  grade: string;
  label: string;
  priceDelta: number;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  brand: "Apple" | "Samsung" | "Xiaomi" | "Google Pixel" | "OPPO" | "vivo" | "realme" | "Nothing Phone";
  category: "iphone" | "samsung" | "xiaomi" | "google-pixel" | "oppo" | "used-phone" | "flagship";
  condition: "Mới 100% Fullbox" | "Grade A 99% Like New" | "Grade B 98%";
  conditionShort: "Mới 100%" | "Cũ 99%" | "Cũ 98%";
  conditionScore: number;
  batteryHealth: number;
  chargeCycles: number;
  storage: string;
  ram: string;
  color: string;
  price: number;
  originalPrice: number;
  installmentMonthly: number;
  imei: string;
  serial: string;
  thumbnail: string;
  gallery: Array<{
    label: string;
    url: string;
    alt: string;
  }>;
  rating: number;
  reviewCount: number;
  isHot?: boolean;
  isFlashSale?: boolean;
  isUnique?: boolean;
  storeLocation: StoreStock;
  allStores: StoreStock[];
  specs: {
    screen: string;
    chipset: string;
    camera: string;
    battery: string;
    os: string;
    waterproof: string;
    features: string[];
  };
  inspectionReport: InspectionReport;
  variants: {
    storages: ProductVariantStorage[];
    colors: ProductVariantColor[];
    conditions: ProductVariantCondition[];
  };
}

export interface FilterState {
  brand: string;
  priceRange: string;
  condition: string;
  storage: string;
  ram: string;
  features: string[];
  province: string;
  inStockOnly: boolean;
  searchQuery: string;
  sortBy: "popular" | "price-asc" | "price-desc" | "discount" | "rating" | "newest";
}

export interface Review {
  id: string;
  author: string;
  avatarText: string;
  rating: number;
  location: string;
  productName: string;
  content: string;
  date: string;
}

export interface TradeInOption {
  model: string;
  baseValue: number;
  brand: string;
}
