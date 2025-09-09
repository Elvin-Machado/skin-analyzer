import React, { useState, useCallback, useRef } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { AnalysisResult } from './components/AnalysisResult';
import { Loader } from './components/Loader';
import { Disclaimer } from './components/Disclaimer';
import { analyzeSkinCondition } from './services/geminiService';
import { AnalysisResponse } from './types';
import { ShieldIcon, CameraIcon, SparklesIcon, DocumentTextIcon, SunIcon, DropletIcon, HeartIcon } from './components/IconComponents';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const analyzerRef = useRef<HTMLDivElement>(null);

  const handleScrollToAnalyzer = () => {
    analyzerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleImageUpload = (file: File, url: string) => {
    setImageFile(file);
    setImageUrl(url);
    setAnalysis(null);
    setError(null);
  };

  const handleClear = () => {
    setImageFile(null);
    setImageUrl(null);
    setAnalysis(null);
    setError(null);
    setIsLoading(false);
  };
  
  const handleAnalyzeClick = useCallback(async () => {
    if (!imageFile || !imageUrl) {
      setError("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const base64Image = imageUrl.split(',')[1];
      const result = await analyzeSkinCondition(base64Image, imageFile.type);
      setAnalysis(result);
    } catch (err) {
      console.error("Analysis failed:", err);
      setError("Failed to analyze the image. The AI may be unable to process this image, or an internal error occurred. Please try a different image.");
    } finally {
      setIsLoading(false);
    }
  }, [imageFile, imageUrl]);

  return (
    <div className="bg-slate-50 text-slate-800 font-sans">
      <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 border-b border-slate-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <ShieldIcon />
                <h1 className="text-2xl font-bold text-slate-900">Skin Analyzer</h1>
            </div>
            <button onClick={handleScrollToAnalyzer} className="hidden md:block px-6 py-2 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 transition-colors duration-300">
                Try Now
            </button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative text-center py-20 md:py-32 px-6 bg-gradient-to-br from-sky-50 to-cyan-100">
            <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4">Empower Your Skin Health Journey.</h2>
                <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8">
                    Use our AI-powered tool for a quick, private, and informative analysis of your skin concerns. Get insights in seconds.
                </p>
                <button onClick={handleScrollToAnalyzer} className="px-10 py-4 bg-sky-600 text-white font-bold rounded-lg shadow-lg hover:bg-sky-700 transform hover:scale-105 transition-all duration-300">
                    Analyze Your Skin
                </button>
            </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">How It Works</h2>
                    <p className="text-lg text-slate-500 mt-2">A simple, three-step process to get your AI analysis.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="p-8 bg-slate-50 rounded-2xl">
                        <div className="inline-block p-4 bg-sky-100 text-sky-600 rounded-full mb-4"><CameraIcon /></div>
                        <h3 className="text-xl font-semibold mb-2">1. Upload a Photo</h3>
                        <p className="text-slate-600">Take or upload a clear, well-lit photo of the skin area you're concerned about.</p>
                    </div>
                    <div className="p-8 bg-slate-50 rounded-2xl">
                        <div className="inline-block p-4 bg-sky-100 text-sky-600 rounded-full mb-4"><SparklesIcon /></div>
                        <h3 className="text-xl font-semibold mb-2">2. AI Analysis</h3>
                        <p className="text-slate-600">Our advanced AI model analyzes the image to identify potential conditions.</p>
                    </div>
                    <div className="p-8 bg-slate-50 rounded-2xl">
                        <div className="inline-block p-4 bg-sky-100 text-sky-600 rounded-full mb-4"><DocumentTextIcon /></div>
                        <h3 className="text-xl font-semibold mb-2">3. Get Insights</h3>
                        <p className="text-slate-600">Receive a structured report with a potential condition, symptoms, and suggestions.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Analyzer Section */}
        <section id="analyzer" ref={analyzerRef} className="py-16 md:py-24">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">AI Skin Analyzer</h2>
                    <p className="text-lg text-slate-500 mt-2">Upload your image to begin the analysis.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200">
                  {!imageUrl ? (
                    <ImageUploader onImageUpload={handleImageUpload} />
                  ) : (
                    <div className="text-center">
                      <img src={imageUrl} alt="Skin condition" className="max-h-80 w-auto mx-auto rounded-lg shadow-md mb-6 border border-gray-200" />
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={handleAnalyzeClick}
                          disabled={isLoading}
                          className="px-8 py-3 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-sky-300 disabled:cursor-not-allowed transition-colors duration-300"
                        >
                          {isLoading ? 'Analyzing...' : 'Analyze Image'}
                        </button>
                        <button
                          onClick={handleClear}
                          disabled={isLoading}
                          className="px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 disabled:bg-gray-100 transition-colors duration-300"
                        >
                          Clear Image
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {isLoading && <Loader />}
                
                {error && (
                  <div className="mt-6 p-4 bg-red-100 border border-red-300 text-red-800 rounded-lg text-center">
                    <strong>Error:</strong> {error}
                  </div>
                )}

                {analysis && !isLoading && (
                  <div className="mt-8">
                    <AnalysisResult data={analysis} />
                  </div>
                )}
            </div>
        </section>
        
        {/* Skin Care Tips Section */}
        <section className="py-16 md:py-24 bg-white">
           <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">General Skin Care Tips</h2>
                    <p className="text-lg text-slate-500 mt-2">Simple precautions for maintaining healthy skin.</p>
                </div>
                 <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-8 text-center bg-slate-50 rounded-2xl">
                        <div className="inline-block p-4 bg-yellow-100 text-yellow-600 rounded-full mb-4"><SunIcon /></div>
                        <h3 className="text-xl font-semibold mb-2">Protect From Sun</h3>
                        <p className="text-slate-600">Use broad-spectrum sunscreen, seek shade, and wear protective clothing to prevent sun damage.</p>
                    </div>
                     <div className="p-8 text-center bg-slate-50 rounded-2xl">
                        <div className="inline-block p-4 bg-blue-100 text-blue-600 rounded-full mb-4"><DropletIcon /></div>
                        <h3 className="text-xl font-semibold mb-2">Stay Hydrated</h3>
                        <p className="text-slate-600">Drink plenty of water throughout the day to keep your skin hydrated and healthy.</p>
                    </div>
                     <div className="p-8 text-center bg-slate-50 rounded-2xl">
                        <div className="inline-block p-4 bg-rose-100 text-rose-600 rounded-full mb-4"><HeartIcon /></div>
                        <h3 className="text-xl font-semibold mb-2">Healthy Lifestyle</h3>
                        <p className="text-slate-600">Eat a balanced diet, get enough sleep, and manage stress for overall skin wellness.</p>
                    </div>
                </div>
           </div>
        </section>

        {/* Disclaimer */}
        <section className="py-16">
            <div className="container mx-auto px-6 max-w-4xl">
                <Disclaimer />
            </div>
        </section>

        <footer className="bg-slate-800 text-slate-400 py-8">
            <div className="container mx-auto px-6 text-center">
                <p>&copy; {new Date().getFullYear()} Skin Analyzer. All rights reserved.</p>
                <p className="text-xs mt-2">This is an AI-powered informational tool and not a substitute for medical advice.</p>
            </div>
        </footer>
      </main>
    </div>
  );
};

export default App;