'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';

export default function NewContentPage() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [inputType, setInputType] = useState<'url' | 'text' | 'keyword' | 'competitor'>('url');
  const [inputContent, setInputContent] = useState('');
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handlePlatformToggle = (platform: string) => {
    if (platforms.includes(platform)) {
      setPlatforms(platforms.filter(p => p !== platform));
    } else {
      setPlatforms([...platforms, platform]);
    }
  };

  const handleSubmit = async () => {
    if (!inputContent) {
      setError('Please provide content input');
      return;
    }

    if (platforms.length === 0) {
      setError('Please select at least one platform');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // In a real implementation, we would call the API to process the content
      // For now, we'll simulate a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to the content list page
      window.location.href = '/content';
    } catch (err: any) {
      setError(err.message || 'Failed to process content');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 pb-32">
        <header className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white">Create New Content</h1>
          </div>
        </header>
      </div>

      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-center">
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-indigo-600' : 'bg-gray-300'}`}>
                    <span className="text-white font-medium">1</span>
                  </div>
                  <div className={`h-1 w-12 ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                </div>
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-300'}`}>
                    <span className="text-white font-medium">2</span>
                  </div>
                  <div className={`h-1 w-12 ${step >= 3 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                </div>
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? 'bg-indigo-600' : 'bg-gray-300'}`}>
                    <span className="text-white font-medium">3</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-2 px-12">
                <span className="text-sm font-medium text-gray-700">Input Type</span>
                <span className="text-sm font-medium text-gray-700">Content</span>
                <span className="text-sm font-medium text-gray-700">Platforms</span>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Input Type */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  <div 
                    className={`border rounded-lg p-6 cursor-pointer hover:border-indigo-500 ${inputType === 'url' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
                    onClick={() => setInputType('url')}
                  >
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">URL Scraper</h3>
                    <p className="mt-2 text-sm text-gray-500 text-center">
                      Extract content from any webpage
                    </p>
                  </div>

                  <div 
                    className={`border rounded-lg p-6 cursor-pointer hover:border-indigo-500 ${inputType === 'text' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
                    onClick={() => setInputType('text')}
                  >
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">Text Input</h3>
                    <p className="mt-2 text-sm text-gray-500 text-center">
                      Paste your own content
                    </p>
                  </div>

                  <div 
                    className={`border rounded-lg p-6 cursor-pointer hover:border-indigo-500 ${inputType === 'keyword' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
                    onClick={() => setInputType('keyword')}
                  >
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                      </svg>
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">Keyword Research</h3>
                    <p className="mt-2 text-sm text-gray-500 text-center">
                      Generate from trending topics
                    </p>
                  </div>

                  <div 
                    className={`border rounded-lg p-6 cursor-pointer hover:border-indigo-500 ${inputType === 'competitor' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
                    onClick={() => setInputType('competitor')}
                  >
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">Competitor Analysis</h3>
                    <p className="mt-2 text-sm text-gray-500 text-center">
                      Analyze competitor content
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Content Input */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="content-input" className="block text-sm font-medium text-gray-700">
                    {inputType === 'url' && 'Enter URL'}
                    {inputType === 'text' && 'Enter or paste your content'}
                    {inputType === 'keyword' && 'Enter keywords or topics'}
                    {inputType === 'competitor' && 'Enter competitor URL or social media handle'}
                  </label>
                  {inputType === 'text' ? (
                    <textarea
                      id="content-input"
                      rows={8}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder={
                        inputType === 'text' ? 'Paste your content here...' :
                        inputType === 'url' ? 'https://example.com/article' :
                        inputType === 'keyword' ? 'Enter keywords separated by commas' :
                        'Enter competitor URL or @handle'
                      }
                      value={inputContent}
                      onChange={(e) => setInputContent(e.target.value)}
                    />
                  ) : (
                    <input
                      type="text"
                      id="content-input"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder={
                        inputType === 'url' ? 'https://example.com/article' :
                        inputType === 'keyword' ? 'Enter keywords separated by commas' :
                        'Enter competitor URL or @handle'
                      }
                      value={inputContent}
                      onChange={(e) => setInputContent(e.target.value)}
                    />
                  )}
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Platform Selection */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  <div 
                    className={`border rounded-lg p-6 cursor-pointer hover:border-indigo-500 ${platforms.includes('twitter') ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
                    onClick={() => handlePlatformToggle('twitter')}
                  >
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-400 text-white mx-auto">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">Twitter</h3>
                    <p className="mt-2 text-sm text-gray-500 text-center">
                      Thread creation with hooks
                    </p>
                  </div>

                  <div 
                    className={`border rounded-lg p-6 cursor-pointer hover:border-indigo-500 ${platforms.includes('linkedin') ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
                    onClick={() => handlePlatformToggle('linkedin')}
                  >
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-700 text-white mx-auto">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">LinkedIn</h3>
                    <p className="mt-2 text-sm text-gray-500 text-center">
                      Professional posts
                    </p>
                  </div>

                  <div 
                    className={`border rounded-lg p-6 cursor-pointer hover:border-indigo-500 ${platforms.includes('instagram') ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
                    onClick={() => handlePlatformToggle('instagram')}
                  >
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-pink-500 text-white mx-auto">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                      </svg>
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">Instagram</h3>
                    <p className="mt-2 text-sm text-gray-500 text-center">
                      Captions with hashtags
                    </p>
                  </div>

                  <div 
                    className={`border rounded-lg p-6 cursor-pointer hover:border-indigo-500 ${platforms.includes('facebook') ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
                    onClick={() => handlePlatformToggle('facebook')}
                  >
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mx-auto">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">Facebook</h3>
                    <p className="mt-2 text-sm text-gray-500 text-center">
                      Community-focused posts
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-4">
                  <div 
                    className={`border rounded-lg p-6 cursor-pointer hover:border-indigo-500 ${platforms.includes('tiktok') ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
                    onClick={() => handlePlatformToggle('tiktok')}
                  >
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white mx-auto">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                      </svg>
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">TikTok</h3>
                    <p className="mt-2 text-sm text-gray-500 text-center">
                      Script format with hooks
                    </p>
                  </div>

                  <div 
                    className={`border rounded-lg p-6 cursor-pointer hover:border-indigo-500 ${platforms.includes('youtube') ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
                    onClick={() => handlePlatformToggle('youtube')}
                  >
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-600 text-white mx-auto">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">YouTube</h3>
                    <p className="mt-2 text-sm text-gray-500 text-center">
                      SEO-optimized descriptions
                    </p>
                  </div>

                  <div 
                    className={`border rounded-lg p-6 cursor-pointer hover:border-indigo-500 ${platforms.includes('pinterest') ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
                    onClick={() => handlePlatformToggle('pinterest')}
                  >
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-700 text-white mx-auto">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                      </svg>
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">Pinterest</h3>
                    <p className="mt-2 text-sm text-gray-500 text-center">
                      Search-optimized descriptions
                    </p>
                  </div>

                  <div 
                    className={`border rounded-lg p-6 cursor-pointer hover:border-indigo-500 ${platforms.includes('blog') ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
                    onClick={() => handlePlatformToggle('blog')}
                  >
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-600 text-white mx-auto">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">Blog</h3>
                    <p className="mt-2 text-sm text-gray-500 text-center">
                      SEO-optimized articles
                    </p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {isProcessing ? 'Processing...' : 'Generate Content'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
