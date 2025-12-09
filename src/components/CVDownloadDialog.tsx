import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, Check, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { generateCV, cvThemes, CVTheme, ThemeConfig } from "@/lib/cvGenerator";
import { toast } from "sonner";

const CVDownloadDialog = () => {
  const [selectedTheme, setSelectedTheme] = useState<CVTheme>('modern');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingFormat, setGeneratingFormat] = useState<'pdf' | 'docx' | null>(null);
  const [open, setOpen] = useState(false);

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
  );
};

export default CVDownloadDialog;
