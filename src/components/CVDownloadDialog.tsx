import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, Check, Loader2, Eye, X, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { generateCV, cvThemes, CVTheme, ThemeConfig, generateCVHTML, portfolioData } from "@/lib/cvGenerator";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

const CVDownloadDialog = () => {
  const [selectedTheme, setSelectedTheme] = useState<CVTheme>('modern');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingFormat, setGeneratingFormat] = useState<'pdf' | 'docx' | null>(null);
  const [open, setOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewScale, setPreviewScale] = useState(0.6);

  const currentTheme = useMemo(() => 
    cvThemes.find(t => t.id === selectedTheme) || cvThemes[0],
    [selectedTheme]
  );

  const previewHTML = useMemo(() => 
    generateCVHTML(currentTheme),
    [currentTheme]
  );

  const handleDownload = async (format: 'pdf' | 'docx') => {
    setIsGenerating(true);
    setGeneratingFormat(format);
    
    try {
      await generateCV(format, selectedTheme);
      toast.success(`CV downloaded as ${format.toUpperCase()} successfully!`);
    } catch (error) {
      toast.error("Failed to generate CV. Please try again.");
      console.error(error);
    } finally {
      setIsGenerating(false);
      setGeneratingFormat(null);
    }
  };

  const handleZoomIn = () => setPreviewScale(prev => Math.min(prev + 0.1, 1));
  const handleZoomOut = () => setPreviewScale(prev => Math.max(prev - 0.1, 0.3));

  const ThemeCard = ({ theme }: { theme: ThemeConfig }) => {
    const isSelected = selectedTheme === theme.id;
    
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setSelectedTheme(theme.id)}
        className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 ${
          isSelected 
            ? 'border-primary ring-2 ring-primary/30' 
            : 'border-border hover:border-muted-foreground/50'
        }`}
      >
        {/* Theme Preview */}
        <div 
          className="h-24 w-full"
          style={{ background: theme.previewBg }}
        />
        
        {/* Theme Info */}
        <div className="p-3 bg-card">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-sm text-foreground">{theme.name}</h4>
            <AnimatePresence>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                >
                  <Check size={12} className="text-primary-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <p className="text-xs text-muted-foreground">{theme.description}</p>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button 
            className="gap-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
          >
            <Download size={18} />
            Download CV
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl bg-background border-border">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              <FileText className="text-primary" size={24} />
              Choose CV Theme
            </DialogTitle>
          </DialogHeader>
          
          {/* Theme Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-4">
            {cvThemes.map((theme) => (
              <ThemeCard key={theme.id} theme={theme} />
            ))}
          </div>

          {/* Preview Button */}
          <Button
            onClick={() => setShowPreview(true)}
            variant="outline"
            className="w-full gap-2 border-primary/30 hover:bg-primary/10"
          >
            <Eye size={18} />
            Preview CV with {currentTheme.name} Theme
          </Button>

          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              onClick={() => handleDownload('pdf')}
              disabled={isGenerating}
              className="flex-1 gap-2 bg-red-500 hover:bg-red-600 text-white"
            >
              {generatingFormat === 'pdf' ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <FileText size={18} />
                  Download as PDF
                </>
              )}
            </Button>
            <Button
              onClick={() => handleDownload('docx')}
              disabled={isGenerating}
              className="flex-1 gap-2 bg-blue-500 hover:bg-blue-600 text-white"
            >
              {generatingFormat === 'docx' ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Generating DOCX...
                </>
              ) : (
                <>
                  <FileText size={18} />
                  Download as DOCX
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* CV Preview Modal */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-5xl h-[90vh] bg-background border-border p-0 overflow-hidden">
          <div className="flex flex-col h-full">
            {/* Preview Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-card">
              <div className="flex items-center gap-3">
                <FileText className="text-primary" size={24} />
                <div>
                  <h3 className="font-bold text-foreground">CV Preview</h3>
                  <p className="text-xs text-muted-foreground">Theme: {currentTheme.name}</p>
                </div>
              </div>
              
              {/* Zoom Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleZoomOut}
                  disabled={previewScale <= 0.3}
                  className="h-8 w-8"
                >
                  <ZoomOut size={16} />
                </Button>
                <span className="text-sm text-muted-foreground min-w-[50px] text-center">
                  {Math.round(previewScale * 100)}%
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleZoomIn}
                  disabled={previewScale >= 1}
                  className="h-8 w-8"
                >
                  <ZoomIn size={16} />
                </Button>
              </div>

              {/* Download from Preview */}
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleDownload('pdf')}
                  disabled={isGenerating}
                  size="sm"
                  className="gap-1 bg-red-500 hover:bg-red-600 text-white"
                >
                  {generatingFormat === 'pdf' ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Download size={14} />
                  )}
                  PDF
                </Button>
                <Button
                  onClick={() => handleDownload('docx')}
                  disabled={isGenerating}
                  size="sm"
                  className="gap-1 bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {generatingFormat === 'docx' ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Download size={14} />
                  )}
                  DOCX
                </Button>
              </div>
            </div>

            {/* Preview Content */}
            <ScrollArea className="flex-1 bg-muted/30">
              <div className="p-8 flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-2xl overflow-hidden"
                  style={{ 
                    transform: `scale(${previewScale})`,
                    transformOrigin: 'top center',
                    width: '800px'
                  }}
                >
                  <iframe
                    srcDoc={previewHTML}
                    className="w-full border-0"
                    style={{ height: '1100px' }}
                    title="CV Preview"
                  />
                </motion.div>
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CVDownloadDialog;
