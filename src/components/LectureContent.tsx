import { gcsToHttps } from '../lib/gcs';
import { motion } from 'framer-motion';
import { Play, BookOpen, Clock, HelpCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface LectureContentType {
  id: string;
  lecture_id: string;
  topic: string;
  definition: string | null;
  recording_url: string | null;
  book_reference: string | null;
  content_data: ContentSection[] | string;
  created_at?: string;
  updated_at?: string;
}

interface ContentSection {
  topic?: string;
  title?: string;
  details?: string;
  content?: string;
  answer?: string;
  question?: string;
  animations?: Animation[];
  book_references?: string[];
}

interface Animation {
  title: string;
  code?: string;
  video?: string;
  duration?: string;
}

interface LectureContentProps {
  content: LectureContentType | null;
}

export function LectureContent({ content }: LectureContentProps) {
  if (!content) {
    return (
      <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
        <p className="text-center text-gray-500">No content available.</p>
      </div>
    );
  }

  const {
    topic = 'Untitled Lecture',
    definition = '',
    recording_url: recordingUrl = '',
    book_reference: bookReference = '',
    content_data: rawContent = [],
  } = content;

  let contentData: ContentSection[] = [];

  try {
    let raw = rawContent;
    if (typeof raw === 'string') {
      raw = JSON.parse(raw);
      if (typeof raw === 'string') raw = JSON.parse(raw);
    }
    if (Array.isArray(raw)) contentData = raw;
    else if (raw && typeof raw === 'object') {
      if (Array.isArray((raw as any).content)) contentData = (raw as any).content;
      else if (Array.isArray((raw as any).sections)) contentData = (raw as any).sections;
      else if (Array.isArray((raw as any).doubts)) contentData = (raw as any).doubts;
    }
  } catch (e) {
    console.error('❌ Error parsing content data:', e);
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="max-w-5xl mx-auto p-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl mb-2 font-bold text-gray-800 border-b-4 border-indigo-500 pb-2">
            {topic}
          </h1>
          <Badge variant="secondary" className="gap-1 bg-indigo-100 text-indigo-700">
            <Clock className="w-3 h-3" /> Auto-generated notes
          </Badge>
        </motion.div>

        {/* Definition */}
        {definition && (
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-300 shadow-sm">
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2 text-blue-800 border-b border-blue-300 pb-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Definition
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">{definition}</p>
          </Card>
        )}

        {/* Lecture Recording */}
        <Card className="p-6 bg-white border shadow-md">
          <h3 className="mb-3 text-xl flex items-center gap-2 font-semibold text-purple-700 border-b border-purple-300 pb-2">
            <Play className="w-5 h-5 text-purple-600" /> Lecture Recording
          </h3>
          <div className="relative w-full rounded-xl overflow-hidden shadow-sm" style={{ paddingTop: '56.25%' }}>
            {recordingUrl ? (
              <video
                src={gcsToHttps(recordingUrl)}
                controls
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-gray-300 bg-gray-900">
                No recording available.
              </div>
            )}
          </div>
        </Card>

        {/* Book Reference */}
        {bookReference && (
          <Card className="p-6 bg-gradient-to-r from-green-50 to-green-100 border-green-300">
            <h3 className="mb-3 flex items-center gap-2 text-green-800 font-semibold border-b border-green-300 pb-2">
              <BookOpen className="w-5 h-5 text-green-600" /> Book Reference
            </h3>
            <p className="text-gray-800 bg-green-50 p-4 rounded-lg leading-relaxed shadow-inner">
              {bookReference}
            </p>
          </Card>
        )}

        {/* Content Sections */}
        {contentData && contentData.length > 0 ? (
          contentData.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
            >
              <Card className="p-6 space-y-4 bg-white border-l-8 border-indigo-300 hover:shadow-md transition-shadow">
                {/* Section Title */}
                <h2 className="text-2xl mb-3 font-semibold text-indigo-800 bg-indigo-50 p-3 rounded-lg border border-indigo-200">
                  {section.topic || section.title || `Section ${idx + 1}`}
                </h2>

                {/* Section Content */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {section.details || section.content || section.answer || 'No details available.'}
                  </p>
                </div>

                {/* Question */}
                {section.question && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mt-4 shadow-sm">
                    <h4 className="flex items-center gap-2 text-yellow-700 font-semibold">
                      <HelpCircle className="w-4 h-4" /> Question
                    </h4>
                    <p className="text-gray-800 mt-2">{section.question}</p>
                  </div>
                )}

                {/* Animations - Only show if video exists */}
                {section.animations && section.animations.filter(anim => anim.video).length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {section.animations
                      .filter(anim => anim.video)
                      .map((anim, aidx) => (
                        <Card
                          key={aidx}
                          className="overflow-hidden border hover:shadow-lg transition-shadow bg-gray-50"
                        >
                          <div className="aspect-video bg-gray-100 relative">
                            <video
                              src={gcsToHttps(anim.video!)}
                              controls
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full h-full object-cover"
                            />
                            <Badge className="absolute top-2 right-2 bg-indigo-200 text-indigo-800">
                              {anim.duration}
                            </Badge>
                          </div>
                          <div className="p-3">
                            <h4 className="font-semibold text-gray-800">{anim.title}</h4>
                            <p className="text-xs text-gray-500">{anim.code}</p>
                          </div>
                        </Card>
                      ))}
                  </div>
                )}

                {/* Book References */}
                {section.book_references && section.book_references.length > 0 && (
                  <div className="mt-4">
                    <h4 className="flex items-center gap-2 text-gray-700 font-semibold">
                      <BookOpen className="w-4 h-4" /> Book References
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                      {section.book_references.map((ref, refIdx) => (
                        <div key={refIdx} className="overflow-hidden rounded-lg border bg-white hover:shadow">
                          <img
                            src={ref}
                            alt={`Reference ${refIdx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 text-center italic mt-6">
            No structured content sections available for this lecture.
          </p>
        )}
      </div>
    </div>
  );
}
