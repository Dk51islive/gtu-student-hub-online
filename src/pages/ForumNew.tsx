
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, SendHorizontal } from "lucide-react";

// Simple in-page mock for categories/tags for demonstration
const categoryOptions = [
  "Academics", "Examinations", "Placements", "Projects", "Career", "Campus Life"
];

const canvaBlobs = [
  { className: 'absolute left-[-80px] top-[-60px] w-52 h-52 bg-[linear-gradient(135deg,#9b87f5,#33C3F0)] rounded-full opacity-20 animate-pulse' },
  { className: 'absolute right-[-70px] bottom-[-100px] w-64 h-64 bg-[linear-gradient(135deg,#FFE29F,#FF719A)] rounded-full opacity-20 animate-pulse delay-75' },
];

const ForumNew = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categoryOptions[0]);
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // These would be replaced by a backend call in production
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      navigate("/forum");
    }, 800);
  };

  const handleTagAdd = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  return (
    <MainLayout>
      <div className="relative py-16 min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] overflow-x-hidden">
        {/* Simple Canva-style animated colored blobs */}
        {canvaBlobs.map((blob, i) => (
          <div key={i} className={blob.className} aria-hidden />
        ))}
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gtu-blue animate-fade-in">
              Start a New Discussion
            </h1>
            <p className="mt-2 text-gtu-gray-700 text-lg max-w-xl mx-auto animate-fade-in">
              Got a question or topic? Start a discussion and get perspectives from students across GTU!
            </p>
          </div>
          <Card className="max-w-2xl mx-auto relative z-10 shadow-xl border-2 border-gtu-blue/10 bg-white/90 animate-scale-in">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-semibold mb-1 text-gtu-blue" htmlFor="title">
                    Title
                  </label>
                  <Input
                    id="title"
                    type="text"
                    required
                    placeholder="What's your topic or question?"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="focus:ring-2 focus:ring-gtu-blue focus:ring-offset-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-gtu-blue" htmlFor="category">
                    Category
                  </label>
                  <select
                    id="category"
                    required
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full h-10 mt-1 rounded-md border border-gray-300 px-3 text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gtu-blue transition"
                  >
                    {categoryOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-gtu-blue" htmlFor="content">
                    Description / Details
                  </label>
                  <Textarea
                    id="content"
                    required
                    rows={5}
                    placeholder="Give more details, context, or background…"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-gtu-blue">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map(tag => (
                      <Badge key={tag} variant="outline" className="bg-blue-100 text-gtu-blue px-2">{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      value={tagInput}
                      onChange={e => setTagInput(e.target.value)}
                      onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); handleTagAdd(); } }}
                      placeholder="Add a tag e.g. #math"
                      className="w-1/2"
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="bg-gradient-to-r from-blue-300 to-gtu-blue/80 shadow-md text-white hover:scale-110 transition-all"
                      onClick={handleTagAdd}
                      title="Add Tag"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-center pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    className="relative px-8 py-3 text-lg font-bold shadow-lg bg-gradient-to-r from-pink-400 via-gtu-blue to-blue-400 hover:scale-105 transition duration-200 hover:shadow-2xl"
                  >
                    {submitting ? "Posting..." : (
                      <>
                        <SendHorizontal className="mr-2 h-6 w-6" /> Post Discussion
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ForumNew;
