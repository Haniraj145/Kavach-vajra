export interface CityData {
  name: string;
  country: string;
  flag: string;
  avgDelay: number;
  congestionIndex: number;
  annualDeaths: number;
  economicLoss: string;
  population: string;
  projectedDelay: number;
  projectedLivesSaved: number;
  projectedCostSavings: string;
  projectedFasterPercent: number;
}

export const cityData: CityData[] = [
  { name: "Mumbai", country: "India", flag: "🇮🇳", avgDelay: 32, congestionIndex: 91, annualDeaths: 35240, economicLoss: "₹88,100Cr", population: "21M", projectedDelay: 18, projectedLivesSaved: 14096, projectedCostSavings: "₹35,240Cr", projectedFasterPercent: 44 },
  { name: "Delhi", country: "India", flag: "🇮🇳", avgDelay: 35, congestionIndex: 93, annualDeaths: 38500, economicLoss: "₹96,250Cr", population: "32M", projectedDelay: 20, projectedLivesSaved: 15400, projectedCostSavings: "₹38,500Cr", projectedFasterPercent: 43 },
  { name: "Bangalore", country: "India", flag: "🇮🇳", avgDelay: 30, congestionIndex: 88, annualDeaths: 22100, economicLoss: "₹55,250Cr", population: "13M", projectedDelay: 17, projectedLivesSaved: 8840, projectedCostSavings: "₹22,100Cr", projectedFasterPercent: 43 },
  { name: "Hyderabad", country: "India", flag: "🇮🇳", avgDelay: 28, congestionIndex: 85, annualDeaths: 18200, economicLoss: "₹45,500Cr", population: "10.5M", projectedDelay: 16, projectedLivesSaved: 7280, projectedCostSavings: "₹18,200Cr", projectedFasterPercent: 43 },
  { name: "Chennai", country: "India", flag: "🇮🇳", avgDelay: 30, congestionIndex: 87, annualDeaths: 20800, economicLoss: "₹52,000Cr", population: "11.5M", projectedDelay: 17, projectedLivesSaved: 8320, projectedCostSavings: "₹20,800Cr", projectedFasterPercent: 43 },
  { name: "Kolkata", country: "India", flag: "🇮🇳", avgDelay: 34, congestionIndex: 90, annualDeaths: 28890, economicLoss: "₹72,225Cr", population: "15.1M", projectedDelay: 20, projectedLivesSaved: 11556, projectedCostSavings: "₹28,890Cr", projectedFasterPercent: 41 },
  { name: "Pune", country: "India", flag: "🇮🇳", avgDelay: 26, congestionIndex: 82, annualDeaths: 12500, economicLoss: "₹31,250Cr", population: "7.4M", projectedDelay: 15, projectedLivesSaved: 5000, projectedCostSavings: "₹12,500Cr", projectedFasterPercent: 42 },
  { name: "Ahmedabad", country: "India", flag: "🇮🇳", avgDelay: 25, congestionIndex: 80, annualDeaths: 14200, economicLoss: "₹35,500Cr", population: "8.6M", projectedDelay: 14, projectedLivesSaved: 5680, projectedCostSavings: "₹14,200Cr", projectedFasterPercent: 44 },
  { name: "Surat", country: "India", flag: "🇮🇳", avgDelay: 22, congestionIndex: 75, annualDeaths: 9800, economicLoss: "₹24,500Cr", population: "7.5M", projectedDelay: 13, projectedLivesSaved: 3920, projectedCostSavings: "₹9,800Cr", projectedFasterPercent: 41 },
  { name: "Jaipur", country: "India", flag: "🇮🇳", avgDelay: 24, congestionIndex: 78, annualDeaths: 11000, economicLoss: "₹27,500Cr", population: "4.1M", projectedDelay: 14, projectedLivesSaved: 4400, projectedCostSavings: "₹11,000Cr", projectedFasterPercent: 42 },
  { name: "London", country: "UK", flag: "🇬🇧", avgDelay: 12, congestionIndex: 65, annualDeaths: 4200, economicLoss: "£8.5B", population: "9.5M", projectedDelay: 7, projectedLivesSaved: 1680, projectedCostSavings: "£3.4B", projectedFasterPercent: 42 },
  { name: "New York", country: "USA", flag: "🇺🇸", avgDelay: 14, congestionIndex: 70, annualDeaths: 5800, economicLoss: "$12.3B", population: "8.3M", projectedDelay: 8, projectedLivesSaved: 2320, projectedCostSavings: "$4.9B", projectedFasterPercent: 43 },
  { name: "Tokyo", country: "Japan", flag: "🇯🇵", avgDelay: 10, congestionIndex: 55, annualDeaths: 3100, economicLoss: "¥1.2T", population: "14M", projectedDelay: 6, projectedLivesSaved: 1240, projectedCostSavings: "¥480B", projectedFasterPercent: 40 },
  { name: "Singapore", country: "Singapore", flag: "🇸🇬", avgDelay: 8, congestionIndex: 45, annualDeaths: 1200, economicLoss: "S$2.1B", population: "5.9M", projectedDelay: 5, projectedLivesSaved: 480, projectedCostSavings: "S$840M", projectedFasterPercent: 38 },
  { name: "Dubai", country: "UAE", flag: "🇦🇪", avgDelay: 15, congestionIndex: 60, annualDeaths: 2800, economicLoss: "AED 12B", population: "3.6M", projectedDelay: 9, projectedLivesSaved: 1120, projectedCostSavings: "AED 4.8B", projectedFasterPercent: 40 },
  { name: "Sydney", country: "Australia", flag: "🇦🇺", avgDelay: 11, congestionIndex: 58, annualDeaths: 2400, economicLoss: "A$6.8B", population: "5.4M", projectedDelay: 6, projectedLivesSaved: 960, projectedCostSavings: "A$2.7B", projectedFasterPercent: 45 },
  { name: "Paris", country: "France", flag: "🇫🇷", avgDelay: 13, congestionIndex: 62, annualDeaths: 3600, economicLoss: "€7.2B", population: "11M", projectedDelay: 7, projectedLivesSaved: 1440, projectedCostSavings: "€2.9B", projectedFasterPercent: 46 },
];

export const indianCities = cityData.filter(c => c.country === "India");
export const internationalCities = cityData.filter(c => c.country !== "India");
