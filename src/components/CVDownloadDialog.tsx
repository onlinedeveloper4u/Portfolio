import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, Check, Loader2, Eye, ZoomIn, ZoomOut, Pencil, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { generateCV, cvThemes, CVTheme, ThemeConfig, generateCVHTML, portfolioData } from "@/lib/cvGenerator";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

type Step = 'theme' | 'customize' | 'preview';

const CVDownloadDialog = () => {
  const [selectedTheme, setSelectedTheme] = useState<CVTheme>('modern');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingFormat, setGeneratingFormat] = useState<'pdf' | 'docx' | null>(null);
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>('theme');
  const [previewScale, setPreviewScale] = useState(0.6);

  // Customization state
  const [customName, setCustomName] = useState(portfolioData.name);
  const [customTitle, setCustomTitle] = useState(portfolioData.title);
  const [customSummary, setCustomSummary] = useState(portfolioData.summary);
  const [selectedProjects, setSelectedProjects] = useState<string[]>(
    portfolioData.projects.map(p => p.name)
  );
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    portfolioData.skills.map(s => s.category)
  );
  const [selectedExperiences, setSelectedExperiences] = useState<number[]>(
    portfolioData.experience.map((_, i) => i)
  );

  const currentTheme = useMemo(() => 
    cvThemes.find(t => t.id === selectedTheme) || cvThemes[0],
    [selectedTheme]
  );

  // Generate custom portfolio data
  const customPortfolioData = useMemo(() => ({
    ...portfolioData,
    name: customName.trim() || portfolioData.name,
    title: customTitle.trim() || portfolioData.title,
    summary: customSummary.trim() || portfolioData.summary,
    projects: portfolioData.projects.filter(p => selectedProjects.includes(p.name)),
    skills: portfolioData.skills.filter(s => selectedSkills.includes(s.category)),
    experience: portfolioData.experience.filter((_, i) => selectedExperiences.includes(i))
  }), [customName, customTitle, customSummary, selectedProjects, selectedSkills, selectedExperiences]);

  const previewHTML = useMemo(() => 
    generateCVHTML(currentTheme, customPortfolioData),
    [currentTheme, customPortfolioData]
  );

  const handleDownload = async (format: 'pdf' | 'docx') => {
    setIsGenerating(true);
    setGeneratingFormat(format);
    
    try {
      await generateCV(format, selectedTheme, customPortfolioData);
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

  const toggleProject = (projectName: string) => {
    setSelectedProjects(prev => 
      prev.includes(projectName)
        ? prev.filter(p => p !== projectName)
        : [...prev, projectName]
    );
  };

  const toggleSkill = (category: string) => {
    setSelectedSkills(prev => 
      prev.includes(category)
        ? prev.filter(s => s !== category)
        : [...prev, category]
    );
  };

  const toggleExperience = (index: number) => {
    setSelectedExperiences(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index].sort((a, b) => a - b)
    );
  };

  const resetCustomization = () => {
    setCustomName(portfolioData.name);
    setCustomTitle(portfolioData.title);
    setCustomSummary(portfolioData.summary);
    setSelectedProjects(portfolioData.projects.map(p => p.name));
    setSelectedSkills(portfolioData.skills.map(s => s.category));
    setSelectedExperiences(portfolioData.experience.map((_, i) => i));
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setCurrentStep('theme');
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
        <div 
          className="h-24 w-full"
          style={{ background: theme.previewBg }}
        />
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

  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-4">
      {(['theme', 'customize', 'preview'] as Step[]).map((step, index) => (
        <div key={step} className="flex items-center">
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              currentStep === step 
                ? 'bg-primary text-primary-foreground' 
                : index < ['theme', 'customize', 'preview'].indexOf(currentStep)
                ? 'bg-primary/20 text-primary'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {index + 1}
          </div>
          {index < 2 && (
            <div className={`w-8 h-0.5 mx-1 ${
              index < ['theme', 'customize', 'preview'].indexOf(currentStep)
                ? 'bg-primary'
                : 'bg-muted'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button 
            className="gap-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
          >
            <Download size={18} />
            Download CV
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl bg-background border-border max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              <FileText className="text-primary" size={24} />
              {currentStep === 'theme' && 'Choose CV Theme'}
              {currentStep === 'customize' && 'Customize Your CV'}
              {currentStep === 'preview' && 'Preview & Download'}
            </DialogTitle>
          </DialogHeader>

          <StepIndicator />
          
          <ScrollArea className="flex-1 pr-4">
            <AnimatePresence mode="wait">
              {/* Step 1: Theme Selection */}
              {currentStep === 'theme' && (
                <motion.div
                  key="theme"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-4">
                    {cvThemes.map((theme) => (
                      <ThemeCard key={theme.id} theme={theme} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Customization */}
              {currentStep === 'customize' && (
                <motion.div
                  key="customize"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4 my-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="cv-name" className="text-sm font-medium">Full Name</Label>
                    <Input
                      id="cv-name"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder="Your full name"
                      maxLength={100}
                      className="bg-card"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cv-title" className="text-sm font-medium">Job Title</Label>
                    <Input
                      id="cv-title"
                      value={customTitle}
                      onChange={(e) => setCustomTitle(e.target.value)}
                      placeholder="Your job title"
                      maxLength={100}
                      className="bg-card"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cv-summary" className="text-sm font-medium">Professional Summary</Label>
                    <Textarea
                      id="cv-summary"
                      value={customSummary}
                      onChange={(e) => setCustomSummary(e.target.value)}
                      placeholder="Brief professional summary..."
                      maxLength={500}
                      rows={4}
                      className="bg-card resize-none"
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {customSummary.length}/500
                    </p>
                  </div>

                  {/* Skills Selection */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Select Skills to Include</Label>
                      <span className="text-xs text-muted-foreground">
                        {selectedSkills.length} of {portfolioData.skills.length} selected
                      </span>
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto rounded-lg border border-border p-3 bg-card">
                      {portfolioData.skills.map((skill) => (
                        <div 
                          key={skill.category}
                          className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <Checkbox
                            id={`skill-${skill.category}`}
                            checked={selectedSkills.includes(skill.category)}
                            onCheckedChange={() => toggleSkill(skill.category)}
                          />
                          <label 
                            htmlFor={`skill-${skill.category}`}
                            className="flex-1 cursor-pointer"
                          >
                            <span className="text-sm font-medium text-foreground">{skill.category}</span>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {skill.items.slice(0, 4).join(', ')}{skill.items.length > 4 ? '...' : ''}
                            </p>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Experience Selection */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Select Experience to Include</Label>
                      <span className="text-xs text-muted-foreground">
                        {selectedExperiences.length} of {portfolioData.experience.length} selected
                      </span>
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto rounded-lg border border-border p-3 bg-card">
                      {portfolioData.experience.map((exp, index) => (
                        <div 
                          key={index}
                          className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <Checkbox
                            id={`exp-${index}`}
                            checked={selectedExperiences.includes(index)}
                            onCheckedChange={() => toggleExperience(index)}
                          />
                          <label 
                            htmlFor={`exp-${index}`}
                            className="flex-1 cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-foreground">{exp.title}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {exp.company} • {exp.period}
                            </p>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Projects Selection */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Select Projects to Include</Label>
                      <span className="text-xs text-muted-foreground">
                        {selectedProjects.length} of {portfolioData.projects.length} selected
                      </span>
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto rounded-lg border border-border p-3 bg-card">
                      {portfolioData.projects.map((project) => (
                        <div 
                          key={project.name}
                          className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <Checkbox
                            id={`project-${project.name}`}
                            checked={selectedProjects.includes(project.name)}
                            onCheckedChange={() => toggleProject(project.name)}
                          />
                          <label 
                            htmlFor={`project-${project.name}`}
                            className="flex-1 cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-foreground">{project.name}</span>
                              <span className={`text-xs px-2 py-0.5 rounded ${
                                project.contribution === 'Full-Stack' 
                                  ? 'bg-purple-500/20 text-purple-400' 
                                  : 'bg-blue-500/20 text-blue-400'
                              }`}>
                                {project.contribution}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-1">{project.technologies}</p>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetCustomization}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Reset to default
                  </Button>
                </motion.div>
              )}

              {/* Step 3: Preview */}
              {currentStep === 'preview' && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="my-4"
                >
                  {/* Zoom Controls */}
                  <div className="flex items-center justify-center gap-2 mb-4">
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

                  {/* Preview */}
                  <div className="bg-muted/30 rounded-lg p-4 overflow-auto max-h-[400px]">
                    <div className="flex justify-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
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
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollArea>

          {/* Navigation & Download Buttons */}
          <div className="flex flex-col gap-3 pt-4 border-t border-border mt-4">
            <div className="flex justify-between gap-3">
              {currentStep !== 'theme' && (
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep === 'preview' ? 'customize' : 'theme')}
                  className="gap-2"
                >
                  <ChevronLeft size={16} />
                  Back
                </Button>
              )}
              
              {currentStep === 'theme' && (
                <Button
                  onClick={() => setCurrentStep('customize')}
                  className="gap-2 ml-auto"
                >
                  Customize CV
                  <Pencil size={16} />
                </Button>
              )}
              
              {currentStep === 'customize' && (
                <Button
                  onClick={() => setCurrentStep('preview')}
                  className="gap-2 ml-auto"
                  disabled={selectedProjects.length === 0 || selectedSkills.length === 0 || selectedExperiences.length === 0}
                >
                  Preview CV
                  <Eye size={16} />
                </Button>
              )}
            </div>

            {currentStep === 'preview' && (
              <div className="flex flex-col sm:flex-row gap-3">
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
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CVDownloadDialog;
