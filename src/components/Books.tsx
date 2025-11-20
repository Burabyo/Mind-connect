import { useState } from 'react';
import { BookOpen, Search, Star } from 'lucide-react';

interface Book {
  title: string;
  author: string;
  description: string;
  category: string;
  ageRange: string;
  rating: number;
}

const booksData: Book[] = [
  {
    title: "The Feelings Book",
    author: "Todd Parr",
    description: "A colorful and fun book about understanding all kinds of feelings. Perfect for young readers!",
    category: "Emotions",
    ageRange: "5-8",
    rating: 5
  },
  {
    title: "What to Do When You Worry Too Much",
    author: "Dawn Huebner",
    description: "A helpful guide to understand and manage worries and anxious thoughts.",
    category: "Anxiety",
    ageRange: "6-12",
    rating: 5
  },
  {
    title: "The Growth Mindset Coach",
    author: "Annie Brock",
    description: "Learn how to develop a positive mindset and embrace challenges.",
    category: "Growth",
    ageRange: "10-14",
    rating: 4
  },
  {
    title: "Hey Warrior",
    author: "Karen Young",
    description: "A book for children to help them understand and manage anxiety.",
    category: "Anxiety",
    ageRange: "8-12",
    rating: 5
  },
  {
    title: "The Mindful Teen",
    author: "Dzung X. Vo",
    description: "Powerful skills to help you handle stress and make better decisions.",
    category: "Mindfulness",
    ageRange: "12-18",
    rating: 4
  },
  {
    title: "I Am Enough",
    author: "Grace Byers",
    description: "A beautiful story about self-love and embracing who you are.",
    category: "Self-Esteem",
    ageRange: "5-10",
    rating: 5
  },
  {
    title: "The Confidence Code for Girls",
    author: "Katty Kay",
    description: "Learn how to build confidence and believe in yourself!",
    category: "Confidence",
    ageRange: "9-14",
    rating: 5
  },
  {
    title: "Big Feelings",
    author: "Liz Fosslien",
    description: "Understanding and navigating emotions in everyday life.",
    category: "Emotions",
    ageRange: "12-16",
    rating: 4
  }
];

export function Books() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Emotions', 'Anxiety', 'Growth', 'Mindfulness', 'Self-Esteem', 'Confidence'];

  const filteredBooks = booksData.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Discover Amazing Books</h2>
        <p className="text-gray-600">Find books that help you grow and feel good</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for books..."
            className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition-colors text-lg"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book, index) => (
          <div
            key={index}
            className="p-6 bg-gradient-to-br from-white to-blue-50 rounded-2xl border-2 border-blue-100 hover:shadow-lg transition-all"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
              <BookOpen className="w-8 h-8 text-white" />
            </div>

            <div className="mb-3">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                {book.category}
              </span>
              <span className="inline-block ml-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                Ages {book.ageRange}
              </span>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-2">{book.title}</h3>
            <p className="text-sm text-gray-600 font-medium mb-3">by {book.author}</p>
            <p className="text-gray-700 mb-4">{book.description}</p>

            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < book.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-gray-600">No books found. Try a different search!</p>
        </div>
      )}
    </div>
  );
}
