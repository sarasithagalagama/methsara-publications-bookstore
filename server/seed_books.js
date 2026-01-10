const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Book = require("./models/Book");

dotenv.config();

const books = [
  // Grade 6
  {
    title: "Science Q&A - Grade 6",
    titleSinhala: "විද්‍යාව ප්‍රශ්නෝත්තර - 6 ශ්‍රේණිය",
    author: "නන්දන ධර්මකීර්ති, එස්.ආර්.ධර්මකීර්ති",
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
    title: "Mathematics Q&A - Grade 6",
    titleSinhala: "ගණිතය ප්‍රශ්නෝත්තර - 6 ශ්‍රේණිය",
    author: "නන්දන ධර්මකීර්ති, එස්.ආර්.ධර්මකීර්ති",
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
    title: "History Q&A - Grade 6",
    titleSinhala: "ඉතිහාසය ප්‍රශ්නෝත්තර - 6 ශ්‍රේණිය",
    author: "නන්දන ධර්මකීර්ති, එස්.ආර්.ධර්මකීර්ති",
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
    title: "Geography Q&A - Grade 6",
    titleSinhala: "භූගෝල විද්‍යාව ප්‍රශ්නෝත්තර - 6 ශ්‍රේණිය",
    author: "නන්දන ධර්මකීර්ති, එස්.ආර්.ධර්මකීර්ති",
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
    title: "Buddhism Q&A - Grade 6",
    titleSinhala: "බුද්ධාගම ප්‍රශ්නෝත්තර - 6 ශ්‍රේණිය",
    author: "නන්දන ධර්මකීර්ති, එස්.ආර්.ධර්මකීර්ති",
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
    title: "Health & PE Q&A - Grade 6",
    titleSinhala: "සෞඛ්‍යය හා ශාරීරික අධ්‍යාපනය ප්‍රශ්නෝත්තර - 6 ශ්‍රේණිය",
    author: "නන්දන ධර්මකීර්ති, එස්.ආර්.ධර්මකීර්ති",
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
    title: "Life Skills & Civics Q&A - Grade 6",
    titleSinhala: "ජීවන නිපුණතා හා පුරවැසි අධ්‍යාපනය ප්‍රශ්නෝත්තර - 6 ශ්‍රේණිය",
    author: "නන්දන ධර්මකීර්ති, එස්.ආර්.ධර්මකීර්ති",
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
    title: "Technical Skills Q&A - Grade 6",
    titleSinhala: "ප්‍රායෝගික හා තාක්ෂණික කුසලතා ප්‍රශ්නෝත්තර - 6 ශ්‍රේණිය",
    author: "නන්දන ධර්මකීර්ති, එස්.ආර්.ධර්මකීර්ති",
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
    title: "Science Part I - Grade 7",
    titleSinhala: "විද්‍යාව I කොටස - 7 ශ්‍රේණිය",
    author: "නන්දන ධර්මකීර්ති, එස්.ආර්.ධර්මකීර්ති",
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
    title: "Science Part II - Grade 7",
    titleSinhala: "විද්‍යාව II කොටස - 7 ශ්‍රේණිය",
    author: "නන්දන ධර්මකීර්ති, එස්.ආර්.ධර්මකීර්ති",
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
    title: "Mathematics Part I - Grade 7",
    titleSinhala: "ගණිතය I කොටස - 7 ශ්‍රේණිය",
    author: "නන්දන ධර්මකීර්ති, එස්.ආර්.ධර්මකීර්ති",
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
  // Grade 8
  {
    title: "Science Part I - Grade 8",
    titleSinhala: "විද්‍යාව I කොටස - 8 ශ්‍රේණිය",
    author: "නන්දන ධර්මකීර්ති, එස්.ආර්.ධර්මකීර්ති",
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
  // Grade 9
  {
    title: "Science Part I - Grade 9",
    titleSinhala: "විද්‍යාව I කොටස - 9 වසර",
    author: "නන්දන ධර්මකීර්ති, එස්.ආර්.ධර්මකීර්ති",
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
  // Grade 10
  {
    title: "Science Part I - Grade 10",
    titleSinhala: "විද්‍යාව I කොටස - 10 වසර",
    author: "නන්දන ධර්මකීර්ති, එස්.ආර්.ධර්මකීර්ති",
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
  // A/L
  {
    title: "A/L Biology - Unit Papers Review 1",
    titleSinhala:
      "උසස් පෙළ ජීව විද්‍යාව - ඒකක අනුව වර්ග කළ විභාග ප්‍රශ්න පත්‍ර විවරණය 1",
    author: "නන්දන ධර්මකීර්ති, එස්.ආර්.ධර්මකීර්ති",
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
];

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("MongoDB Connected for Seeding");
    try {
      await Book.deleteMany(); // Clear existing books (safe since it was empty/broken)
      console.log("Cleared existing books");

      const createdBooks = await Book.insertMany(books);
      console.log(`Successfully seeded ${createdBooks.length} books`);
    } catch (error) {
      console.error("Error seeding books:", error);
    }
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
