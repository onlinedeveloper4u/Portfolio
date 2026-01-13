import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, Check, Loader2, ZoomIn, ZoomOut } from "lucide-react";
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
  const [previewScale, setPreviewScale] = useState(0.5);

  const currentTheme = useMemo(() => 
    cvThemes.find(t => t.id === selectedTheme) || cvThemes[0],
    [selectedTheme]
  );

  const previewHTML = useMemo(() => 
    generateCVHTML(currentTheme, portfolioData),
    [currentTheme]
  );

  const handleDownload = async (format: 'pdf' | 'docx') => {
    setIsGenerating(true);
    setGeneratingFormat(format);
    
    try {
      await generateCV(format, selectedTheme, portfolioData);
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
        whileHover={{ scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setSelectedTheme(theme.id)}
        className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 ${
          isSelected 
            ? 'border-primary ring-2 ring-primary/30 shadow-lg shadow-primary/20' 
            : 'border-border hover:border-muted-foreground/50 hover:shadow-md'
        }`}
      >
        <div 
          className="h-20 w-full relative"
          style={{ background: theme.previewBg }}
        >
          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg"
            >
              <Check size={14} className="text-primary-foreground" />
            </motion.div>
          )}
        </div>
        <div className="p-3 bg-card">
          <h4 className="font-semibold text-sm text-foreground">{theme.name}</h4>
          <p className="text-xs text-muted-foreground mt-0.5">{theme.description}</p>
        </div>
      </motion.div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="gap-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
        >
          <Download size={18} />
          Download CV
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl bg-background border-border max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
            <FileText className="text-primary" size={24} />
            Download CV
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
          {/* Theme Selection - Left Side */}
          <div className="lg:w-1/3 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Select Theme</h3>
              <div className="grid grid-cols-1 gap-3 max-h-[300px] lg:max-h-[400px] overflow-y-auto pr-2">
                {cvThemes.map((theme) => (
                  <ThemeCard key={theme.id} theme={theme} />
                ))}
              </div>
            </div>

            {/* Download Buttons */}
            <div className="space-y-2 pt-4 border-t border-border">
              <Button
                onClick={() => handleDownload('pdf')}
                disabled={isGenerating}
                className="w-full gap-2 bg-red-500 hover:bg-red-600 text-white"
              >
                {generatingFormat === 'pdf' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText size={18} />
                    Download PDF
                  </>
                )}
              </Button>
              <Button
                onClick={() => handleDownload('docx')}
                disabled={isGenerating}
                className="w-full gap-2 bg-blue-500 hover:bg-blue-600 text-white"
              >
                {generatingFormat === 'docx' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText size={18} />
                    Download DOCX
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Preview - Right Side */}
          <div className="lg:w-2/3 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">Preview</h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleZoomOut}
                  disabled={previewScale <= 0.3}
                  className="h-7 w-7"
                >
                  <ZoomOut size={14} />
                </Button>
                <span className="text-xs text-muted-foreground min-w-[40px] text-center">
                  {Math.round(previewScale * 100)}%
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleZoomIn}
                  disabled={previewScale >= 1}
                  className="h-7 w-7"
                >
                  <ZoomIn size={14} />
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1 rounded-lg bg-muted/30 border border-border">
              <div className="p-4 flex justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedTheme}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-lg shadow-xl overflow-hidden"
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
                </AnimatePresence>
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CVDownloadDialog;
