import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  ShoppingCart,
  Bell,
  SlidersHorizontal,
  ChevronDown,
  Check,
  Star,
  Heart,
  Grid,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart } = useCart();

  // Mock data matching the theme
  const mockBooks = [
    // Grade 6
    {
      _id: "1",
      title: "Science Q&A - Grade 6",
      titleSinhala: "විද්‍යාව ප්‍රශ්නෝත්තර - 6 ශ්‍රේණිය",
      author: "නන්දන ධර්මකීර්ති - Nandana Dharmakeerthi",
      publisher: "මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers",
      price: 320,
      image:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600",
      rating: 4.5,
      isFlashSale: false,
      category: "Grade 6-11",
      grade: "Grade 6",
      subject: "Science",
    },
    {
      _id: "2",
      title: "Mathematics Q&A - Grade 6",
      titleSinhala: "ගණිතය ප්‍රශ්නෝත්තර - 6 ශ්‍රේණිය",
      author: "නන්දන ධර්මකීර්ති - Nandana Dharmakeerthi",
      publisher: "මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers",
      price: 330,
      image:
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600",
      rating: 4.8,
      isFlashSale: true,
      category: "Grade 6-11",
      grade: "Grade 6",
      subject: "Mathematics",
    },
    {
      _id: "3",
      title: "History Q&A - Grade 6",
      titleSinhala: "ඉතිහාසය ප්‍රශ්නෝත්තර - 6 ශ්‍රේණිය",
      author: "නන්දන ධර්මකීර්ති - Nandana Dharmakeerthi",
      publisher: "මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers",
      price: 295,
      image:
        "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=600",
      rating: 4.3,
      isFlashSale: false,
      category: "Grade 6-11",
      grade: "Grade 6",
      subject: "History",
    },
    {
      _id: "4",
      title: "Geography Q&A - Grade 6",
      titleSinhala: "භූගෝල විද්‍යාව ප්‍රශ්නෝත්තර - 6 ශ්‍රේණිය",
      author: "නන්දන ධර්මකීර්ති - Nandana Dharmakeerthi",
      publisher: "මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers",
      price: 295,
      image:
        "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600",
      rating: 4.4,
      isFlashSale: false,
      category: "Grade 6-11",
      grade: "Grade 6",
      subject: "Geography",
    },
    {
      _id: "5",
      title: "Buddhism Q&A - Grade 6",
      titleSinhala: "බුද්ධාගම ප්‍රශ්නෝත්තර - 6 ශ්‍රේණිය",
      author: "නන්දන ධර්මකීර්ති - Nandana Dharmakeerthi",
      publisher: "මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers",
      price: 295,
      image:
        "https://images.unsplash.com/photo-1629904853716-600abd17529c?auto=format&fit=crop&q=80&w=600",
      rating: 4.9,
      isFlashSale: false,
      category: "Grade 6-11",
      grade: "Grade 6",
      subject: "Buddhism",
    },
    {
      _id: "6",
      title: "Health & PE Q&A - Grade 6",
      titleSinhala: "සෞඛ්‍යය හා ශාරීරික අධ්‍යාපනය ප්‍රශ්නෝත්තර - 6 ශ්‍රේණිය",
      author: "නන්දන ධර්මකීර්ති - Nandana Dharmakeerthi",
      publisher: "මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers",
      price: 295,
      image:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600",
      rating: 4.5,
      isFlashSale: false,
      category: "Grade 6-11",
      grade: "Grade 6",
      subject: "Health & PE",
    },
    {
      _id: "7",
      title: "Life Skills & Civics Q&A - Grade 6",
      titleSinhala:
        "ජීවන නිපුණතා හා පුරවැසි අධ්‍යාපනය ප්‍රශ්නෝත්තර - 6 ශ්‍රේණිය",
      author: "නන්දන ධර්මකීර්ති - Nandana Dharmakeerthi",
      publisher: "මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers",
      price: 295,
      image:
        "https://images.unsplash.com/photo-1555431189-0fabf2667795?auto=format&fit=crop&q=80&w=600",
      rating: 4.2,
      isFlashSale: false,
      category: "Grade 6-11",
      grade: "Grade 6",
      subject: "Civics",
    },
    {
      _id: "8",
      title: "Technical Skills Q&A - Grade 6",
      titleSinhala: "ප්‍රායෝගික හා තාක්ෂණික කුසලතා ප්‍රශ්නෝත්තර - 6 ශ්‍රේණිය",
      author: "නන්දන ධර්මකීර්ති - Nandana Dharmakeerthi",
      publisher: "මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers",
      price: 295,
      image:
        "https://images.unsplash.com/photo-1581092918090-a4a014d63d99?auto=format&fit=crop&q=80&w=600",
      rating: 4.6,
      isFlashSale: false,
      category: "Grade 6-11",
      grade: "Grade 6",
      subject: "Tech Skills",
    },

    // Grade 7
    {
      _id: "9",
      title: "Science Part I - Grade 7",
      titleSinhala: "විද්‍යාව I කොටස - 7 ශ්‍රේණිය",
      author: "නන්දන ධර්මකීර්ති - Nandana Dharmakeerthi",
      publisher: "මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers",
      price: 320,
      image:
        "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80&w=600",
      rating: 4.7,
      isFlashSale: false,
      category: "Grade 6-11",
      grade: "Grade 7",
      subject: "Science",
    },
    {
      _id: "10",
      title: "Science Part II - Grade 7",
      titleSinhala: "විද්‍යාව II කොටස - 7 ශ්‍රේණිය",
      author: "නන්දන ධර්මකීර්ති - Nandana Dharmakeerthi",
      publisher: "මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers",
      price: 320,
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600",
      rating: 4.7,
      isFlashSale: false,
      category: "Grade 6-11",
      grade: "Grade 7",
      subject: "Science",
    },
    {
      _id: "11",
      title: "Mathematics Part I - Grade 7",
      titleSinhala: "ගණිතය I කොටස - 7 ශ්‍රේණිය",
      author: "නන්දන ධර්මකීර්ති - Nandana Dharmakeerthi",
      publisher: "මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers",
      price: 320,
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600",
      rating: 4.8,
      isFlashSale: true,
      category: "Grade 6-11",
      grade: "Grade 7",
      subject: "Mathematics",
    },
    {
      _id: "12",
      title: "History Q&A - Grade 7",
      titleSinhala: "ඉතිහාසය ප්‍රශ්නෝත්තර - 7 ශ්‍රේණිය",
      author: "නන්දන ධර්මකීර්ති - Nandana Dharmakeerthi",
      publisher: "මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers",
      price: 295,
      image:
        "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=600",
      rating: 4.4,
      isFlashSale: false,
      category: "Grade 6-11",
      grade: "Grade 7",
      subject: "History",
    },
    {
      _id: "13",
      title: "Geography Q&A - Grade 7",
      titleSinhala: "භූගෝල විද්‍යාව ප්‍රශ්නෝත්තර - 7 ශ්‍රේණිය",
      author: "නන්දන ධර්මකීර්ති - Nandana Dharmakeerthi",
      publisher: "මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers",
      price: 295,
      image:
        "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600",
      rating: 4.3,
      isFlashSale: false,
      category: "Grade 6-11",
      grade: "Grade 7",
      subject: "Geography",
    },
    {
      _id: "14",
      title: "Buddhism Q&A - Grade 7",
      titleSinhala: "බුද්ධ ධර්මය ප්‍රශ්නෝත්තර - 7 ශ්‍රේණිය",
      author: "නන්දන ධර්මකීර්ති - Nandana Dharmakeerthi",
      publisher: "මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers",
      price: 320,
      image:
        "https://images.unsplash.com/photo-1629904853716-600abd17529c?auto=format&fit=crop&q=80&w=600",
      rating: 4.9,
      isFlashSale: false,
      category: "Grade 6-11",
      grade: "Grade 7",
      subject: "Buddhism",
    },
    {
      _id: "15",
      title: "Health & PE Q&A - Grade 7",
      titleSinhala: "සෞඛ්‍යය හා ශාරීරික අධ්‍යාපනය ප්‍රශ්නෝත්තර - 7 ශ්‍රේණිය",
      author: "නන්දන ධර්මකීර්ති - Nandana Dharmakeerthi",
      publisher: "මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers",
      price: 320,
      image:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600",
      rating: 4.6,
      isFlashSale: false,
      category: "Grade 6-11",
      grade: "Grade 7",
      subject: "Health & PE",
    },
    {
      _id: "16",
      title: "Civics Q&A - Grade 7",
      titleSinhala: "පුරවැසි අධ්‍යාපනය ප්‍රශ්නෝත්තර - 7 ශ්‍රේණිය",
      author: "නන්දන ධර්මකීර්ති - Nandana Dharmakeerthi",
      publisher: "මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers",
      price: 295,
      image:
        "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=600",
      rating: 4.5,
      isFlashSale: false,
      category: "Grade 6-11",
      grade: "Grade 7",
      subject: "Civics",
    },
    {
      _id: "17",
      title: "Technical Skills Q&A - Grade 7",
      titleSinhala: "ප්‍රායෝගික හා තාක්ෂණික කුසලතා ප්‍රශ්නෝත්තර - 7 ශ්‍රේණිය",
      author: "නන්දන ධර්මකීර්ති - Nandana Dharmakeerthi",
      publisher: "මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers",
      price: 295,
      image:
        "https://images.unsplash.com/photo-1581092918090-a4a014d63d99?auto=format&fit=crop&q=80&w=600",
      rating: 4.6,
      isFlashSale: false,
      category: "Grade 6-11",
      grade: "Grade 7",
      subject: "Tech Skills",
    },

    // Grade 8
    {
      _id: "18",
      title: "Science Part I - Grade 8",
      titleSinhala: "විද්‍යාව I කොටස - 8 ශ්‍රේණිය",
      author: "නන්දන ධර්මකීර්ති - Nandana Dharmakeerthi",
      publisher: "මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers",
      price: 320,
      image:
        "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80&w=600",
      rating: 4.8,
      isFlashSale: false,
      category: "Grade 6-11",
      grade: "Grade 8",
      subject: "Science",
    },
    {
      _id: "19",
      title: "Science Part II - Grade 8",
      titleSinhala: "විද්‍යාව II කොටස - 8 ශ්‍රේණිය",
      author: "නන්දන ධර්මකීර්ති - Nandana Dharmakeerthi",
      publisher: "මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers",
      price: 320,
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600",
      rating: 4.8,
      isFlashSale: false,
      category: "Grade 6-11",
      grade: "Grade 8",
      subject: "Science",
    },
    {
      _id: "20",
      title: "Mathematics Part I - Grade 8",
      titleSinhala: "ගණිතය I කොටස - 8 ශ්‍රේණිය",
      author: "නන්දන ධර්මකීර්ති - Nandana Dharmakeerthi",
      publisher: "මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers",
      price: 350,
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600",
      rating: 4.9,
      isFlashSale: true,
      category: "Grade 6-11",
      grade: "Grade 8",
      subject: "Mathematics",
    },
    {
      _id: "21",
      title: "Mathematics Part II - Grade 8",
      titleSinhala: "ගණිතය II කොටස - 8 ශ්‍රේණිය",
      author: "නන්දන ධර්මකීර්ති - Nandana Dharmakeerthi",
      publisher: "මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers",
      price: 350,
      image:
        "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&q=80&w=600",
      rating: 4.9,
      isFlashSale: false,
      category: "Grade 6-11",
      grade: "Grade 8",
      subject: "Mathematics",
    },
    {
      _id: "22",
      title: "History Q&A - Grade 8",
      titleSinhala: "ඉතිහාසය ප්‍රශ්නෝත්තර - 8 ශ්‍රේණිය",
      author: "නන්දන ධර්මකීර්ති - Nandana Dharmakeerthi",
      publisher: "මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers",
      price: 320,
      image:
        "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=600",
      rating: 4.5,
      isFlashSale: false,
      category: "Grade 6-11",
      grade: "Grade 8",
      subject: "History",
    },
    {
      _id: "23",
      title: "Geography Q&A - Grade 8",
      titleSinhala: "භූගෝල විද්‍යාව ප්‍රශ්නෝත්තර - 8 ශ්‍රේණිය",
      author: "නන්දන ධර්මකීර්ති - Nandana Dharmakeerthi",
      publisher: "මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers",
      price: 295,
      image:
        "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600",
      rating: 4.4,
      isFlashSale: false,
      category: "Grade 6-11",
      grade: "Grade 8",
      subject: "Geography",
    },
    {
      _id: "24",
      title: "Buddhism Q&A - Grade 8",
      titleSinhala: "බුද්ධාගම ප්‍රශ්නෝත්තර - 8 ශ්‍රේණිය",
      author: "නන්දන ධර්මකීර්ති - Nandana Dharmakeerthi",
      publisher: "මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers",
      price: 320,
      image:
        "https://images.unsplash.com/photo-1629904853716-600abd17529c?auto=format&fit=crop&q=80&w=600",
      rating: 4.8,
      isFlashSale: false,
      category: "Grade 6-11",
      grade: "Grade 8",
      subject: "Buddhism",
    },
    {
      _id: "25",
      title: "Civics Q&A - Grade 8",
      titleSinhala: "පුරවැසි අධ්‍යාපනය ප්‍රශ්නෝත්තර - 8 ශ්‍රේණිය",
      author: "නන්දන ධර්මකීර්ති - Nandana Dharmakeerthi",
      publisher: "මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers",
      price: 295,
      image:
        "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=600",
      rating: 4.5,
      isFlashSale: false,
      category: "Grade 6-11",
      grade: "Grade 8",
      subject: "Civics",
    },
    {
      _id: "26",
      title: "Technical Skills Q&A - Grade 8",
      titleSinhala: "ප්‍රායෝගික හා තාක්ෂණික කුසලතා ප්‍රශ්නෝත්තර - 8 ශ්‍රේණිය",
      author: "නන්දන ධර්මකීර්ති - Nandana Dharmakeerthi",
      publisher: "මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers",
      price: 295,
      image:
        "https://images.unsplash.com/photo-1581092918090-a4a014d63d99?auto=format&fit=crop&q=80&w=600",
      rating: 4.6,
      isFlashSale: false,
      category: "Grade 6-11",
      grade: "Grade 8",
      subject: "Tech Skills",
    },

    // Grade 9
    {
      _id: "27",
      title: "Science Part I - Grade 9",
      titleSinhala: "විද්‍යාව I කොටස - 9 වසර",
      author: "නන්දන ධර්මකීර්ති - Nandana Dharmakeerthi",
      publisher: "මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers",
      price: 400,
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600",
      rating: 4.8,
      isFlashSale: false,
      category: "Grade 6-11",
      grade: "Grade 9",
      subject: "Science",
    },
    {
      _id: "28",
      title: "Mathematics Part I - Grade 9",
      titleSinhala: "ගණිතය I කොටස - 9 වසර",
      author: "නන්දන ධර්මකීර්ති - Nandana Dharmakeerthi",
      publisher: "මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers",
      price: 450,
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600",
      rating: 4.9,
      isFlashSale: true,
      category: "Grade 6-11",
      grade: "Grade 9",
      subject: "Mathematics",
    },

    // Grade 10
    {
      _id: "29",
      title: "Science Part I - Grade 10",
      titleSinhala: "විද්‍යාව I කොටස - 10 වසර",
      author: "නන්දන ධර්මකීර්ති - Nandana Dharmakeerthi",
      publisher: "මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers",
      price: 450,
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600",
      rating: 4.8,
      isFlashSale: false,
      category: "Grade 6-11",
      grade: "Grade 10",
      subject: "Science",
    },

    // Grade 11
    {
      _id: "30",
      title: "Science Part I - Grade 11",
      titleSinhala: "විද්‍යාව I කොටස - 11 ශ්‍රේණිය",
      author: "නන්දන ධර්මකීර්ති - Nandana Dharmakeerthi",
      publisher: "මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers",
      price: 500,
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600",
      rating: 4.9,
      isFlashSale: true,
      category: "Grade 6-11",
      grade: "Grade 11",
      subject: "Science",
    },

    // Advanced Level
    {
      _id: "31",
      title: "A/L Biology - Unit Papers Review 1",
      titleSinhala:
        "උසස් පෙළ ජීව විද්‍යාව - ඒකක අනුව වර්ග කළ විභාග ප්‍රශ්න පත්‍ර විවරණය 1",
      author: "නන්දන ධර්මකීර්ති - Nandana Dharmakeerthi",
      publisher: "මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers",
      price: 650,
      image:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600",
      rating: 5.0,
      isFlashSale: false,
      category: "Advanced Level",
      grade: "A/L",
      subject: "Biology",
    },
    {
      _id: "32",
      title: "A/L Biology - Unit Papers Review 2",
      titleSinhala:
        "උසස් පෙළ ජීව විද්‍යාව - ඒකක අනුව වර්ග කළ විභාග ප්‍රශ්න පත්‍ර විවරණය 2",
      author: "නන්දන ධර්මකීර්ති - Nandana Dharmakeerthi",
      publisher: "මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers",
      price: 650,
      image:
        "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600",
      rating: 5.0,
      isFlashSale: false,
      category: "Advanced Level",
      grade: "A/L",
      subject: "Biology",
    },
    {
      _id: "33",
      title: "A/L Biology - Unit Papers Review 3",
      titleSinhala:
        "උසස් පෙළ ජීව විද්‍යාව - ඒකක අනුව වර්ග කළ විභාග ප්‍රශ්න පත්‍ර විවරණය 3",
      author: "නන්දන ධර්මකීර්ති - Nandana Dharmakeerthi",
      publisher: "මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers",
      price: 650,
      image:
        "https://images.unsplash.com/photo-1629904853716-600abd17529c?auto=format&fit=crop&q=80&w=600",
      rating: 5.0,
      isFlashSale: false,
      category: "Advanced Level",
      grade: "A/L",
      subject: "Biology",
    },
    {
      _id: "34",
      title: "A/L Biology - Practical Exams",
      titleSinhala: "උසස් පෙළ ජීව විද්‍යාව - ප්‍රායෝගික පරික්ෂණ",
      author: "නන්දන ධර්මකීර්ති - Nandana Dharmakeerthi",
      publisher: "මෙත්සර ප්‍රකාශකයෝ - Methsara Publishers",
      price: 1300,
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600",
      rating: 5.0,
      isFlashSale: true,
      category: "Advanced Level",
      grade: "A/L",
      subject: "Biology",
    },
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setBooks(mockBooks);
      setLoading(false);
    }, 500);
  }, []);

  const categories = [
    "All",
    "Grade 6-11",
    "Advanced Level",
    "Past Papers",
    "Workbooks",
    "Revision Guides",
  ];

  return (
    <div className="min-h-screen bg-white flex font-sans text-secondary-900">
      {/* Sidebar Filter - Desktop */}
      <aside className="hidden lg:block w-72 bg-white border-r border-secondary-100 p-8 fixed top-16 h-[calc(100vh-4rem)] overflow-y-auto z-40">
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-bold text-secondary-900 flex items-center gap-2">
            Filters
          </h2>
        </div>

        <div className="space-y-10">
          {/* Categories */}
          <div>
            <h3 className="text-sm font-bold text-secondary-900 uppercase tracking-wider mb-6">
              Category
            </h3>
            <div className="space-y-3">
              {categories.map((cat, idx) => (
                <label
                  key={idx}
                  className="flex items-center group cursor-pointer"
                >
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-secondary-300 transition-all checked:border-primary-500 checked:bg-primary-500 hover:border-primary-400"
                      checked={activeCategory === cat}
                      onChange={() => setActiveCategory(cat)}
                    />
                    <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100" />
                  </div>
                  <span
                    className={`ml-3 text-sm transition-colors ${
                      activeCategory === cat
                        ? "text-secondary-900 font-medium"
                        : "text-secondary-500 group-hover:text-secondary-700"
                    }`}
                  >
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-sm font-bold text-secondary-900 uppercase tracking-wider mb-6">
              Price Range
            </h3>
            <div className="flex flex-wrap gap-2">
              {["< 1000", "1000-2000", "2000+"].map((price, idx) => (
                <button
                  key={idx}
                  className="px-4 py-2 rounded-full border border-secondary-200 text-sm text-secondary-600 hover:border-primary-500 hover:text-primary-600 transition-all"
                >
                  {price}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-72 p-4 lg:p-8">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-secondary-900">
              Book Store
            </h1>
            <p className="text-secondary-500 text-sm">
              Find your next favorite study companion
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
              <input
                type="text"
                placeholder="Search by title, author, or ISBN..."
                className="w-full pl-10 pr-4 py-3 bg-secondary-50 border border-transparent rounded-full text-sm focus:outline-none focus:bg-white focus:border-secondary-200 focus:ring-2 focus:ring-primary-100 transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="p-3 bg-secondary-50 rounded-full hover:bg-secondary-100 text-secondary-900 transition-colors">
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Hero / Promo Banner - KEPT AS USER LIKED */}
        <div className="relative w-full h-80 rounded-[2.5rem] overflow-hidden mb-12 group cursor-pointer shadow-xl shadow-secondary-900/5">
          <img
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000"
            alt="Library"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/90 via-secondary-900/40 to-transparent flex flex-col justify-center px-8 md:px-16">
            <h2 className="text-3xl lg:text-5xl font-serif font-bold italic text-white mb-4 max-w-xl leading-tight">
              A book is a gift you can open again and again
            </h2>
            <p className="text-white/80 mb-8 font-serif italic text-lg opacity-90">
              — Garrison Keillor
            </p>
            <div className="flex items-center gap-4">
              <Button className="bg-primary-500 hover:bg-primary-600 text-white border-none rounded-full px-8 py-6 text-base shadow-lg hover:shadow-primary-500/30 transition-all font-serif italic">
                Get Started
              </Button>
            </div>
          </div>
        </div>

        {/* Book Grid */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif font-bold text-secondary-900">
              All Books
            </h2>
            <span className="text-sm text-secondary-500">
              Showing {books.length} results
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {books.map((book) => (
              <div
                key={book._id}
                className="group relative bg-white rounded-[2rem] p-4 border border-transparent hover:border-secondary-100 hover:shadow-xl hover:shadow-secondary-900/5 transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] rounded-[1.5rem] overflow-hidden mb-4 bg-secondary-50">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Badges - Removed as requested */}

                  {/* Quick Actions */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={() => addToCart(book)}
                      className="w-10 h-10 bg-white text-secondary-900 rounded-full flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors shadow-lg"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 bg-white text-secondary-900 rounded-full flex items-center justify-center hover:text-red-500 transition-colors shadow-lg">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="px-2">
                  <h3 className="font-sinhala font-bold text-secondary-900 text-lg mb-1 line-clamp-2 leading-tight group-hover:text-primary-600 transition-colors">
                    {book.titleSinhala || book.title}
                  </h3>
                  <p className="text-secondary-500 text-xs font-medium mb-1 line-clamp-1">
                    {book.title}
                  </p>

                  {/* Author & Publisher */}
                  <div className="space-y-1 mb-3">
                    <p className="text-secondary-600 text-xs font-sinhala line-clamp-1">
                      <span className="font-semibold text-secondary-400 uppercase text-[10px] tracking-wider mr-1">
                        Tw:
                      </span>
                      {book.author}
                    </p>
                    <p className="text-secondary-600 text-xs font-sinhala line-clamp-1">
                      <span className="font-semibold text-secondary-400 uppercase text-[10px] tracking-wider mr-1">
                        Pub:
                      </span>
                      {book.publisher}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-secondary-100 pt-3">
                    <span className="text-lg font-bold text-secondary-900">
                      Rs. {book.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-16 text-center">
            <Button
              variant="outline"
              className="rounded-full px-10 py-6 border-secondary-200 text-secondary-600 hover:bg-secondary-50 hover:border-secondary-300 hover:text-secondary-900 transition-all text-base"
            >
              Load More Books
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Shop;
